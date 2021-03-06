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
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getTransactions();
  }, []);
  function getTransactions() {
    const promise = axios.get("https://mywalletlivison.herokuapp.com/records", {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    });
    promise.then((resp) => {
      setTransactions(resp.data);
      if (resp.data.length !== 0) {
        setBalance(Number(resp.data[resp.data.length - 1].newBalance).toFixed(2));
      }
    });
    promise.catch((error) => {
      console.log(error.response);
    });
  }

  const recordsList = transactions.map((obj) => (
    <section key={obj._id}>
      <span className="date">{obj.date}</span>
      <span className="description">{obj.description}</span>
      <span className={`value ${obj.type}`}>
        {Number(obj.money).toFixed(2)}
      </span>
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
        <MiniBox>
          {recordsList.length === 0 ? (
          <p>Não há registros de entrada ou saída</p>
        ) : (
          recordsList
        )}
        </MiniBox>
        
        {recordsList.length === 0 ? (
          ""
        ) : (
          <BalanceSection>
            <h3 >Saldo</h3> <p className={balance>=0?"deposit":"withdraw"}>{balance}</p>
          </BalanceSection>
        )}
      </RecordsBox>
      <LinkBox>
        <Link to={"/deposit"}>
          <div className="link">
            <AiOutlinePlusCircle />
            <h6>Nova entrada</h6>
          </div>
        </Link>
        <Link to={"/withdraw"}>
          <div className="link">
            <AiOutlineMinusCircle />
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
    left: 40px;
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
  padding-bottom:50px;
  font-family: "Raleway";
  display: flex;
  flex-direction: column;
  position:relative;
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
    color: #c70000;
  }
  .deposit {
    color: #03ac00;
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
    margin-top: 13px;
    svg {
      color: #ffffff;
      width: 30px;
      height: 30px;
      margin-left: 9px;
      margin-top: 9px;
    }
  }
  h6 {
    width: 64px;
    height: 40px;
    position: absolute;
    color: #ffffff;
    left: 10px;
    bottom: 10px;
  }
`;

const BalanceSection = styled.ul`
  width: 100%;
  display: flex;
  position:absolute;
  bottom:10px;
  left:15px;
  h3 {
    width: 57px;
    height: 20px;
    flex: 1;
    font-weight: 700;
font-size: 17px;
line-height: 20px;
  }

  p {
    position:absolute;
    margin:0px;
    right:-35px;
    top:0px;
    margin:0px;
  }
`;
const MiniBox= styled.div`
width:100%;
height:95%;
overflow-y:scroll;
  overflow-x:hidden;
`
