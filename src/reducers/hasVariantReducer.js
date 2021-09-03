export const hasvariantReducer = (state = { hasVariant: false }, action) => {
  switch (action.type) {
    case 'UPDATE_HASVARIANT':
      return { hasVariant: action.payload };
    default:
      return state;
  }
};
