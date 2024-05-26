import React, { useContext } from 'react';
import WelcomeBox from '../Components/WelcomeBox';
import { AuthContext } from '../Context/AuthContext';
import { redirect } from 'react-router-dom';
import Signin from './Signin';

function Home() {
  const { user } = useContext(AuthContext);

  user ? (user?.isAdmin ? redirect('/admin') : redirect('/member')) : <Signin />

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%', // Adjust as needed
    backgroundImage: 'url(https://w0.peakpx.com/wallpaper/972/48/HD-wallpaper-stack-of-books-blue-background-education-concepts-books-library-school-learning-concepts.jpg)',
    backgroundSize: "cover"
  };

  return (
    <div id='home' style={containerStyle}>
      <WelcomeBox />
    </div>
  );
}

export default Home;
