import styled from "styled-components";
import React from "react";
import RegisterForms from "./RegisterForms"
import { Link } from "react-router-dom";

export default function Cadastro() {
  return (
    <Main>
      <div>
        <Logo>MyWallet</Logo>
        <RegisterForms/>
        <Link to={`/`}>
          <P>Já tem uma conta? Faça login!</P>
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
  margin-top: 50%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15%;
  margin-right: 20%;
  width: 227px;
  height: 18px;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
  margin-top: 36px;
  text-decoration: none;
`;
