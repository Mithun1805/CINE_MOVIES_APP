import React from 'react'

function Header() {
  return (
    <div className="Header">
        <p className="ptag">FEATURED TONIGHT</p>
        <h1>NEON HORIZON</h1>
        <div className="ratings">
            
            <p className="frstp"><i class="fa-solid fa-star"></i>8.7</p>
            <p>2026</p>
            <p>Sci-Fi</p>
            <p className="lastp">Thriller</p>

        </div>
        <p className="para">In a city where memories can be bought and sold, one detective discovers a forgotten memory that could change the future.</p>
        <div className="bigbtns">
            <button className="btn1"><i class="fa-solid fa-play"></i>Watch Trailer</button>
            <button className="btn2"><i class="fa-solid fa-plus"></i>Add to My List</button>
        </div>

      
    </div>
  )
}

export default Header
