import React from 'react'

function ErrComponent({message}) {
  return (
    <div className='flex items-center justify-center text-5xl font-roboto font-bold text-blue-600 flex-grow'>
      I am Error !! {message}
    </div>
  )
}

export default ErrComponent
