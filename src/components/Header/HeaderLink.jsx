import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderLink({...props}) {
  return (
    <Link class="text-lg font-semibold text-gray-100 bg-gray-400 py-2 px-3 rounded-md transition duration-100  hover:bg-gray-300 hover:text-gray-600" {...props} />
  )
}
