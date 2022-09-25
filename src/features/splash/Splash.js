import React from "react";

const Splash = () => {

    const getArt = () => {
        switch(Math.floor(Math.random() * 10)){
            case 0:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125349/600528_vcn7we.png';
            case 1:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125349/217097_zxp8rg.webp';
            case 2:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125349/content-original-championillustrations-group-slashes_nuoyrq.jpg';
            case 3:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125349/wp2866676_ocdioz.jpg';
            case 4:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125349/3865180_zvghua.jpg';
            case 5:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125348/be1f2fd9afa91d50a4f6723f38db331b_xaujj2.jpg';
            case 6:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125348/214588_hhyjeh.jpg';
            case 7:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125348/214591_htviwg.jpg';
            case 8:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125348/wp2866634_sfbw2v.jpg';
            case 9:
                return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1664125348/xPlY82_jqb1tm.jpg';
        }
    }

    
    setInterval(function () {
        let myImageElement = document.getElementsByClassName('splash-image');
        myImageElement.src = getArt()
    }
    , 500)

    return (
        <div className='splash-container'>
            <img className='splash-image' src={getArt()}/>
        </div>
    )
}

export default Splash;