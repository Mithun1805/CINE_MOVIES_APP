import React from 'react'

function Footer() {
  return (
    <div className="footer">
        <div className="CineMatch">
            <h2>CINE<span>MATCH</span></h2>
            <p>Your next movie is waiting. </p>
            <div className="icn">
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-youtube"></i>
            </div>
        </div>

        <div className="about">
            <div className="sec_1">
                <p>About</p>
                <p>Discover</p>
                <p>Genres</p>
                <p>My List</p>


            </div>
            <div className="sec_2">
                <p>Privacy</p>
                <p>Terms</p>
                <p>Contact</p>
            </div>
        </div>
        <div className="LastDiv">
            <p>© 2026 CineMatch</p>
        </div>
      
    </div>
  )
}

export default Footer
