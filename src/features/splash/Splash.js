import React from "react";
import { Link } from "react-router-dom";

const Splash = () => {

    const getArt = () => {
        switch(Math.floor(Math.random() * 9)){
            case 0:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125349/600528_vcn7we.png';
            case 1:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125349/217097_zxp8rg.webp';
            case 2:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125349/content-original-championillustrations-group-slashes_nuoyrq.jpg';
            case 3:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125349/wp2866676_ocdioz.jpg';
            case 4:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125348/xPlY82_jqb1tm.jpg';
            case 5:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125348/be1f2fd9afa91d50a4f6723f38db331b_xaujj2.jpg';
            case 6:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125348/214588_hhyjeh.jpg';
            case 7:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125348/214591_htviwg.jpg';
            case 8:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125348/wp2866634_sfbw2v.jpg';
        }
    }

    
    setInterval(function () {
        let myImageElement = document.getElementsByClassName('splash-image');
        myImageElement.src = getArt()
    }
    , 500)

    return (
        <div className='splash-container'>
            <div className="splash-text-div">
                <p className="splash-text">Welcome to our League of Legends Card store. Discover your champions, read up on Lore, and checkout once you've chosen your champion!</p>
                <Link className="splash-text" id="splash-button" to="/cards">continue</Link>
            </div>
            <img className='splash-image' src={getArt()}/>
        </div>
    )
}

export default Splash;