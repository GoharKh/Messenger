import { useState, useContext, useEffect, useRef } from "react";

import { AppContext } from "../context";


export default function Chat({userName, firstFace}) {
  const [messageText, setMessageText] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [editId, setEditedId] = useState(null);

  const {user1, user2, messages, setMessages, lastMessageId, setLastMessageId} = useContext(AppContext);

  const messageRef = useRef()

// auto scroll ei uzum dnei nerqev, amen nor messagei jamanak
  // useEffect(() => {
  //   if(messageRef) {
  //     messageRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
  //     console.log(messageRef.current)
  //   }
  // }, [messages])

  useEffect(() => {
    if(messages.length) {
      setLastMessageId(messages[messages.length - 1].id)
      const id = setInterval(() => {
        setLastMessageId('')
      }, 5000)
      return () => clearInterval(id)
    }
  },[messages]);

  const sendMessage = e => {
    e.preventDefault()
    if(messageText) {
      setMessageText('')
      setMessages([...messages, {text: messageText, user: userName, id: new Date().getTime().toString(), time: `${new Date().getHours()}:${new Date().getMinutes()}`}])
      if(isEdited) {
        setMessages(messages.map(item => {
          if(item.id === editId) {
            return {...item, text: messageText};
          }
          return item;
        }));
      };
    }
  };

  const editMessage = (id) => {
    const editing = messages.find(item => item.id === id)
    setMessageText(editing.text)
    setIsEdited(true)
    setEditedId(id)
    console.log(id, lastMessageId)
  };
  return (
    <>
    <div className="chat-history">
      <ul>
        {messages.map((item, index) => {
            const {text, user, id, time} = item
            if(firstFace === 'user1') {
              return <>
                <li key={index} className='clearfix'>
                  <div className="message-data">
                    <span className="message-data-name">{user}</span>
                    <span className="message-data-time">{time}</span>
                  </div>
                  <div className={`${user === user1 ? 'message my-message' : 'message other-message float-right'}`}>
                  {text}
                  {user === user1 && id === lastMessageId &&
                  <button className='edit-btn' onClick={() => {
                      console.log(user1, user)
                      editMessage(id)
                  }}><span className="material-symbols-outlined">
                  edit
                  </span></button> }
                  </div>
                </li>
              </>
            } else {
              return <>
                <li key={index} ref={messageRef } className='clearfix'>
                  <div className="message-data">
                    <span className="message-data-name">{user}</span>
                    <span className="message-data-time">{time}</span>
                  </div>
                  <div className={`${user === user2 ? 'message my-message' : 'message other-message float-right'}`}>
                    {text}
                    {user === user2 && id === lastMessageId && <button className='edit-btn' onClick={() => {
                        editMessage(id)
                      }}>
                        <span className="material-symbols-outlined"> edit </span>
                      </button> 
                    }
                  </div>
                </li>
              </>
            }
        })}
      </ul>
      </div>
      <form className="chat-message clearfix" >
        <input  name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3" value={messageText} onChange={e => setMessageText(e.target.value)}></input>          
        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>
        <button type="submit" onClick={sendMessage}>Send</button>
      </form>
    </>
  );
};