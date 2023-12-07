import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import * as d3 from 'd3';

import '../App.css';
import '../styles/Country.css'
import "../../node_modules/flag-icons/css/flag-icons.min.css";

export default function Country() {

  const [countryData, setCountryData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/nutritional-data-country/${id}`, { method: 'GET'} );
        if (response.ok) {
          const data = await response.json();
          setCountryData(data);
        } else {
          console.error('Profile data not found');
          setCountryData(null);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setCountryData(null);
      }
    };

    fetchCountryData();
  }, [id]);

  function calculateCategorySums(data) {
    const categorySums = {};
    if (data && data.country) {
      const categories = Object.keys(data.country).slice(5);
      console.log("Categories:", categories);
  
      categories.forEach(category => {
        const categoryData = data.country[category];

        if (Array.isArray(categoryData)) {
          categoryData.forEach(item => {
            const categoryValue = item[1];
            if (!categorySums[category]) {
              categorySums[category] = categoryValue;
            } else {
              categorySums[category] += categoryValue;
            }
          });
        } else {
          console.log(`Invalid data structure for category: ${category}`);
        }
      });
    } else {
      console.log("Invalid data structure. Missing 'country' property or data is null/undefined.");
    }
  
    return categorySums;
  };

  const result = calculateCategorySums(countryData);

  const ChartComponent = ({ data }) => {
    const chartRef = useRef(null);
    useEffect(() => {
      if (data && Object.keys(data).length > 0) {
        d3.select(chartRef.current).selectAll('*').remove();
  
        const margin = { top: 20, right: 20, bottom: 20, left: 30 };
        const width = 400 - margin.left - margin.right; // Increase the width
        const height = 400 - margin.top - margin.bottom;
        const svg = d3.select(chartRef.current)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
        const categoriesSet1 = ['production', 'import_quantity', 'stock_variation'];
        const filteredData1 = Object.fromEntries(
          Object.entries(data)
            .filter(([key, value]) => categoriesSet1.includes(key))
        );
        const valuesSet1 = categoriesSet1.map(category => data[category]);
        const categoriesSet2 = ['export_quantity', 'feed', 'losses', 'residuals', 'seed'];
        const filteredData2 = Object.fromEntries(
          Object.entries(data)
            .filter(([key, value]) => categoriesSet2.includes(key))
        );
        const valuesSet2 = categoriesSet2.map(category => data[category]);

        const dataArray1 = Object.keys(filteredData1).map(category => ({
          [category]: filteredData1[category],
        }));
        
        const dataArray2 = Object.keys(filteredData2).map(category => ({
          [category]: filteredData2[category],
        }));
  
        const stackSet1 = d3.stack().keys(Object.keys(filteredData1));
        const stackSet2 = d3.stack().keys(Object.keys(filteredData2));

        const stackedDataSet1 = stackSet1(dataArray1);
        const stackedDataSet2 = stackSet2(dataArray2);
  
        const xScaleSet1 = d3.scaleBand()
        .domain(['Input'])
        .range([0, width / 2])
        .padding(0.1);
  
        const xScaleSet2 = d3.scaleBand()
        .domain(['Output'])
        .range([width / 2, width]) 
        .padding(0.1);
  
        const xScale = label => (String(label).startsWith('Input') ? xScaleSet1(label) : xScaleSet2(label));
  
        const yScale = d3.scaleLinear()
          .domain([0, Math.max(
            d3.max(stackedDataSet1, d => d3.max(d, d => d[1])),
            d3.max(stackedDataSet2, d => d3.max(d, d => d[1]))
          )])
          .range([height, 0]);
  
        const colorSet1 = d3.scaleOrdinal()
          .domain(categoriesSet1)
          .range(['#1f77b4', '#ff7f0e', '#2ca02c']);
  
        const colorSet2 = d3.scaleOrdinal()
          .domain(categoriesSet2)
          .range(['#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f']);
  
        // Render Set 1 bars
        svg.selectAll()
          .data(stackedDataSet1)
          .enter()
          .append('g')
          .attr('fill', d => colorSet1(d.key))
          .selectAll('rect')
          .data(d => d)
          .enter()
          .append('rect')
          .attr('x', d => xScale(d.data))
          .attr('y', d => yScale(d[1]))
          .attr('height', d => yScale(d[0]) - yScale(d[1]))
          .attr('width', d => xScaleSet1.bandwidth()); // Use the bandwidth of the first set of labels
  
        // Render Set 2 bars
        svg.selectAll()
          .data(stackedDataSet2)
          .enter()
          .append('g')
          .attr('fill', d => colorSet2(d.key))
          .selectAll('rect')
          .data(d => d)
          .enter()
          .append('rect')
          .attr('x', d => xScale(d.data))
          .attr('y', d => yScale(d[1]))
          .attr('height', d => yScale(d[0]) - yScale(d[1]))
          .attr('width', d => xScaleSet2.bandwidth());
  
        svg.append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(xScaleSet1).tickSizeOuter(0));

        svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScaleSet2).tickSizeOuter(0)); 
  
        svg.append('g')
          .call(d3.axisLeft(yScale));
  
        // Legend Set 1
        const legendSet1 = svg.selectAll('.legendSet1')
          .data(categoriesSet1)
          .enter()
          .append('g')
          .attr('class', 'legendSet1')
          .attr('transform', (d, i) => `translate(${width - 120},${i * 20})`);
  
        legendSet1.append('rect')
          .attr('width', 15)
          .attr('height', 15)
          .attr('fill', d => colorSet1(d));
  
        legendSet1.append('text')
          .attr('x', 20)
          .attr('y', 9)
          .attr('dy', '.35em')
          .style('text-anchor', 'start')
          .text(d => d);
  
        // Legend Set 2
        const legendSet2 = svg.selectAll('.legendSet2')
          .data(categoriesSet2)
          .enter()
          .append('g')
          .attr('class', 'legendSet2')
          .attr('transform', (d, i) => `translate(${width},${i * 20})`);
  
        legendSet2.append('rect')
          .attr('width', 15)
          .attr('height', 15)
          .attr('fill', d => colorSet2(d));
  
        legendSet2.append('text')
          .attr('x', 20)
          .attr('y', 9)
          .attr('dy', '.35em')
          .style('text-anchor', 'start')
          .text(d => d);
      }
    }, [data]);
  
    return <div ref={chartRef}></div>;
  };

  return (
  <div className="page-container">
    {countryData && (
    <div className="country-container">
      <span className={`fi fi-${countryData.country.iso2.toLowerCase()}`}></span>
      <h1 className="country-name">{countryData.country.name}</h1>
    </div>
    )}
    <div className="parent-container">
      <div className="child-container">
        <div className="top-left">
          {/* TODO: Add component for top left */}
        </div>
        <div className="bottom-left">
          {/* TODO: Add component for bottom left */}
        </div>
      </div>
      <div className="child-container">
        <div className="top-right">
          <ChartComponent data={result} />
        </div>
      </div>
    </div>
  </div>
  );
}