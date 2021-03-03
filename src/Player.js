import React from 'react'
import Body from './Body'
import Footer from './Footer'
import Sidebar from './Sidebar'
import './Player.css'

function Player({spotify}) {
    return (
        <div className="player">
            <div className="player__body">
                {/**Sidebar */}
                <Sidebar />
                {/**Body */}
                <Body spotify={spotify} />

            </div>        
            {/**Footer */}
            <Footer spotify={spotify} />
        </div>
    )
}

export default Player
