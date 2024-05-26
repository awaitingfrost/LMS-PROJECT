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
    backgroundImage: 'url(https://img.freepik.com/free-photo/holy-bible-with-rays-light-coming-out-ai-generative_123827-23908.jpg?t=st=1713621347~exp=1713624947~hmac=769992e2bb6ea21d05bd357ad4eeeb1b6f904775422ab9137eb15b7c9a6a63b1&w=996)',
    backgroundSize: "cover"
  };

  return (
    <div id='home' style={containerStyle}>
      <WelcomeBox />
    </div>
  );
}

export default Home;
