import { combineReducers, configureStore } from "@reduxjs/toolkit"; 
import AdditionalDatesSlice from './reducer/AdditionalDates/slice';  
import PerformersSlice from './reducer/Performers/slice'; 
import AddressSlice from './reducer/Address/slice';
import AddCustomerSlice from './reducer/AddCustomer/slice';

export const rootReducer = combineReducers({
  AdditionalDatesSlice,
  PerformersSlice,
  AddressSlice,
  AddCustomerSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});
