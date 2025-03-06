import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'

function Dashboard() {
  const location = useLocation()
  const [tab , setTab] = useState("")

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromURL = urlParams.get('tab')
   if(tabFromURL){
    setTab(tabFromURL)
   }
  },[location.search])
  return (
    <div className="flex mt-4 gap-4">

    <div>
      {<DashSidebar/>}
    </div>

    <div>
      {tab === 'profile' && <DashProfile/>}
    </div>
    </div>
    
  )
}

export default Dashboard