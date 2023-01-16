import React, { useEffect, useState } from "react";
import "./WheatherApp.css";
import DayInfo from "../DayInfo/DayInfo";

export default function WheatherApp() {

//*******  LIST OF CONSTANTS AND THEIR INITIAL STATES  ***************************************

        const [search, setSearch] = useState("");
        const [fetchedData, setFetchedData] = useState(null);
        const [startUpdate, setStartUpdate] = useState(false);
        const [temp, setTemp] = useState(null);
        const [adress, setAdress] = useState("");
        const [description, setDescription] = useState("");
        const [daysArray, setDaysArray] = useState([]);


// *************  HOOKS AND FUNCTIONS  *********************************************************************************************

  // HANDLE THE INPUT OF THE USER'S SEARCH
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  // 1)FETCHING THE DATA FROM THE API AFTER THE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      setStartUpdate(true);
      fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}/next7days?unitGroup=uk&key=VJ3DZUDUFNBGMJT5A8CCQNU3B&contentType=json`
      )
        .then((response) => response.json())
        .then((result) => {
          setFetchedData(result);
        });
    }
  };

  //2) USING USEFFECT TO UPDATE THE INFOS WITH EVERY NEW SUBMIT OF THE USER
  useEffect(() => {
    if (startUpdate) {
      // NOWCAST : WEATHER OF TODAY:
      setTemp(fetchedData.currentConditions.temp);
      setDescription(fetchedData.currentConditions.conditions);
      setAdress(fetchedData.resolvedAddress);
   
      // FORECAST :
      setDaysArray(fetchedData.days);
    }
    setSearch("");  
  }, [fetchedData]);


// **********  RETURNING THE DOM ELEMENTS  ***********************************************************************


  return (
    <div className="weather-app-container">
      <div className="top-container">
        <h1 id="appLogo">Weastheros App</h1>
        <h3>Explore this week's forecast weather</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the city of your choice"
            onChange={handleInput}
            value={search}
          ></input>
          <button type="submit" className="searchBtn">
            Search
          </button>
        </form>

    {
      (startUpdate)?
        <div className="city-temp">
                  <div className="city">
                  <h1>{adress}</h1>
                  </div>

                  <div className="todayPrev">
                  <h2>Currently feels like {temp} °C<br></br>
                  {description} weather
                  </h2>
                  </div>
              </div>

        :null
    }

     </div> 
      

{
  (fetchedData !== null)?    
        <div className="forecast-container">
          <div className="forecast-items">
            {daysArray.map((key, index) => {
              const DayDate = daysArray[index].datetime ;
              let date = new Date(DayDate);
              let day = date.toLocaleString('en-us', {weekday: 'long'});

                return (
                  <div className="dayInfos" key={`${index}`} id={`item${index}`}>
                    <DayInfo
                      dayDate={daysArray[index].datetime}
                      dayName={day}
                      temperature={daysArray[index].temp}
                      srcIcon={`icons/${daysArray[index].icon}.png`}
                      description={daysArray[index].description}
                    />
                  </div>
              );
            })}
          </div>
        </div>
        :null
  
}      
      
    </div>
  );
}
