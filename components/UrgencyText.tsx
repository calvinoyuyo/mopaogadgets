// *********************
// IN DEVELOPMENT
// *********************

import React from 'react'

const UrgencyText = ({stock} : { stock: number }) => {
  return (
    <p className='text-success text-lg max-[500px]:text-base'>Hurry up! only <span className='badge badge-success text-white text-lg max-[500px]:text-base'>{stock}</span> products left in stock!</p>
  )
}

export default UrgencyText