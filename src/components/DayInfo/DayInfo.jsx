import React from "react";
import "./DayInfo.css";

/*https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/casablanca?unitGroup=uk&key=VJ3DZUDUFNBGMJT5A8CCQNU3B&contentType=json*/

export default function DayInfo(props) {
  return (
    <div>
      <div className="day-container">
        <div className="city-date">
          
          <h3>{props.dayName} <br></br>
            <span>{props.dayDate}</span></h3>
        </div>

        <div className="previsions">
          <img
            src={props.srcIcon}
            className="weatherIcon"
            onError={(event) => {
              event.target.src = "icons/cloudy.png";
            }}
          ></img>
          <h3>{props.temperature} °C</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}
