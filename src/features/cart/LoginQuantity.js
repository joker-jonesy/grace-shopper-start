import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { updateQuantity } from "./cartSlice";

function LoginQuantity (props){
    const nums = [1,2,3,4,5,6,7,8,9,10]
    const dispatch = useDispatch()
    const [updateQty,setUpdateQty] = useState({id:props.id})

const handleChange = async (event) =>{
    event.preventDefault()
    setUpdateQty({...updateQty,
        qty:event.target.value})
}
const handleSubmit = (event)=>{
    event.preventDefault()
    console.log(updateQty)
    dispatch(updateQuantity(updateQty))
}

    return (
        <div>
        <form onSubmit={handleSubmit}>
        <select  onChange={handleChange}>
           {nums.map(num=><option key={num} value={num}>{num}</option>)}
        </select>
        <button type='submit' handle>update Qty</button>
        </form>
        </div>
    )
}

export default LoginQuantity