import { ICustomerState } from './interface';
import { createSlice } from '@reduxjs/toolkit';
import { getAllCustomer, postCustomer } from './thunks';
const initialState: ICustomerState = {
  customerList: []
};
const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCustomer.fulfilled, (state, action) => {
      state.customerList = action.payload;
    });
    builder.addCase(postCustomer.fulfilled, (state, action) => {
      state.customerList.push(action.payload);
    });
  }
});

export const customerReducer = customerSlice.reducer;
