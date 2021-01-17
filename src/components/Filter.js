import React,{useState} from 'react';



const yearList = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]


const FilterBox = () => {

    const [launchYear, setLaunchYear] = useState('');
    const [launchSuccess, setLaunchSuccess] = useState('');
    const [landSuccess, setLandSuccess] = useState('');
  


   const yearFilter = yearList.map((year,index) => {
    return(
            <button value={year} onClick={setLaunchYear(year)} key={index}>{year}</button>
        )}); 


    return (
    <div className="column">
      <div className="card">
      <h2>Filters</h2>
        <div className="filter-container">
          <h3> Launch Year</h3>
          <p>{yearFilter}</p>
          <h3> Successful Launch</h3>
          <p>
            <button onClick={setLaunchSuccess(true)}>True</button>
            <button onClick={setLaunchSuccess(false)}>False</button>
          </p>
          <h3> Successful Landing</h3>
          <p>
            <button onClick={setLandSuccess(true)}>True</button>
            <button onClick={setLandSuccess(false)}>False</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
