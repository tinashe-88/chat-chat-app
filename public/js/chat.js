const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $shareLocation = document.querySelector('#share-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

// Options
const { username, chatroom } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

socket.on('message', message => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('LT')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', message => {
    console.log(message)
    const html = Mustache.render(locationTemplate, {
        url: message.url,
        createdAt: moment(message.createdAt).format('LT')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Disable form
    $messageFormButton.setAttribute('disabled', 'disabled')

    message = e.target.elements.message.value

    socket.emit('sendMessage', message, error => {
        // Enable form
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''

        if (error){
            return console.log(error)
        }

        console.log('Message delivered.')
    })
})

$shareLocation.addEventListener('click', () => {
    // Does client support geolocation
    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }

    // Disable share location button
    $shareLocation.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition(position => {
        
        socket.emit('shareLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            // Enable share location button
            $shareLocation.removeAttribute('disabled')
            console.log('Location shared.')
        })
    })
})

socket.emit('join', { username, chatroom })