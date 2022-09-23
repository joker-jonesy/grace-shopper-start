import React from "react";
import {useSelector} from 'react-redux'
import DeleteCard from "./DeleteCard";
import UpdateCard from "./UpdateCard";

function EditCard (){
    const cards = useSelector(state=>state.cards.cards)
    const admin = useSelector(state=>state.login)
    return(
        <div>{!admin.user.isAdmin ? <h1>Access Denied</h1> :
            <div className="all-cards-container">
                {cards.map(card=>
                    <div key={card.id} className='card'>
                        <img src={card.imgCart} alt=''/>
                        <UpdateCard card = {card}/>
                        <DeleteCard card = {card}/>
                    </div>
                )}
            </div>}
        </div>
    )
}

export default EditCard