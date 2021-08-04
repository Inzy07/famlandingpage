import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Projects({proj}) {
  const { project_name,area,price,downpayment,images } = proj;
  const [transLabels, settransLabels] = useState([]);
  const router = useRouter();
  const cat = router.query.cat;
  const lang = router.query.lang;
  useEffect(() => {
      fetch('https://fam-erp.com/property/website/FamLandingPageTranslation/'+cat+'/'+lang) 
        .then((res) => res.json())
        .then((data) => settransLabels(data.items[0]));
  }, []);
  return (
    <li className="t-Card-items">
    <div className="t-Card">
          <div className="t-Card-wrap">
          <div className="cards-image">
          {images.map( (item, index) => {
            return(
              index == 0 &&
              <img src={item.image} key={item.image} width="100%" height="250px"/>
            )
          })}
          </div>
          <div className="card-body">
            <h2 className="margin-none">{project_name}</h2>
            <p className="margin-none">At {area}</p>
            <ul className="card-info">
              
              <li>{ transLabels.currency_symbol} {abbreviateNumber(price)}<span>{ transLabels.starting_price}</span></li>
              <li>{downpayment}<span>{ transLabels.downpayment}</span></li>
            </ul>
            <ul className="card-buttons">
              <li><a href="#">{ transLabels.view_photos}</a></li>
              <li><a href="#">{ transLabels.video_title}</a></li>
              <li><a href="#">{ transLabels.learn_more}</a></li>
            </ul>
            </div>
          </div>
     </div>
     </li>
  );
}
let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
function abbreviateNumber(number){
    // what tier? (determines SI symbol)
    let tier = Math.log10(Math.abs(number)) / 3 | 0;
    // if zero, we don't need a suffix
    if(tier == 0) return number;
    // get suffix and determine scale
    let suffix = SI_SYMBOL[tier];
    let scale = Math.pow(10, tier * 3);
    // scale the number
    let scaled = number / scale;
    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}
