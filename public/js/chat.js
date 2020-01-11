const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $shareLocation = document.querySelector('#share-location')

socket.on('message', message => {
    console.log(message)
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