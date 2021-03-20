export const initialState = {
  name: "",
  friend: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      console.log(`RUnning herererehh`);
      return {
        ...state,
        name: action.payload,
      };
    case "SET_FRIEND":
      return { ...state, friend: action.payload };
    default:
      return state;
  }
};

export default reducer;
