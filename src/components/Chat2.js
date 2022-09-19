import { useState, useContext } from "react";

import { AppContext } from "../context";


export default function Chat2({userName, firstFace}) {
  const [messageText, setMessageText] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [editId, setEditedId] = useState(null);

  const {user1, user2, messages, setMessages} = useContext(AppContext);

  const sendMessage = e => {
    e.preventDefault()
    setMessageText('')
    setMessages([...messages, {text: messageText, user: userName, id: new Date().getTime().toString()}])
    if(messageText && isEdited) {
      setMessages(messages.map(item => {
        if(item.id === editId) {
          return {...item, text: messageText};
        }
        return item;
      }));
    };
  };

  const editMessage = (id) => {
    const editing = messages.find(item => item.id === id)
    setMessageText(editing.text)
    setIsEdited(true)
    setEditedId(id)
  };

  return (
    <div className="chat-history">
      <ul>
        {messages.map((item, index) => {
            const {text, user, id} = item
            if(firstFace === 'user1') {
              return <>
                <li key={index} className='clearfix'>
                  <div className={`${user === user1 ? 'message my-message' : 'message other-message float-right'}`}>
                  {user} {text}
                  </div>
                </li>
                <button onClick={() => {
                    console.log(user1, user)
                    editMessage(id)
                }}>edit</button>
              </>
            } else {
              return <>
                <li key={index} className='clearfix'>
                  <div className={`${user === user2 ? 'message my-message' : 'message other-message float-right'}`}>
                    {user} {text}
                  </div>
                </li>
                <button onClick={() => {
                    console.log(user1, user)
                    editMessage(id)
                }}>edit</button>
              </>
            }
        })}
      </ul>
      <form onSubmit={sendMessage}>
        <input value={messageText} onChange={e => setMessageText(e.target.value)}/>
        <button>send</button>
      </form>
    </div>
  );
};