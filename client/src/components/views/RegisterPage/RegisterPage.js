import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const onNameHandler = (event) => {
    setName(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("event", event);
    console.log("Email", email);
    console.log("Password", password);
    let body = {
      email,
      name,
      password,
      confirmPassword,
    };

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다.");
    } else {
      dispatch(registerUser(body)).then((res) => {
        console.log("dipatch result:", res);
        if (res.payload.success) {
          props.history.push("/login");
        } else {
          alert(res.payload.message);
        }
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>이름</label>
        <input type="text" value={name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
