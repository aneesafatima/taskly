import React, { useState } from 'react'
import axios from 'axios'

function dashboard() {
  const [giveAccess, seTGiveAccess] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const isUser = async() =>{
    try{

      const res = await axios.get('http://localhost:3000/api/dashboard', {withCredentials: true});
      if(res.data?.status === "success") seTGiveAccess(true)
    }
  catch(err){
    setErrMessage(err.response.data.message)
  }
  }


  isUser();
 
  if(!giveAccess) return <div>{errMessage}</div>
  return (
    giveAccess && 
    <div>
      Hello from dashboard
    </div>
  )
}

export default dashboard
