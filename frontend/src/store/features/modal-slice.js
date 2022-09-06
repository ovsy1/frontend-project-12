import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  targetModalID: null,
  targetModalName: null,
};

const modalSlice = createSlice({
  name: '@@modals',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.targetModalID = action.payload.id;
      state.targetModalName = action.payload.name;
    },
  },
});

export const { setModal } = modalSlice.actions;
const modalReducer = modalSlice.reducer;
export default modalReducer;
