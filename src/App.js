import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import Austria from "../src/austria.png"
import England from "../src/england.png"
import Bar from "./components/Bar";
import DataBlock from "./components/DataBlock";

function App() {
  const [resource, setResource] = useState("value");
  const [heading, setHeading] = useState("General");
  const [homeData, setHomeData] = useState({});
  const [awayData, setAwayData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [finalResult, setFinalResult] = useState({});



  let data;
  useEffect(() => {
    fetch('https://odds-api.checkd-dev.com/dev/smartacca/fixtures/5lx6xg4ofvrj9thfsze478opg/preview')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        data = response;
        const gameDataHome = {};
        const gameDataAway = {};

        ['possessionPercentage', 'ontargetScoringAtt', 'wonCorners', 'totalYellowCard', 'totalScoringAtt']
          .forEach(key => {
            gameDataHome[key] = getStat("home", key);
            gameDataAway[key] = getStat("away", key);
          });

        setHomeData(gameDataHome);
        setAwayData(gameDataAway);
        setFinalResult(getScores());
        setIsLoading(false);
      }
      );
  }, []);


  function getStat(playerSide, attribute) {
    return data.match.liveData.lineups[playerSide].stats.find(stat => stat.type === attribute);
  }

  function getScores() {

    return data.match.liveData.matchDetails.scores.total;

  }




  return (
    <>
      {isLoading && "loading"}
      { !isLoading &&

        <div style={{ backgroundColor: 'rgb(21, 32, 44)', padding: '16px', borderRadius: '8px', maxWidth: '400px', margin: '20px' }}>

          {/* header */}
          <div style={{ display: "flex", alignItems: "center",  }}>
            <div style={{flexGrow: "1", color: "white"}}>
              Friendlies
              <div>
                <Avatar alt="England" src={England} size = {20} />
                 England
              </div>
              <div>
                <Avatar alt="Austria" src={Austria} size = {20} />
                  Austria
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{color: 'white', marginRight: "15px"}}>FT</div>

              <div style={{backgroundColor: "white", width: "20px", textAlign: "center", borderRadius: "5px"}}>
                <div>
                  {finalResult.home}
                </div>

                <div>
                  {finalResult.away}
                </div>
              </div>
              </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)'}}>
            <button style = {mainBarStyle} onClick={() => setHeading("overview")}>overview</button>
            <button style = {mainBarStyle} onClick={() => setHeading("General")}>General</button>
            <button style = {mainBarStyle} onClick={() => setHeading("ENG")}>ENG</button>
            <button style = {mainBarStyle} onClick={() => setHeading("AUT")}>AUT</button>
            <button style = {mainBarStyle} onClick={() => setHeading("Player")}>Player</button>
          </div>

          <div style={{color:"white" , fontWeight: "bold", textAlign: "center", margin: "10px"}}>{heading}</div>

          <div style={{textAlign: 'center'}}>
            <button style = {barStyle} onClick={() => setResource("value")}>Full Match</button>
            <button style = {barStyle} onClick={() => setResource("fh")}>1st Half</button>
            <button style = {barStyle} onClick={() => setResource("sh")}>2nd Half</button>
          </div>


          <DataBlock header='Possession' home={homeData.possessionPercentage?.[resource]} away={awayData.possessionPercentage?.[resource]} showPercentSymbol />
          <DataBlock header='Shots' home={homeData.totalScoringAtt?.[resource]} away={awayData.totalScoringAtt?.[resource]} />
          <DataBlock header='Shots On Target' home={homeData.ontargetScoringAtt?.[resource]} away={awayData.ontargetScoringAtt?.[resource]} />
          <DataBlock header='Corners' home={homeData.wonCorners?.[resource]} away={awayData.wonCorners?.[resource]} />


          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{color: "white"}}>
          
              <div style={{display: "flex", margin: "10px"}}>
                  <div style={yellowCardStyle}></div> : {homeData.totalYellowCard?.[resource]}
                  <div style={redCardStyle}></div> : 0
              </div>
            </div>

            <div style={{ textAlign: 'right' , color: "white"}}>
              <div style={{display: "flex", margin: "10px"}}>
                <div style={yellowCardStyle}></div> {awayData.totalYellowCard?.[resource]}
                <div style={redCardStyle}></div> : 0
              </div>
            </div>
          </div>





        </div>
      }
    </>
  );
}

const barStyle = {
  marginRight: "15px",
  borderRadius: "20px",
  color: "white",
  backgroundColor: "rgb(30, 42, 58)",
  border: 'none',
  padding: '5px 10px'
};

const mainBarStyle = {
  padding: "15px",
  color: "white",
  backgroundColor: "rgb(30, 42, 58)",
} 
const redCardStyle = {
  width: "15px",
  height: "20px",
  borderRadius: "4px",
  backgroundColor: "red",
  marginRight: "10px",
  marginLeft: "10px"

}
const yellowCardStyle = {
  width: "15px",
  height: "20px",
  borderRadius: "4px",
  backgroundColor: "yellow",
  marginRight: "10px",

}


export default App;
