import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
  const { store, actions } = useContext(Context);

  const getProfile = async () => {
    const url = process.env.BACKEND_URL + "/api/profile";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    console.log(options);
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log("error: ", response.status, response.statusText);
      return;
    }
    const data = await response.json();
    console.log(data);
    actions.setMessage(data.message);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <h2>{store.message}</h2>
    </div>
  );
};