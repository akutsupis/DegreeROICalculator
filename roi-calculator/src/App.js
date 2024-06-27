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

  let totalCost = debtCost + initialCost - debtAmount;

  // Calculate net earnings after deducting total cost and total debt repayment
  let netEarnings = totalEarnings - totalCost;

  // Calculate ROI
  let roi = (netEarnings / totalCost) * 100;

  return [roi, totalCost, netEarnings, debtCost, [initialCost, timeSpent, annualEarnings, years, debtAmount, interestRate, debtYears]];
}

function App() {
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
      <form onSubmit={handleCalculate}>
        <label>
          Initial Cost:
          <input type="number" value={initialCost} onChange={e => setInitialCost(e.target.value)} />
        </label>
        <label>
          Time Spent:
          <input type="number" value={timeSpent} onChange={e => setTimeSpent(e.target.value)} />
        </label>
        <label>
          Annual Earnings:
          <input type="number" value={annualEarnings} onChange={e => setAnnualEarnings(e.target.value)} />
        </label>
        <label>
          Years:
          <input type="number" value={years} onChange={e => setYears(e.target.value)} />
        </label>
        <label>
          Debt Amount:
          <input type="number" value={debtAmount} onChange={e => setDebtAmount(e.target.value)} />
        </label>
        <label>
          Interest Rate:
          <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
        </label>
        <label>
          Debt Years:
          <input type="number" value={debtYears} onChange={e => setDebtYears(e.target.value)} />
        </label>
        <button type="submit">Calculate ROI</button>
      </form>
      <p>ROI: {roi[0]}</p>
      <p>Total Cost: {roi[1]}</p>
      <p>Net Earnings: {roi[2]}</p>
      <p>Cost of loans with interest: {roi[3]}</p>
    </div>
  );
}

export default App;