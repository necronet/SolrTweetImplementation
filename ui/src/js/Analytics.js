import React, { Component } from 'react';
import { Pie as PieChart } from "react-chartjs";

const dynamicColors = () => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
         };

const Analytics = ({results}) => {

  const colors = ["#F7464A","#46BFBD","#FDB45C","#949FB1","#4D5360","#761CFF"]
  const highlights = ["#FF5A5E","#5AD3D1","#FFC870","#A8B3C5","#616774","#8C40FF"]

  const options = {animateScale:false,animateRotate:false}
  const data = results.reduce((acc,val,i)=>{
    acc.push({value:val.count, label:val.val,color:colors[i],highlights:highlights[i]});
    return acc;
  },[]);

  console.log(data)
  return <div>
            <PieChart data={data} options={options} width="500" height="250" redraw/>
          </div>
}

export default Analytics;
