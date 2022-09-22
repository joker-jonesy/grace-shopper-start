import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

<<<<<<< HEAD
=======

export const UserCart = createAsyncThunk('user/auth', async (credentials)=>{
    try{
        const response = await axios.post('/api/auth', credentials)
        const token = response.data
        window.localStorage.setItem('token',token)
        if(token){
            const {data:auth} = await axios.get('/api/auth',{
                headers:{
                    authorization:token
                }
            })
            const {id} = auth
            const {data:user} = await axios.get(`/api/auth/${id}/user`, {
                headers:{
                    authorization:token
                }
            })
            return user
        }else{
            throw 'login failed bad credentials'
        }
    }catch(e){console.log(e)}
})

>>>>>>> main
const initialState = {
	cart: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action) {
<<<<<<< HEAD
			state.cart.push(action.payload);
=======
            const productItems = state.cart.map(item => item.productId)
            if (productItems.includes(action.payload.productId)) {
                state.cart.map(item => {
                    if (item.productId === action.payload.productId){
                        item.qty += action.payload.qty;
                    }
                })
            } else {
                state.cart.push(action.payload);
            }
>>>>>>> main
		},
	},
});

export const { addToCart } = cartSlice.actions;

<<<<<<< HEAD
export default cartSlice.reducer;
=======
export default cartSlice.reducer;
>>>>>>> main
