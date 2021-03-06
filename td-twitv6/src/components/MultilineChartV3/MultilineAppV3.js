/** App.js */
import React, {useState, useEffect} from "react";
import MultilineChart from "./views/MultilineChart";
import Legend from "./components/Legend";
import vcit from "./data/VCIT.json";
import portfolio from "./data/portfolio.json";
import schc from "./data/SCHC.json";
import "./styles.css";
import fiannafail from "./data/fiannaFail.json"
import finegael from "./data/finegael.json"
import ind from "./data/ind.json"
import sinnfein from "./data/sinnfein.json"
import labour from "./data/labour.json"
import { chamberStats } from './../../Backend/metaData';
import axios from "axios";
import { current } from "../../Backend/rollCall";





export default function MultilineAppV3 (data) {

  const [selectedItems, setSelectedItems] = useState([]);
  const [TDData, setTDData] = useState(null)
  
  
  
  useEffect(() => {

    setTDData(data)

}, []);







const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };
  
if (!TDData) return null;



console.log(TDData.data.filter(d => d.party == "Fine Gael"))










// const totalData = {
//   name: "Total",
//   color: "#ffffff",
//   items: partyStats('sf').followerData.map((d) => ({ ...d, date: new Date(d.date) }))
// };
  const weeks = TDData.data[0].followerData.length

function justParty(party) {


  var just = TDData.data.filter(td => td.party == party)

  

  return just

}

function partyStats(party) {

  //chamber
  var currentParty = justParty(party) 

  function followers() {

      var arr = [];
      var followArr = [];
      // var dateArr = currentParty[0].followerData.map(d => d.date);
      var dateArr = currentParty[0].followerData.map(function(d) {

                      var apart = d.date.split('/')
                      var day = apart[0]
                      var month = apart[1]
                      var year = apart[2]

                      var together = []
                      together.push(month, day, year)
                      var allDone = together.toString().replace(",","/").replace(",","/")
                      return allDone
                    })
      var changeArr = [];



      console.log(currentParty[0].retweetData.map(function(d) {

        var apart = d.date.split('/')
        var day = apart[0]
        var month = apart[1]
        var year = apart[2]

        var together = []
        together.push(month, day, year)
        var allDone = together.toString().replace(",","/").replace(",","/")
        return allDone

      }))

      // function weekDate () {

//           for(let i = 0; i < weeks; i++) {

//           var date = new Date();
//           date.setDate(date.getDate() + (7 * i));

//               function formatDate(date) {

//                   var d = new Date(date),
//                       month = '' + (d.getMonth() + 1),
//                       day = '' + d.getDate(),
//                       year = d.getFullYear();
              
//                   if (month.length < 2) 
//                       month = '0' + month;
//                   if (day.length < 2) 
//                       day = '0' + day;
              
//                   return [year, month, day].join('-');
//               }

//           dateArr.push(formatDate(date));
//       }


//   return dateArr
// }

//   weekDate();


      function follows () {
          
          for( let i = 0; i < weeks; i++) {


              var partyFollowers = currentParty.map(td => td.followerData[i].followers)

              var partyFollowersTotal = partyFollowers.reduce((a, b) => a + b, 0)

              followArr.push(partyFollowersTotal)
      
          }
      }

  follows();

      function change() {

          for( let i = 0; i < followArr.length; i++) {

              var lastWeek  = followArr[i - 1]
              var thisWeek = followArr[i]
              var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
              
              //filter NaN at start

              if(diff !== diff) {changeArr.push(0)} else {
              changeArr.push(diff)
              }
          }
      }

      change();

      function toObj() {

      for(let i = 0; i < weeks; i++) {

          var followObj = new Object;
          var date = dateArr[i];
          var followers = followArr[i];
          var change = changeArr[i];

          followObj.date = date;
          followObj.followers = followers;
          followObj.change = change;
          
          arr.push(followObj)

          
      }
  return arr
      
      }

      toObj();


      return arr
  } 

  function retweets() {

      var arr = [];
      var retweetArr = [];
      var dateArr = currentParty[0].retweetData.map(function(d) {

        var apart = d.date.split('/')
        var day = apart[0]
        var month = apart[1]
        var year = apart[2]

        var together = []
        together.push(month, day, year)
        var allDone = together.toString().replace(",","/").replace(",","/")
        return allDone

      })
      var changeArr = [];



      
//       function weekDate () {

//           for(let i = 0; i < weeks; i++) {

//           var date = new Date();
//           date.setDate(date.getDate() + (7 * i));

//               function formatDate(date) {

//                   var d = new Date(date),
//                       month = '' + (d.getMonth() + 1),
//                       day = '' + d.getDate(),
//                       year = d.getFullYear();
              
//                   if (month.length < 2) 
//                       month = '0' + month;
//                   if (day.length < 2) 
//                       day = '0' + day;
              
//                   return [year, month, day].join('-');
//               }

//           dateArr.push(formatDate(date));
//       }


//   return dateArr
// }

//   weekDate();


      function retweets () {
          
          for( let i = 0; i < weeks; i++) {


              var partyRetweets = currentParty.map(td => td.retweetData[i].retweets)

              var partyRetweetsTotal = partyRetweets.reduce((a, b) => a + b, 0)

              retweetArr.push(partyRetweetsTotal)
      
          }
      }

  retweets();

      function change() {

          for( let i = 0; i < retweetArr.length; i++) {

              var lastWeek  = retweetArr[i - 1]
              var thisWeek = retweetArr[i]
              var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
              
              //filter NaN at start

              if(diff !== diff) {changeArr.push(0)} else {
              changeArr.push(diff)
              }
          }
      }

      change();

      function toObj() {

      for(let i = 0; i < weeks; i++) {

          var retweetObj = new Object;
          var date = dateArr[i];
          var retweets = retweetArr[i];
          var change = changeArr[i];

          retweetObj.date = date;
          retweetObj.retweets = retweets;
          retweetObj.change = change;
          
          arr.push(retweetObj)

          
      }
  return arr
      
      }

      toObj();


      return arr
  }

  function polarity() {

    var arr = [];
    var polarityArr = [];
    var dateArr = currentParty[0].sentimentData.map(function(d) {

      var apart = d.date.split('/')
      var day = apart[0]
      var month = apart[1]
      var year = apart[2]

      var together = []
      together.push(month, day, year)
      var allDone = together.toString().replace(",","/").replace(",","/")
      return allDone

    })
    var changeArr = [];



    
//       function weekDate () {

//           for(let i = 0; i < weeks; i++) {

//           var date = new Date();
//           date.setDate(date.getDate() + (7 * i));

//               function formatDate(date) {

//                   var d = new Date(date),
//                       month = '' + (d.getMonth() + 1),
//                       day = '' + d.getDate(),
//                       year = d.getFullYear();
            
//                   if (month.length < 2) 
//                       month = '0' + month;
//                   if (day.length < 2) 
//                       day = '0' + day;
            
//                   return [year, month, day].join('-');
//               }

//           dateArr.push(formatDate(date));
//       }


//   return dateArr
// }

//   weekDate();


    function polarityAvg () {
        
        for( let i = 0; i < weeks; i++) {

          var tdAmount = currentParty.length

            var partyPolarity = currentParty.map(td => td.sentimentData[i].polarity)

            var partyPolarityAvg = partyPolarity.reduce((a, b) => a + b, 0) 

            polarityArr.push(partyPolarityAvg)
    
        }
    }

polarityAvg();

    function change() {

        for( let i = 0; i < polarityArr.length; i++) {

            var lastWeek  = polarityArr[i - 1]
            var thisWeek = polarityArr[i]
            var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
            
            //filter NaN at start

            if(diff !== diff) {changeArr.push(0)} else {
            changeArr.push(diff)
            }
        }
    }

    change();

    function toObj() {

    for(let i = 0; i < weeks; i++) {

        var polarityObj = new Object;
        var date = dateArr[i];
        var polAvg = polarityArr[i];
        var change = changeArr[i];

        polarityObj.date = date;
        polarityObj.polarityAvg = polAvg
        polarityObj.change = change;
        
        arr.push(polarityObj)

        
    }
return arr
    
    }

    toObj();


    return arr
}


  function PartyObj() {

      this.id = justParty(party)[0].party
      this.name = justParty(party)[0].partyName
      this.partyColor = justParty(party)[0].partyColor
      this.followerData = followers()
      this.retweetData = retweets()
      this.polarityData = polarity()

  }

  return new PartyObj()
}

