import "./styles.css";
import { useRef } from "react";
import { TextField } from "@mui/material";

function SignInModal({ toggleModal }) {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const printUsername = () => {
    console.log(usernameRef.current.value);
    console.log(passwordRef.current.value);
  };
  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="signinmodal-content">
        <h2>Sign In</h2>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          inputRef={usernameRef}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          inputRef={passwordRef}
        />
        <button className="close-modal" onClick={toggleModal}>
          CLOSE
        </button>
        <button onClick={printUsername}>Sign in</button>
      </div>
    </div>
  );
}

export default SignInModal;
