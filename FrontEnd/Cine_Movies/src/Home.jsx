import React from 'react'
import Navbar from './Navbar';
import Header from './header';
import Nextfav from './Nextfav';
import Footer from './Footer';
import {useNavigate} from "react-router-dom";


function Home() {

  return (
<div className="mainhome">
    <Navbar />
    

    <div className="hero-image">
        <img src="" alt="Home" />

        <div className="hero-content">
            <Header />
            <Nextfav />
        </div>
    </div>

    <Footer />
</div>
  )
}

export default Home
