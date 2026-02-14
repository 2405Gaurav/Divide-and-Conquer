"use client"

//as we elt he progblem in there my text was hidden behind the header, so i made the header fixed and added some padding to the top of the main content to make sure it is not hidden behind the header
//we will do that to all the routes in thim main folder by using the global layout for this
import { Authenticated } from 'convex/react'
import React from 'react'

const Mainlayout = ({ children }) => {
  return (
    <Authenticated>
    <div className='container mx-auto mt-24 mb-20'>
        
      {children}
    </div>
    </Authenticated>
  )
}

export default Mainlayout
