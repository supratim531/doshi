import React from 'react'
import { useNavigate } from 'react-router-dom';
import Pricing from './Pricing'
import NavComponent from './NavComponent'
import Intro from './Intro'
import PowerfulPlatform from './PowerfulPlatform'
import Clients from './Clients'
import Strories from './Strories'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    if(token){      
      navigate('dashboard');
    }
  }, [token])
  return (
    <>
      <NavComponent/>
      <Intro/>
      <PowerfulPlatform/>
      <Strories/>
      <Clients/>
      <Pricing/>
      <Footer/>
    </>
  )
}

export default Home
