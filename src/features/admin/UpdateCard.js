import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { fetchCards } from "../cards/cardsSlice";

function UpdateCard (props){
    const dispatch = useDispatch()
    const card = props.card
    const [form, setForm]= useState({id:card.id, tag1:card.tag1, tag2:card.tag2})
    const [submit,newSubmit]= useState(false)
    const [message,setMessage] = useState('')
    useEffect(()=>{},[submit])
    const admin = useSelector(state=>state.login)
    let tags = [{ name: 'Fighter', id:1 },{ name: 'Tank', id:2 },{ name: 'Mage', id:3 },{ name: 'Assassin',id:4 },{ name: 'Tank', id:5 },{ name: 'Support', id:6 },{ name: 'Mage', id:7 },{ name: 'Marksman', id:8 },];
    const updateSingleCard = async (obj)=>await axios.put(`/api/cards/${obj.id}`, obj)

    const handleChange = props => event => {
        setForm({
            ...form,
            [props]:event.target.value
        })
    }
    const handleSubmit = async (event)=>{
        event.preventDefault()
        let {data} =await updateSingleCard(form)
        await dispatch(fetchCards())
        if(data.id){
            setMessage('Card Updated!')
        }
        !newSubmit(!submit)
    }
    return(
        <div className='card-edit-container'>
        {!admin.user.isAdmin ? <h1>Access Denied</h1> :
        <div className='card-edit-form'>Edit this Card!
            <form className='edit-form'onSubmit = {handleSubmit}>
                <label>Champion Name {card.name} change to:</label>
                    <input type='text' onChange={handleChange('name')} placeholder={card.name}/>
                <label>Price</label>
                    <input type='number' onChange={handleChange('price')} placeholder={card.price}/>
                <label>Quantity</label>
                    <input type = 'number' onChange = {handleChange('qty')} placeholder={card.qty}/>
                <label>Image for Single Card View</label>
                    <input type='text' onChange = {handleChange('imgSingle')}/>
                <label>Image for All Cards View</label>
                    <input type='text' onChange = {handleChange('imgAll')}/>
                <label>Image for Cart View</label>
                    <input type='text' onChange = {handleChange('imgCart')}/>
                <label>Description of Champion</label>
                    <input type='text' onChange={handleChange('descriptionBlurb')}/>
                <label>tag1</label>
                    <select defaultValue={card.tag1} onClick={(event)=>{
                        setForm({
                        ...form,
                        tag1:event.target.value})}}>
                        {tags.map(tag=>
                            <option key={tag.id} value={tag.name}>{tag.name}</option>)}
                    </select>
                <label>tag2</label>
                    <select defaultValue={card.tag2} onClick={(event)=>{
                        setForm({
                        ...form,
                        tag2:event.target.value})}}>
                        <option value={null}>No second tag</option>
                        {tags.map(tag=>
                            <option key={tag.id} value={tag.name}>{tag.name}</option>)}
                    </select>
                <button type='submit'>Update This Card!</button>
            </form>
            <div>{message}</div>
        </div>}
        </div>
    )
}
export default UpdateCard