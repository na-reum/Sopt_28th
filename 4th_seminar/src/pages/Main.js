import React, { useState } from "react";
import Card from "../components/main/Card";
import NewCard from "../components/main/NewCard";
import Styled from "styled-components";
import { getCardData } from "../lib/api";

const MainWrap = Styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  row-gap: 25px;
`;

const Main = ({ year, month }) => {
  const [userData, setUserData] = useState({});
  const [rawData, setRawData] = useState([]);

  React.useEffect(() => {
    (async () => {
      const data = await getCardData();
      setRawData(data);
      data[year] && setUserData(data[year][month]);
    })();
  }, [year, month]);

  return (
    <MainWrap>
      {userData &&
        userData.map((data, index) => {
          return <Card key={index} props={data} />;
        })}
      <NewCard
        year={year}
        month={month}
        rawData={rawData}
        setUserData={setUserData}
      />
    </MainWrap>
  );
};

export default Main;
