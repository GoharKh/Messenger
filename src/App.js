import { useContext } from "react";

import { AppContext } from "./context";
import LogIn from "./components/LogIn";

function App() {

  const {setUser1, setUser2, setIsActive1, setIsActive2, setError} = useContext(AppContext)

  
  const handleSubmit = (e, value1, value2) => {
    e.preventDefault()
    if(value1 === value2) {
      setError('This username isn\'t available')
      return
    }
    if(value1) {
      setUser1(value1) 
      setIsActive1(true)
    }
    if(value2) {
      setUser2(value2) 
      setIsActive2(true)
    }
  }

  return (
    <LogIn logIn={handleSubmit}/>
  )
}

export default App;





