import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'




function DashSidebar() {

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
    <div className=''>
    <div className="h-screen  p-3 space-y-2 w-60 bg-gray-800 text-gray-50">
<div className="flex items-center p-2 space-x-4">
    <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
    <div>
        <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
        
    </div>
</div>
<div className="divide-y dark:divide-gray-300">
    <ul className="pt-2 pb-4 space-y-1 text-sm">
        
        <li className={`${tab==='profile' ? "dark:bg-gray-100 dark:text-gray-900" : ""}`}> 
            <Link to={'/dashboard/?tab=profile'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                    <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                </svg>
                <span>Profile</span>
                </Link>
        </li>
        
        
        <li>
            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                    <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                    <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span>Logout</span>
            </a>
        </li>
        
        
        
    </ul>
    <ul className="pt-4 pb-2 space-y-1 text-sm">
        
        
    </ul>
</div>
</div>
</div>
  )
}

export default DashSidebar