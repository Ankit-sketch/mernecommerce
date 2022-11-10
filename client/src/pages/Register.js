import React, { Fragment, useEffect, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../actions/userAction";
import localregisterReducer from "../localStatemanager/localReducers/localregisterReducer";
const Register = () => {
  const handleSubmit = () => {};
  const initialstate = {
    username: "",
    email: "",
  };
  const handleInputs = (e) => {
    if (e.target.name) {
    }
    dispatch({
      type: "USERNAME",
      payload: e.target.value,
    });
  };
  const userref = useRef(null);
  console.log(userref);
  const [state, dispatch] = useReducer(localregisterReducer, initialstate);
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="enter name"
        onChange={(e) => handleInputs(e)}
        ref={userref}
        // value={state.username}
      />
      <input type="text" placeholder="enter email" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;
