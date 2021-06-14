import React from "react";
import { auth, provider } from "../../utils/firebase";
import { useStateValue } from "../../utils/StateProvider";
import { actionTypes } from "../../utils/reducer";

// import { Button } from "bootstrap";

function Login() {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <>
      <button type="submit" onClick={signIn} className="btn-custom">
        Sign In
      </button>
    </>
  );
}

export default Login;
