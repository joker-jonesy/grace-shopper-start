
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { updateQuantity } from "./cartSlice";

function ChooseQuantity (props){
    const nums = [1,2,3,4,5,6,7,8,9,10]
    console.log(props.item)
    const dispatch = useDispatch()
    const [updateQty,setUpdateQty] = useState({id:props.item.card.id, qty:props.item.qty})

const handleChange = async (event) =>{
    event.preventDefault()
    setUpdateQty({...updateQty,
        qty:event.target.value})
    
}
const handleSubmit = (event)=>{
    event.preventDefault()
    dispatch(updateQuantity(updateQty))
}

    return (
        <div>
        <form onSubmit={handleSubmit}>
        <select value={props.item.qty} onChange={handleChange}>
           {nums.map(num=><option key={num} value={num} >{num}</option>)}
        </select>
        <button type='submit' handle>Update</button>
        </form>
        </div>
    )
}

export default ChooseQuantity