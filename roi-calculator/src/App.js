import React, { useState } from 'react';
import './App.css';

function compoundInterest(principal, rate, years) {
  // Calculates compound interest
  let amount = principal * Math.pow((1 + rate / 100), years);
  return amount;
}

function calculateROI(initialCost, timeSpent, annualEarnings, years, debtAmount = 0.0, interestRate = 0.0, debtYears = null) {
  // Calculate total earnings over the years
  let totalEarnings = annualEarnings * (years - timeSpent);

  // Default to using the same years if not specified
  if (debtYears === null) {
    debtYears = years;
  }

  // Calculate total cost of debt repayment over the specified debt years
  let debtCost = compoundInterest(debtAmount, interestRate, debtYears);

  let totalCost = Number(initialCost) + debtCost - debtAmount;

  // Calculate net earnings after deducting total cost and total debt repayment
  let netEarnings = totalEarnings - totalCost;

  // Calculate ROI
  let roi = (netEarnings / totalCost) * 100;

  return [roi, totalCost, netEarnings, debtCost, [initialCost, timeSpent, annualEarnings, years, debtAmount, interestRate, debtYears, totalEarnings]];
}

function ROICalculator({ title }) {
  // Define state variables for each input
  const [initialCost, setInitialCost] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [annualEarnings, setAnnualEarnings] = useState(0);
  const [years, setYears] = useState(0);
  const [debtAmount, setDebtAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [debtYears, setDebtYears] = useState(0);
  const [roi, setRoi] = useState([0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0]]);

  // Define the handleCalculate function
  const handleCalculate = (event) => {
    event.preventDefault();
    let result = calculateROI(initialCost, timeSpent, annualEarnings, years, debtAmount, interestRate, debtYears);
    setRoi(result);
  };

  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleCalculate}>
        <label>
          Initial Cost (including debt but not grants):
          <input type="number" value={initialCost} onChange={e => setInitialCost(e.target.value)} />
        </label>
        <label>
          Time Investment to Degree (years):
          <input type="number" value={timeSpent} onChange={e => setTimeSpent(e.target.value)} />
        </label>
        <label>
          Annual Earnings (USD, avg income over earning period):
          <input type="number" value={annualEarnings} onChange={e => setAnnualEarnings(e.target.value)} />
        </label>
        <label>
          Time Period (Years from today)
          <input type="number" value={years} onChange={e => setYears(e.target.value)} />
        </label>
        <label>
          Total Debt Amount (Principal):
          <input type="number" value={debtAmount} onChange={e => setDebtAmount(e.target.value)} />
        </label>
        <label>
          Interest Rate (APY, ie 6.5):
          <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
        </label>
        <label>
          Years Post-Graduation to Pay Off Debt:
          <input type="number" value={debtYears} onChange={e => setDebtYears(e.target.value)} />
        </label>
        <button type="submit">Calculate ROI</button>
      </form>
      <p>ROI: {roi[0].toFixed(2)}</p>
      <p>Total Cost: {Number(roi[1]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
      <p>Net Earnings: {Number(roi[2]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
      <p>Cost of loans with interest: {Number(roi[3]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
      <p>Logs: {roi[4].join(', ')}</p>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <ROICalculator title="Program Option 1" />
      <ROICalculator title="Program Option 2" />
    </div>
  );
}

export default App;