import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className="flex justify-around bg-violet-700 text-white py-2">
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
        <ul className="flex gap-9 mx-9">
            <li className='cursor-pointer hover:font-bold hover:text-xl hover:transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold hover:text-xl hover:transition-all'>Your Tasks</li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar
