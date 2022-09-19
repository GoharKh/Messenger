import { useContext } from "react";

import { AppContext } from "../context";

export default function LogOut({user}) {
  const {user1, setUser1, setUser2, setIsActive1, setIsActive2} = useContext(AppContext)

  const signOut = () => {
    if(user === user1) {
        setUser1('')
        setIsActive1(false)
    } else {
        setUser2('')
        setIsActive2(false)
    }
  }
  return <button onClick={signOut}>sign out</button>
}