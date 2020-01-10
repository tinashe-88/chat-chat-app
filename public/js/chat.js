const socket = io()

socket.on('message', message => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    message = e.target.elements.message.value

    socket.emit('sendMessage', message, error => {
        if (error){
            return console.log(error)
        }

        console.log('Message delivered.')
    })
})

document.querySelector('#share-location').addEventListener('click', () => {
    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition(position => {
        
        socket.emit('shareLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared.')
        })
    })
})