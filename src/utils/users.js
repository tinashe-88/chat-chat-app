const users = []

// addUser
const addUser = ({id, username, chatroom}) => {
    // Format data
    username = username.trim().toLowerCase()
    chatroom = chatroom.trim().toLowerCase()

    // Validate data
    if(!username || !chatroom){
        return {
            error: 'Username and room required!'
        }
    }

    // Check existing user
    const existingUser = users.find(user => {
        return user.chatroom === chatroom && user.username === username
    })

    // Validate username
    if (existingUser){
        return {
            error: 'Username already exists!'
        }
    }

    // Store user
    const user = { id, username, chatroom }
    users.push(user)
    return { user }
}

// removeUser
const removeUser = id => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1){
        return users.splice(index, 1)[0]
    }
}

// getUser
const getUser = id => {
    return users.find(user => user.id === id)
}

// getUsersInChatroom
const getUsersInChatroom = chatroom => {
    chatroom = chatroom.trim().toLowerCase()
    return users.filter(user => user.chatroom === chatroom )
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInChatroom
}