import React, { forwardRef } from 'react'

const TaskInput = forwardRef((props, ref) => {
  return (
    <input 
      ref={ref}
      type="text" 
      placeholder="What would you like to accomplish?" 
      className="w-full max-w-[500px] h-12 bg-[#CBF58A] text-center text-medium border-none outline-none rounded-b-2xl placeholder-gray-700 focus:ring-1 focus:ring-black"
    />
  )
})

export default TaskInput 