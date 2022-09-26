import React, {useState} from "react";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { fetchCards } from "../cards/cardsSlice";

function CreateCard (){
    const admin = useSelector(state=> state.login)
    const dispatch = useDispatch()
    const [newCard, setNewCard] = useState({})
    let tags = [{ name: 'Fighter', id:1 },{ name: 'Tank', id:2 },{ name: 'Mage', id:3 },{ name: 'Assassin',id:4 },{ name: 'Tank', id:5 },{ name: 'Support', id:6 },{ name: 'Mage', id:7 },{ name: 'Marksman', id:8 },
    ];
    const handleChange = props => event =>{
        console.log(newCard)
        setNewCard({
            ...newCard,
            [props]:event.target.value
        })
    }
    const createCard = async (card)=>{
        let createdCard = await axios.post('/api/cards', card)
        return createdCard
    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        createCard(newCard)
        dispatch(fetchCards())
    }
    return(
            <div className='create-card-container'>
            {!admin.user.isAdmin ? <h1>Access Denied</h1> :
            <div className='create-card-form'>Create a new Card for Sale!
                <form className='create-form' onSubmit = {handleSubmit}>
                    <label>Champion Name</label>
                        <input type='text' onChange={handleChange('name')} required/>
                    <label>Price</label>
                        <input type='number' onChange={handleChange('price')} required/>
                    <label>Quantity</label>
                        <input type = 'number' onChange = {handleChange('qty')} required/>
                    <label>Image for Single Card View</label>
                        <input type='text' onChange = {handleChange('imgSingle')}/>
                    <label>Image for All Cards View</label>
                        <input type='text' onChange = {handleChange('imgAll')}/>
                    <label>Image for Cart View</label>
                        <input type='text' onChange = {handleChange('imgCart')}/>
                    <label>Description of Champion</label>
                        <input type='text' onChange={handleChange('descriptionBlurb')} required/>
                    <label>tag1</label>
                        <select onClick={(event)=>{
                            setNewCard({
                            ...newCard,
                            tag1:event.target.value})}}>
                            {tags.map(tag=>
                                <option key={tag.id} value={tag.name}>{tag.name}</option>)}
                        </select>
                    <label>tag2</label>
                        <select  onClick={(event)=>{
                            setNewCard({
                            ...newCard,
                            tag2:event.target.value})}}>
                            <option value={null}>No second tag</option>
                            {tags.map(tag=>
                                <option key={tag.id} value={tag.name}>{tag.name}</option>)}
                        </select>
                    <button type='submit'>Create New Card!</button>
                </form>
            </div>}
            </div>
    )
}
export default CreateCard