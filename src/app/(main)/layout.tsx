"use client"

import { Authenticated } from 'convex/react'
import React, { type ReactNode } from 'react'

const Mainlayout = ({ children }: { children: ReactNode }) => {
  return (
    <Authenticated>
    <div className='container mx-auto mt-24 mb-20'>
      {children}
    </div>
    </Authenticated>
  )
}

export default Mainlayout
