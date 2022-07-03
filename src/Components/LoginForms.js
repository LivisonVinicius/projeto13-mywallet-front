import styled from "styled-components";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForms() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  async function submitData(event) {
    event.preventDefault();
    const objPost = { email: email, password: senha };
  }

  return (
    <Forms onSubmit={submitData}>
      <input
        type="email"
        id="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
      />
      <input
        type="password"
        id="senha"
        value={senha}
        required
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
      />
      <button type="submit">{"Entrar"}</button>
    </Forms>
  );
}

const Forms = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 24px;

  input {
    width: 326px;
    height: 58px;
    border-radius: 5px;
    font-family: "Raleway";
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    padding-left: 15px;
    margin-bottom: 13px;
    ::placeholder {
      font-size: 20px;
      line-height: 23px;
      color: #000000;
    }
  }
  button {
    border: none;
    width: 326px;
    height: 46px;
    background: #a328d6;
    border-radius: 5px;
    font-family: "Raleway";
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
  }
`;
