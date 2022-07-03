import styled from "styled-components";
import React from "react";
import LoginForms from "./LoginForms";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <Main>
      <div>
        <Logo>MyWallet</Logo>
        <LoginForms />
        <Link to={`/register`}>
          <P>Primeira vez? Cadastre-se!</P>
        </Link>
      </div>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  font-family: "Saira Stencil One";
  font-size: 32px;
  line-height: 50px;
  color: #ffffff;
  width: 147px;
  padding-left: 50%;
  padding-right: 50%;
  margin-top: 92%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20%;
  margin-right: 20%;
  width: 191px;
  height: 18px;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
  margin-top: 36px;
  text-decoration:none;
`;
