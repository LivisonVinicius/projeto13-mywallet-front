import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForms() {
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { email, pwd }
      );
      const accessToken = response?.data?.accessToken;
      const userName = response?.data?.userName;
      const objPost = {userName , accessToken}
      localStorage.setItem("userData",JSON.stringify(objPost) );
      setEmail("");
      setPwd("");
      navigate("/records");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor");
      }
      if (err.response?.status === 400) {
        setErrMsg("E-mail ou senha incorretos");
      }
      if (err.response?.status === 401) {
        setErrMsg("Não autorizado");
      }
      if (err.response?.status === 404) {
        setErrMsg("Usuário não encontrado");
      } else {
        setErrMsg("Falha no login");
      }
      errRef.current.focus();
    }
  };

  return (
    <Forms onSubmit={handleSubmit}>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <input
        type="email"
        id="email"
        ref={emailRef}
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        placeholder="E-mail"
      />

      <input
        type="password"
        id="password"
        onChange={(e) => setPwd(e.target.value)}
        value={pwd}
        required
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
