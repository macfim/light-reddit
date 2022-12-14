import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: false,
  post: true,
};

const togglesSlice = createSlice({
  name: "toggles",
  initialState,
  reducers: {
    toggleMobileMenu(state, action) {
      if (action.payload === false) state.menu = false;
      else state.menu = !state.menu;
    },
    togglePost(state) {
      return {
        ...state,
        post: !state.post,
        wiki: false,
      };
    },
  },
});

export const { toggleMobileMenu, togglePost, toggleWiki } =
  togglesSlice.actions;
export default togglesSlice.reducer;
