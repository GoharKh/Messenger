import { useState, useContext } from "react";

import { AppContext } from "../context";
import Chat from "./Chat";
import LogOut from "./LogOut";

import user from '../images/user.png'; 

export default function LogIn({logIn}) {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const {user1, user2, isActive1, isActive2, messages, error} = useContext(AppContext)

  return(
    <div className="wrapper">
      {isActive1 ? 
        <div className="chat">
          <div className="chat-header clearfix">
            <img src={user} alt="avatar"/>
            <div className="chat-about">
              <div className="chat-with">Chat with {user2}</div>
              <div className="chat-num-messages">already {messages.length} messages</div>
            </div>
          </div>
          {isActive2 && <Chat userName={user1} firstFace='user1'/>}
              
              <LogOut user={user1}/>
        </div> :
        <form onSubmit={(e) => logIn(e, value1, value2)}>
          <h1>Welcome Back!</h1>
          {error && <p>{error}</p>}
          <input name="user1" value={value1} onChange={(e) => setValue1(e.target.value)} />
          <button>sign in</button>
        </form>
      }
        {isActive2 ?
          <div className="chat">
            <div className="chat-header clearfix">
              <img src={user} alt="avatar"/>
              <div className="chat-about">
                <div className="chat-with">Chat with {user1}</div>
                <div className="chat-num-messages">already {messages.length} messages</div>
              </div>
            </div>
            {isActive1 && <Chat userName={user2} firstFace='user2'/>}
            <LogOut user={user2}/>
          </div> :
          <form  onSubmit={(e) => logIn(e, value1, value2)}> 
            <h1>Welcome Back!</h1>
            {error && <p>{error}</p>}
            <input name="user2" value={value2} onChange={(e) => setValue2(e.target.value)} />
            <button>sign in</button>
          </form>
        }
  </div>
  )
}