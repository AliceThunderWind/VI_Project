// WorldCharts.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Chart from '../components/CaloryCharts';
import TopMalnutrition from '../components/TopMalnutrition';
import ComparisonSupply from '../components/ComparisonSupply';

import '../App.css';
import '../styles/WorldCharts.css';

const WorldCharts = () => {
  const [chartData, setChartData] = useState(null);
  const [topMalnutrition, setTopMalnutrition] = useState(null);
  const [comparisonSupply, setComparisonSupply] = useState(null);

  const { pathname } = useLocation();

  useEffect(() => {
    const canControlScrollRestoration = 'scrollRestoration' in window.history
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    fetch('http://localhost:8000/food-supply')
      .then(response => response.json())
      .then(data => {
        setChartData(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/compare-supply')
      .then(response => response.json())
      .then(data => {
        setComparisonSupply(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/undernourishement-data')
      .then(response => response.json())
      .then(data => {
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(([country, { values }]) => values.some(value => value !== 0))
        );
        setTopMalnutrition(filteredData);
      });
  }, []);

  return (
    <>
      <div className='world-main-container'>
        <h1 className='world-title'>World Hunger Facts & Statistics</h1>
        <div className='world-grid-container'>
          <div className='charts'>
            <Chart data={chartData} />
          </div>
          <div class="justified-text">
          <p>The average worldwide daily calorie intake of around 3000 calories suggests an overall 
            sufficiency of food supply. However, the persistence of malnutrition worldwide highlights 
            a critical issue in the equitable distribution of food resources. Malnutrition is a complex 
            problem influenced by various factors such as economic disparities, regional conflicts, 
            inadequate infrastructure, and social inequalities. Despite the global average, certain 
            regions and communities continue to face challenges in accessing an adequate and nutritious 
            diet. Inequitable distribution, coupled with issues like food insecurity, poverty, and lack 
            of education, contributes to the prevalence of malnutrition. Addressing these challenges 
            requires collaborative efforts on local, national, and international levels to implement 
            effective policies, improve infrastructure, and promote sustainable agricultural practices.</p>
          </div>
          <div className='charts'>
            <TopMalnutrition data={topMalnutrition} order="desc" color="red" id="1"/>
          </div>
          <div class="justified-text">
          <p>The observation that the 30 worst countries with high malnutrition rates tend to concentrate 
            around the equatorial plane underscores a noteworthy geographic pattern. This concentration may 
            be influenced by a combination of factors, including climate conditions, agricultural practices, 
            economic challenges, and access to resources. Regions around the equator often face unique challenges 
            related to climate variability, which can impact agricultural productivity and food security.</p>
          </div>
          <div className='charts'>
            <ComparisonSupply data={comparisonSupply} />
          </div>
          <div class="justified-text">
          <p>The chart depicting food types with the highest feed-to-production ratio sheds light on a critical 
            aspect of global food utilization. The notable disparities in feed efficiency highlight instances where 
            certain types of food resources are diverted towards feeding animals, seeding, or losses, rather than being 
            directly utilized for human consumption. This phenomenon underscores inefficiencies in the food supply chain 
            and prompts a reconsideration of resource allocation.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorldCharts;
