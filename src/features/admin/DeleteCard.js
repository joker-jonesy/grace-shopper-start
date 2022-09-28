import React from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { fetchCards } from '../cards/cardsSlice'
import { useEffect, useState } from 'react'

function DeleteCard (props){
    const dispatch = useDispatch()
    const [submit,newSubmit] = useState(false)
    useEffect(()=>{},[submit])
    const deleteSingleCard =async (id)=> await axios.delete(`/api/cards/${id}`)
    return(
        <button onClick={async ()=>{
            const answer =window.confirm('Deleting a card will have unintended consequences if a user has ordered this card in the past. Please only use this function for newly created cards.  Are you sure you want to delete?')
            if(answer){await deleteSingleCard(props.card.id)
            await dispatch(fetchCards())
            newSubmit(!submit)}
        }}>Delete!</button>
    )
}


export default DeleteCard