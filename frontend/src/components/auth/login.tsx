import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const {register, handleSubmit, reset} = useForm()
  return (
    <div className='w-5xl aspect-video grid grid-cols-2'>
      {/* Left side */}
      <div className='bg-blue-400'>
        
      </div>

      <form className='bg-green-400'>

      </form>
    </div>
  )
}

export default Login