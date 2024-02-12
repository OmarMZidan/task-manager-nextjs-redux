import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface openModal {
  value: boolean;
}

const initialState: openModal = {
  value: false,
};

const modalSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    toggleOpenModal: (state, action: PayloadAction<boolean>) => {
      // Mutating state here, but redux toolkit handles immutability under the hood.
      state.value = action.payload;
    },
  },
});

export const { toggleOpenModal } = modalSlice.actions;
export default modalSlice.reducer;
