import { useContext } from "react";

import { AppContext } from "../context";

export default function LogOut({user}) {
  const {user1, user2, setUser1, setUser2, setIsActive1, setIsActive2} = useContext(AppContext)

  const signOut = () => {
    if(user === user1) {
        setUser1('')
        setIsActive1(false)
    } else if (user === user2){
        setUser2('')
        setIsActive2(false)
    }
  }
  return <div className="sign-out" >
      <button onClick={signOut}>sign out</button>
    </div>
}