import styled from "styled-components";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Description_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

export default function Withdraw() {
  const userRef = useRef();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("userData"));

  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setValidDescription(Description_REGEX.test(description));
  }, [description]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objPost = {
      money,
      description,
    };
    try {
      const response = await axios.post(
        "https://mywalletlivison.herokuapp.com/withdraw",
        {
          money,
          description,
        },
        {
          headers: { Authorization: `Bearer ${token.accessToken}` },
        }
      );
      navigate("/records");
    } catch {}
  };

  return (
    <Main>
      <h1>Nova saída</h1>
      <Forms onSubmit={handleSubmit}>
        <input
          type="number"
          id="money"
          ref={userRef}
          max="10000.00"
          min="1.00"
          step="0.01"
          autoComplete="off"
          onChange={(e) => setMoney(e.target.value)}
          value={money}
          required
          placeholder="Valor"
        />

        <input
          type="text"
          id="Description"
          onChange={(e) => setDescription(e.target.value)}
          aria-invalid={validDescription ? "false" : "true"}
          value={description}
          required
          placeholder="Descrição"
        />
        <button type="submit">{"Salvar saída"}</button>
      </Forms>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  font-family: "Raleway";
  h1 {
    width: 168px;
    height: 31px;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
    margin-left: 45px;
    margin-top: 45px;
  }
`;

const Forms = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 28px;
  input {
    width: 326px;
    height: 58px;
    border-radius: 5px;
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
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
  }
`;