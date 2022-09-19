import { useState, useContext } from "react";

import { AppContext } from "../context";
import Chat2 from "./Chat2";
import LogOut from "./LogOut";

export default function LogIn({logIn}) {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const {user1, user2, isActive1, isActive2, messages} = useContext(AppContext)

  return(
    <div className="wrapper">
    <div className='window'>
      <div class="chat-about">
            <h1>{user1}</h1>  
      </div>
      {isActive1 ? 
        <div className="chat">
          <div class="chat-with">Chat with {user2}</div>
          <div class="chat-num-messages">already {messages.length} messages</div>
          <Chat2 userName={user1} firstFace='user1'/>
          <LogOut user={user1}/>
        </div> :
        <form onSubmit={(e) => logIn(e, value1, value2)}>
          <input name="user1" value={value1} onChange={(e) => setValue1(e.target.value)} />
          <button>sign in</button>
        </form>
      }
    </div>
    <div>
        <div class="chat-about">
          <h1>{user2}</h1>  
        </div>
        {isActive2 ?
          <div className="chat">
            <div class="chat-with">Chat with {user1}</div>
            <div class="chat-num-messages">already {messages.length} messages</div>
            <Chat2 userName={user2} firstFace='user2'/>
            <LogOut user={user2}/>
          </div> :
          <form  onSubmit={(e) => logIn(e, value1, value2)}>
            <input name="user2" value={value2} onChange={(e) => setValue2(e.target.value)} />
            <button>sign in</button>
          </form>
        }
    </div>
  </div>
  )
}