import axiosClient from '../../api/api.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICustomerPost } from './customer.interface';
import { useToast } from '../../hooks/useToast';
export const getAllCustomer = createAsyncThunk('getAll', async () => {
  const { data } = await axiosClient.get('/api/services/app/Customer/GetAll');
  return data.result;
});

export const postCustomer = createAsyncThunk('postCustomer', async (customer: ICustomerPost) => {
  try {
    const { data } = await axiosClient.post('/api/services/app/Customer/Save', customer);
    useToast('Create succesfully', 1);
    return data.result;
  } catch (error) {
    useToast(error.response.data.error.message, 3);
  }
});
