import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Adjust the path based on your project structure

// Configure the store
const store = configureStore({
    reducer: {
        cart: cartReducer, // Associate the cart reducer with the "cart" key
    },
});

// Export the configured store
export default store;
