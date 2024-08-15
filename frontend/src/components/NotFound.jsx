import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({link, code, location, message}) => {
  return (
    <div className='h-screen  m-auto text-xl sm:text-3xl font-roboto text-medium text-gray-800 text-center'>
      <h1>{code}</h1>
      <p>{message}</p>
      <span >Go to <Link to={link}><span className='text-blue-700 hover:underline active:underline'>{location}</span></Link></span>
    </div>
  );
};

export default NotFound;