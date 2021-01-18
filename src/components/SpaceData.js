import React, { useState, useEffect } from "react";
import "./SpaceData.css";
//import FilterBox from "./Filter";

const API_URL = "https://api.spaceXdata.com/v3/launches?limit=100";

const RocketLaunch = () => {
  const [launchData, setLaunchData] = useState(null);
  const [launchYear, setLaunchYear] = useState(null);
  const [launchSuccess, setLaunchSuccess] = useState(null);
  const [landSuccess, setLandSuccess] = useState(null);


  let filterQuery = '';
  if(launchYear){
    filterQuery +='&launch_year='+launchYear;
  } 
  if(launchSuccess){
        filterQuery +='&launch_success=true';
   } 
   if(launchSuccess === false){
    filterQuery +='&launch_success=false';
   }
   if(landSuccess){
       filterQuery += '&land_success=true';
   }
   if(landSuccess === false){
    filterQuery += '&land_success=false';
}


  useEffect(() => {
        fetch(API_URL+filterQuery)
          .then((response) => response.json())
          .then((data) => {
            setLaunchData(data);
          })
          .catch((error) => {
            console.log(error);
          });
      
  }, [filterQuery]);


  const clearFilter = () => {
        setLaunchSuccess(null);
        setLaunchYear(null);
        setLandSuccess(null);
  }

  const yearList = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]
  const yearFilter = yearList.map((year, index) => {
    return (       
      
      <button value={year} onClick={() => {launchYear === year ? setLaunchYear(null) : setLaunchYear(year) }} key={index} className={year === launchYear ? 'activeButton' : ''} >
        {year} 
      </button>
      
    );
  });

  const dataColumns =
    launchData &&
    launchData.map((val, index) => {
      return (
        <div className="column" key={index}>
          <div className="card">
            <div className="img-container">
              <img src={val.links.mission_patch_small} alt="Avatar" />
            </div>
            <div className="content-container">
              <h2>
                {val.mission_name} #{val.flight_number}
              </h2>
              <h3>Mission Ids</h3>
              {val.mission_id && val.mission_id.length > 0 ? (
                <ul>
                  <li>{val.mission_id}</li>
                </ul>
              ) : (
                <ul>
                  <li>No Records</li>
                </ul>
              )}
              <p>
                <b>Launch Year: </b>
                {val.launch_year}
              </p>
              <p>
                <b>Successful Launch: </b>
                {val.launch_success === true && "true"}
                {val.launch_success === false && "false"}
                {val.launch_success === null && "Not available"}
              </p>
              <p>
                <b>Successful Landing: </b>
                {val.rocket.first_stage.cores[0].land_success === true && "true"}
                {val.rocket.first_stage.cores[0].land_success === false && "false"}
                {val.rocket.first_stage.cores[0].land_success === null && "Not available"}
              
              </p>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="container">
      <div className="filterRow">
        <div className="column">
          <div className="card">

            <h2>Filters ({dataColumns && dataColumns.length+' records'}) { launchYear || launchSuccess || landSuccess ? <span onClick={clearFilter} className="clearFliter">Clear Filter</span> : "" } </h2>
            <div className="filter-container">
              <h3> Launch Year</h3>
                <p>{yearFilter}</p>
              <h3> Successful Launch</h3>
              <p>
                <button onClick={() => { launchSuccess === true ? setLaunchSuccess(null) : setLaunchSuccess(true) } }  className={ launchSuccess ? 'activeButton' : '' }>True</button>
                <button onClick={() => { launchSuccess === false ? setLaunchSuccess(null) : setLaunchSuccess(false);  }} className={ launchSuccess === false ? 'activeButton' : '' }>False</button>
              </p>
              <h3> Successful Landing</h3>
              <p>
                <button onClick={() => { landSuccess === true ? setLandSuccess(null) : setLandSuccess(true) }} className={ landSuccess ? 'activeButton' : '' }>True</button>
                <button onClick={() => { landSuccess === false ? setLandSuccess(null) : setLandSuccess(false); }} className={ landSuccess === false ? 'activeButton' : '' }>False</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="dataRow">
          {dataColumns && dataColumns.length >0 ? dataColumns : "No records found"}
          <p className="devInfo"> <b>Developed by:</b> Abhishek Singh</p>
          </div>   
    </div>
  );
};

export default RocketLaunch;
