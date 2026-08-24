import { useState } from 'react'
import List_box from './List_box';

function Navbar() {

    const [isOpen, setIsOpen] = useState(false)

    function openlist() {
        setIsOpen(!isOpen)
    }

    




  return (
    <div className="Navbar">
        <h2>CINE<span className="Match">MATCH</span></h2>
        <div className="btns">
            <p>Home</p>
            <p>Discover</p>
            <p>Genres</p>
            <p>My List</p>
        </div>
        <div className="notify">
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-bell"></i>
            <img src="" alt="" />
            <div onClick={openlist}>
            <i class="fa-solid fa-angle-down"></i>
            </div>


        </div>
    <List_box isOpen={isOpen}/>
      
    </div>
  )
}

export default Navbar
