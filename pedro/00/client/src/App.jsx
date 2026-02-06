//reafce
import React from 'react'

const App = () => {
  return (
    <div className='@container border p-4'>
      <div className='grid gird-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4'>
        <div className='bg-gray-200 p-4'>Item 1</div>
        <div className='bg-blue-200 p-4'>Item 2</div>
        <div className='bg-green-200 p-4'>Item 3</div>
        <div className='bg-red-200 p-4'>Item 4</div>
      </div>
    </div>
  )
}

export default App