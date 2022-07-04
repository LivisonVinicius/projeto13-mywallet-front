import styled from "styled-components";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Records() {
  const [transactions, setTransactions] = useState([]);
  const token = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  useEffect(() => {
    getTransactions();
  }, []);
  function getTransactions() {
    const promise = axios.get("http://localhost:5000/records", {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    });
    promise.then((resp) => {
      setTransactions(resp.data);
    });
    promise.catch((error) => {
      console.log(error.response);
    });
  }

  const recordsList = transactions.map((obj) => (
    <section>
      <span className="date">{obj.date}</span>
      <span className="description">{obj.description}</span>
      <span className={`value ${obj.type}`}>{obj.value}</span>
      <br />
    </section>
  ));

  return (
    <Main>
      <h1>Olá, {JSON.parse(localStorage.getItem("userData")).userName}</h1>
      <Link to={"/"}>
        <RiLogoutBoxRLine className="exit" />
      </Link>
      <RecordsBox>
        {recordsList.length === 0 ? (
          <p>Não há registros de entrada ou saída</p>
        ) : (
          recordsList
        )}
      </RecordsBox>
      <LinkBox>
        <Link to={"/deposit"}>
          <div className="link">
            <AiOutlinePlusCircle/>
            <h6>Nova entrada</h6>
          </div>
        </Link>
        <Link to={"/withdraw"}>
          <div className="link">
            <AiOutlineMinusCircle/>
            <h6>Nova saída</h6>
          </div>
        </Link>
      </LinkBox>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    min-width: 141px;
    height: 31px;
    font-family: "Raleway";
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
    top: 25px;
    left:40px;
    position: absolute;
  }
  .exit {
    width: 30px;
    height: 30px;
    top: 28px;
    right: 40px;
    color: #ffffff;
    position: absolute;
  }
`;
const RecordsBox = styled.div`
  width: 326px;
  height: 446px;
  background: #ffffff;
  border-radius: 5px;
  margin: auto;
  margin-top: 78px;
  font-family: "Raleway";
  display: flex;
  flex-direction: column;
  p {
    width: 180px;
    height: 46px;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
    margin: auto;
    margin-top: 200px;
  }
  section {
    margin-left: 12px;
    margin-top: 23px;
    display: flex;
    margin-right: 11px;
  }
  .date {
    height: 100%;
    width: 48px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #c6c6c6;
    margin-right: 5px;
  }
  .description {
    flex: 1;
    font-size: 16px;
    line-height: 19px;
  }
  .withdraw {
    color: #03ac00;
  }
  .deposit {
    color: #c70000;
  }
  .value {
    font-size: 16px;
    line-height: 19px;
  }
`;

const LinkBox = styled.div`
  width: 330px;
  height: 114px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  .link {
    width: 155px;
    height: 114px;
    background: #a328d6;
    border-radius: 5px;
    position: relative;
    margin-top:13px;
    svg{
        color: #FFFFFF;
        width:30px;
        height:30px;
        margin-left:9px;
        margin-top:9px;
    }
  }
  h6 {
    width: 64px;
    height: 40px;
    position: absolute;
    color: #FFFFFF;
    left:10px;
    bottom:10px;
  }
`;
