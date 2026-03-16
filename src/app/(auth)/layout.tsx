import React, { type ReactNode } from 'react'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
        {children}
    </div>
  )
}

export default layout
