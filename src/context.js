import React, { useState, useEffect } from 'react'

export const AppContext = React.createContext()

export const AppProvider = ({children}) => {
    const [user1, setUser1] = useState(() => {
        const localData = localStorage.getItem(`user1`)    
        return (localData ? JSON.parse(localData) : '')
    });
    const [user2, setUser2] = useState(() => {
        const localData = localStorage.getItem(`user2`)
        return (localData ? JSON.parse(localData) : '')
    });
    const [isActive1, setIsActive1] = useState(() => {
        if(user1) {
            return true
        }
        return false
    });
    const [isActive2, setIsActive2] = useState(() => {
        if(user2) {
            return true
        }
        return false
    });
    const [messages, setMessages] = useState(() => {
        const localData = localStorage.getItem(`${user1}${user2}`)
        return localData ? [...JSON.parse(localData)] : []
    })
    const [error, setError] = useState('')
    const [lastMessageId, setLastMessageId] = useState('')

    useEffect(() => {
        localStorage.setItem(`user1`, JSON.stringify(user1))
        localStorage.setItem(`user2`, JSON.stringify(user2))

    }, [user1, user2])

    useEffect(() => {
        localStorage.setItem(`${user1}${user2}`, JSON.stringify(messages))
    }, [messages]);

    useEffect(() => {
        if(isActive1 && isActive2) {
            const localData = localStorage.getItem(`${user1}${user2}`)
            return setMessages(localData ? [...JSON.parse(localData)] : [])
        }
    }, [isActive1, isActive2])

    return <AppContext.Provider value={{
        user1,
        user2,
        setUser1,
        setUser2,
        isActive1,
        setIsActive1,
        isActive2,
        setIsActive2,
        messages,
        setMessages,
        error,
        setError,
        lastMessageId,
        setLastMessageId
    }}>
        {children}
    </AppContext.Provider>
}
