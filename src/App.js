import { useEffect, useState } from "react";

import Chat from "./components/Chat";

function App() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [user1, setUser1] = useState(''); 
  const [isSigned1, setIsSigned1] = useState(false);
  const [user2, setUser2] = useState('');
  const [isSigned2, setIsSigned2] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: '',
      user: '',
      id: 0
    }
  ]);

  // useEffect(() => {
  //   localStorage.setItem('user1', JSON.stringify(user1))
  //   localStorage.setItem('user2', JSON.stringify(user2))
  // }, [user1, user2]);

  useEffect(() => {
    localStorage.setItem(`${user1}${user2}`, JSON.stringify(messages))
  }, [messages]);

  useEffect(() => {
    if(isSigned1 && isSigned2) {
      const localData = localStorage.getItem(`${user1}${user2}`)
      return setMessages(localData ? [...JSON.parse(localData)] : [])
    }
  }, [isSigned1, isSigned2])

  const handleSubmit1 = e => {
    e.preventDefault()
    if(value1) {
      setValue1('')
      setUser1(value1)
      setIsSigned1(true)
    }
  };

  const handleSubmit2 = e => {
    e.preventDefault()
    if(value2) {
      setValue2('')
      setUser2(value2)
      setIsSigned2(true)
    }

  }
  const signOut1 = () => {
    setIsSigned1(false)
  }

  const signOut2 = () => {
    setIsSigned2(false)
  }

  const setNewMessage = (text, user, isEdited, editId) => {
    if(text !== '') {
      setMessages([...messages, {text, user, id: new Date().getTime().toString()}])
    }
    if(text && isEdited) {
      setMessages(messages.map(item => {
        if(item.id === editId) {
          return {...item, text}
        }
        return item
      }))
    }
  }

  return (
    <div>
      <div>
        {isSigned1 ?
          <div>
            <h1>Hi, {user1}</h1>
            <button onClick={signOut1}>sign out</button>
            {isSigned2 && <Chat setNewMessage={setNewMessage} user={user1} messages={messages}/>}
          </div> :
          <form onSubmit={handleSubmit1}>
            <input type='text' value1={value1} onChange={e => setValue1(e.target.value)}/>
            <button type="submit">sign in</button>
          </form>}
      </div>
      <div>
        {isSigned2 ?
          <div>
            <h1>Hi, {user2}</h1>
            <button onClick={signOut2}>sign out</button>
            {isSigned1 && <Chat setNewMessage={setNewMessage} user={user2} messages={messages}/>}
          </div> :
          <form onSubmit={handleSubmit2}>
            <input type='text' value2={value1} onChange={e => setValue2(e.target.value)}/>
            <button type="submit">sign in</button>
          </form>
        }
      </div>
    </div>
  );
}

export default App;
