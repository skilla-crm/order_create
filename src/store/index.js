import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AdditionalDatesSlice from './reducer/AdditionalDates/slice';
import PerformersSlice from './reducer/Performers/slice';
import AddressSlice from './reducer/Address/slice';
import AddCustomerSlice from './reducer/AddCustomer/slice';
import CustomerSlice from './reducer/Customer/slice';
import DetailsSlice from './reducer/Details/slice';
import RatesSlice from './reducer/Rates/slice';
import ManagersSlice from './reducer/Managers/slice';
import ValidtionSlice from './reducer/Validation/slice';
import PreviewSlice from './reducer/Preview/slice';
import ParametrsSlice from './reducer/Parametrs/slice';

export const rootReducer = combineReducers({
  AdditionalDatesSlice,
  PerformersSlice,
  AddressSlice,
  AddCustomerSlice,
  CustomerSlice,
  DetailsSlice,
  RatesSlice,
  ManagersSlice,
  ValidtionSlice,
  PreviewSlice,
  ParametrsSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});