console.log(partyStats("Aont??", TDData))

const fineGaelData = {
  name: "Fine Gael",
  color: "#6699FF",
  items: partyStats('Fine Gael', TDData).followerData.map((d) => ({ ...d, date: new Date(d.date) }))
};

console.log(fineGaelData)
const sinnFeinData = {
  name: "Sinn F??in",
  color: "#326760",
  items: partyStats("Sinn F??in", TDData).followerData.map((d) => ({ ...d, date: new Date(d.date) }))
};

const fiannaFailData = {
  name: "Fianna F??il",
  color: "#66BB66",
  items: partyStats('Fianna F??il', TDData).followerData.map((d) => ({ ...d, date: new Date(d.date) }))
};

const labourData = {
  name: "Labour",
  color: "#CC0000",
  items: partyStats('Labour Party', TDData).followerData.map((d) => ({ ...d, date: new Date(d.date) }))
};

const peopleBeforeProfitData = {
  name: "People Before Profit",
  color: "#660000",
  items: partyStats('Solidarity - People Before Profit', TDData).followerData.map((d) => ({ ...d, date: new Date(d.date) }))
};

const independentData = {
  name: "Independents",
  color: "#CCCCFF",
  items: partyStats('Independent').followerData.map((d) => ({ ...d, date: new Date(d.date) }))
};

const greenPartyData = {
  name: "Green Party",
  color: "#99CC33",
  items: partyStats('Green Party').followerData.map((d) => ({ ...d, date: new Date(d.date) }))
};

const independents4ChangeData = {
  name: "Independents 4 Change",
  color: "#FFFFFF",
  items: partyStats('Independents 4 Change').followerData.map((d) => ({ ...d, date: new Date(d.date) }))
};

const aontuData = {
  name: "Aont??",
  color: "#FFFFFF",
  items: partyStats('Aont??').followerData.map((d) => ({ ...d, date: new Date(d.date) }))
};


  console.log(partyStats("Aont??"))
  console.log(aontuData)
  

  
  const chartData = [
    ...[fineGaelData, fiannaFailData, sinnFeinData, labourData, independentData,  independents4ChangeData, peopleBeforeProfitData, greenPartyData, aontuData].filter((d) => selectedItems.includes(d.name))
  ];

  


const legendData = [ fineGaelData, sinnFeinData, fiannaFailData, independentData, labourData, independents4ChangeData, peopleBeforeProfitData, greenPartyData, aontuData ];


  return (
  <div className="featuredItem">
      <Legend
        data={legendData}
        selectedItems={selectedItems}
        onChange={onChangeSelection}
      />
      <MultilineChart data={chartData} />
      </div>

  );
}

