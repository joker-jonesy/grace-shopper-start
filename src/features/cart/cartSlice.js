import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userCart = createAsyncThunk('user/auth', async (credentials) => {
	try {
		const response = await axios.post('/api/auth', credentials);
		const token = response.data;
		window.localStorage.setItem('token', token);
		if (token) {
			const { data: auth } = await axios.get('/api/auth', {
				headers: {
					authorization: token,
				},
			});
			const { id } = auth;
			const { data: user } = await axios.get(`/api/auth/${id}/user`, {
				headers: {
					authorization: token,
				},
			});
			return user;
		} else {
			throw 'login failed bad credentials';
		}
	} catch (e) {
		console.log(e);
	}
});

export const updateOrder = createAsyncThunk(
	'cart/updateOrder',
	async ({ token, user, item }) => {
		try {
			const { data } = await axios.put(`/api/orders/${user.id}`, item, {
				headers: {
					authorization: token,
				},
			});
			return data;
		} catch (e) {
			console.log(e);
		}
	}
);

export const deleteUserItem = createAsyncThunk(
	'cart/deleteUserItem',
	async ({ lineItem, token }) => {
		try {
			const { data } = await axios.delete(`/api/lineItem/${lineItem.id}`, {
				headers: { authorization: token },
			});
			return data;
		} catch (e) {
			console.log(e);
		}
	}
);

export const checkoutOrder = createAsyncThunk(
	'cart/checkoutOrder',
	async ({ token, cart, user }) => {
		try {
			const { data } = await axios.post(
				'/api/checkout/create-checkout-session',
				cart,
				{ headers: { authorization: token } }
			);
			data && (window.location = data.url);
		} catch (e) {
			console.log(e);
		}
	}
);

export const processOrder = createAsyncThunk(
	'cart/processOrder',
	async ({ token, lineItems, user }) => {
		try {
			const { data } = await axios.put(
				`/api/orders/${user.id}/processOrder`,
				lineItems,
				{
					headers: { authorization: token },
				}
			);
			console.log(data.processed);
		} catch (e) {
			console.log(e);
		}
	}
);

const initialState = {
	cart: [],
	totalItems: 0,
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action) {
			const productItems = state.cart.map((item) => item.card.id);
			if (productItems.includes(action.payload.card.id)) {
				state.cart.map((item) => {
					if (item.card.id === action.payload.card.id) {
						item.qty += action.payload.qty;
						item.price = Number(item.card.price) * item.qty;
						item.price = Math.round(item.price * 100) / 100;
					}
				});
				state.totalPrice;
			} else {
				state.cart.push(action.payload);
			}

			state.totalPrice = 0;
			state.cart.map((item) => (state.totalPrice += Number(item.price)));
			state.totalPrice = Math.round(state.totalPrice * 100) / 100;

			state.totalItems = state.cart.length;
		},
		setLoginTotal(state, action) {
			state.totalItems = action.payload;
		},
		clearCart(state,action){
			state.totalItems = 0
			state.cart = []
			state.totalPrice= 0
		},
		addLoginCart(state, action) {
			const productItems = state.cart.map((item) => item.product.id);
			if (productItems.includes(action.payload.product.id)) {
				state.cart.map((item) => {
					if (item.card.id === action.payload.product.id) {
						item.qty += action.payload.quantity;
						item.price = Number(item.product.price) * item.qty;
						item.price = Math.round(item.price * 100) / 100;
					}
				});
				state.totalPrice;
			} else {
				state.cart.push(action.payload);
			}

			state.totalPrice = 0;
			state.cart.map((item) => (state.totalPrice += Number(item.price)));
			state.totalPrice = Math.round(state.totalPrice * 100) / 100;

			state.totalItems = state.cart.length;
		},
		deleteItem(state, action) {
			state.cart = state.cart.filter((item) => item.card.id !== action.payload);
			state.totalItems--;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(updateOrder.fulfilled, (state, action) => {
				state.totalItems = action.payload.count;
			})
			.addCase(deleteUserItem.fulfilled, (state, action) => {
				state.totalItems = action.payload.count;
			});
	},
});

export const getTotalPrice = (state) => state.cart.totalPrice;
export const { addToCart, addLoginCart, setLoginTotal, deleteItem, clearCart } =
	cartSlice.actions;

export default cartSlice.reducer;
