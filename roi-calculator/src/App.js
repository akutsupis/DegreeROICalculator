import React, { useState } from 'react';
import './App.css';

function compoundInterest(principal, rate, years) {
  let amount = principal * Math.pow((1 + rate / 100), years);
  return amount;
}

function calculateROI(initialCost, timeSpent, annualEarnings, years, debtAmount = 0.0, interestRate = 0.0, debtYears = null) {
  if (debtYears === null) {
    debtYears = years;
  }
  let totalEarnings = annualEarnings * (years - timeSpent);
  let debtCost = compoundInterest(debtAmount, interestRate, debtYears);
  let totalCost = Number(initialCost) + debtCost - debtAmount;
  let netEarnings = totalEarnings - totalCost;
  let roi = (netEarnings / totalCost) * 100;
  return [roi, totalCost, netEarnings, debtCost, [initialCost, timeSpent, annualEarnings, years, debtAmount, interestRate, debtYears, totalEarnings]];
}

function ROICalculator({ title, setRoi }) {
  const [initialCost, setInitialCost] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [annualEarnings, setAnnualEarnings] = useState(0);
  const [years, setYears] = useState(0);
  const [debtAmount, setDebtAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [debtYears, setDebtYears] = useState(0);
  const [output, setOutput] = useState([0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0]]);

  const handleCalculate = (event) => {
    event.preventDefault();
    let result = calculateROI(initialCost, timeSpent, annualEarnings, years, debtAmount, interestRate, debtYears);
    setOutput(result);
    setRoi(result);
  };

  return (
    <div className="ROICalculator">
      <h2>{title}</h2>
      <form onSubmit={handleCalculate}>
        <label>
          Initial Cost:
          <input type="number" value={initialCost} onChange={e => setInitialCost(e.target.value)} />
        </label>
        <label>
          Time Investment (years):
          <input type="number" value={timeSpent} onChange={e => setTimeSpent(e.target.value)} />
        </label>
        <label>
          Annual Earnings:
          <input type="number" value={annualEarnings} onChange={e => setAnnualEarnings(e.target.value)} />
        </label>
        <label>
          Time Period (Years):
          <input type="number" value={years} onChange={e => setYears(e.target.value)} />
        </label>
        <label>
          Total Debt Amount:
          <input type="number" value={debtAmount} onChange={e => setDebtAmount(e.target.value)} />
        </label>
        <label>
          Interest Rate (%):
          <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
        </label>
        <label>
          Years to Pay Off Debt:
          <input type="number" value={debtYears} onChange={e => setDebtYears(e.target.value)} />
        </label>
        <button type="submit">Calculate ROI</button>
      </form>
       <div className="output">
        <p><strong>ROI:</strong> {output[0].toFixed(2)}%</p>
        <p><strong>Total Cost:</strong> ${Number(output[1]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        <p><strong>Net Earnings (Total):</strong> ${Number(output[2]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        <p><strong>Net Earnings (Annual):</strong> ${Number(output[2] / years).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        <p><strong>Cost of loans with interest:</strong> ${Number(output[3]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
      </div>
    </div>
  );
}

function ROIComparison({ roi1, roi2 }) {
  let roiDiff = roi1[0] - roi2[0];
  let totalCostDiff = roi1[1] - roi2[1];
  let netEarningsDiff = roi1[2] - roi2[2];
  let debtCostDiff = roi1[3] - roi2[3];

  return (
    <div className="ROIComparison">
      <h2>Comparison</h2>
      <p><strong>ROI Difference:</strong> {roiDiff.toFixed(2)}%</p>
      <p><strong>Total Cost Difference:</strong> ${totalCostDiff.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
      <p><strong>Net Earnings Difference:</strong> ${netEarningsDiff.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
      <p><strong>Cost of Loans with Interest Difference:</strong> ${debtCostDiff.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
    </div>
  );
}

function App() {
  const [roi1, setRoi1] = useState([0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0]]);
  const [roi2, setRoi2] = useState([0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0]]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Education Return on Investment Calculator</h1>
      </header>
      <div className="calculators-container">
        <ROICalculator title="Program Option 1" setRoi={setRoi1} />
        <ROICalculator title="Program Option 2" setRoi={setRoi2} />
      </div>
      <ROIComparison roi1={roi1} roi2={roi2} />
    </div>
  );
}

export default App;