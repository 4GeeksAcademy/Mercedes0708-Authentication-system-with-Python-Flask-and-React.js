import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);

  const hadleOnClick = async () => {
    const dataToSend = {
      email: email,
      password: password,
    };
    const url = process.env.BACKEND_URL + "/api/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      console.log("error: ", response.status, response.statusText);
      return;
    }
    const data = await response.json();
    console.log(data);
    actions.login(data.results);
    localStorage.setItem("token", data.access_token);
  };

  return store.isLogin ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="card-body py-5 px-md-5">
      <h1 className="text-center">Registrate</h1>
      <div className="form-outline mb-4">
        <input
          type="email"
          id="form2Example1"
          className="form-control"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className="form-label" htmlFor="form2Example1">
          Email address
        </label>
      </div>
      <div className="form-outline mb-4">
        <input
          type="password"
          id="form2Example2"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label className="form-label" htmlFor="form2Example2">
          Password
        </label>
      </div>
      <div>
        <button
          onClick={hadleOnClick}
          type="button"
          className="btn btn-primary btn-block mb-4"
        >
          Registro
        </button>
      </div>
    </div>
  );
};