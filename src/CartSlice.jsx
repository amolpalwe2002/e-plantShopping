import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add item to the cart
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }
        },
        // Remove item from the cart
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload);
        },
        // Update item quantity
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },
    },
});

// Export actions for use in components
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
