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
            await deleteSingleCard(props.card.id)
            await dispatch(fetchCards())
            newSubmit(!submit)
        }}>Delete!</button>
    )
}


export default DeleteCard