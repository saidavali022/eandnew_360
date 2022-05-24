const initialState = {
  Role: "user",
  // Employee_id: "ED250221SAI1603",
  // email: "shaiksaidavali022@gmail.com",
};
const globalState = (state = initialState, action) => {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        Employee_id: action.payload.employee_id,
        email: action.payload.email,
      };
    }
    default:
      return state;
  }
};
export default globalState;
