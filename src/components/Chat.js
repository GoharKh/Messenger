import { Fragment, useEffect, useState } from "react"
import PropType from 'prop-types'

const Chat = ({setNewMessage, messages, user}) => {
  const [messageText, setMessageText] = useState('')
  const [isExpired, setIsExpired] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [editId, setEditedId] = useState(null)

  const sendMessage = e => {
      e.preventDefault()
      setMessageText('')
      setNewMessage(messageText, user, isEdited, editId)
  }

  useEffect(() => {
      const id = setInterval(() => setIsExpired(true), 5000)
      return () => clearInterval(id)
  }, [messageText])

  const edit = (index) => {
      const editing = messages.find(item => item.id === index)
      console.log(messages, index, editing)
      setMessageText(editing.text)
      setIsEdited(true)
      setEditedId(index)
  }

  return(
    <div>
      <ul>
        {messages.map((item, index) => {
          return (
            <Fragment key={index}>
              <li >{item.user} {item.text}</li>
              {isExpired ? null : <button onClick={() => edit(item.id)}>edit</button>}
            </Fragment>
          )
        })}
      </ul>
      <form onSubmit={sendMessage}>
        <input value={messageText} onChange={e => setMessageText(e.target.value)}/>
        <button>send</button>
      </form>
    </div>
  )
}

export default Chat

Chat.propTypes = {
  setNewMessage: PropType.func.isRequired,
  messages: PropType.array.isRequired,
  user: PropType.string.isRequired,
}