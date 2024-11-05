const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
// Enable CORS
app.use(cors());

// Sample stock data
let stocks = [
  {
    id: 1,
    name: 'Reliance Industries',
    price: 2500,
    growth: 3.5,
    industry: 'Finance',
    exchange: 'NSE',
  },
  {
    id: 2,
    name: 'Tata Consultancy Services',
    price: 3200,
    growth: 2.8,
    industry: 'IT',
    exchange: 'NSE',
  },
  {
    id: 3,
    name: 'Infosys',
    price: 1800,
    growth: 4.2,
    industry: 'IT',
    exchange: 'NSE',
  },
  {
    id: 4,
    name: 'HDFC Bank',
    price: 1500,
    growth: 3.0,
    industry: 'Finance',
    exchange: 'NSE',
  },
  {
    id: 5,
    name: 'State Bank of India',
    price: 500,
    growth: 5.0,
    industry: 'Finance',
    exchange: 'NSE',
  },
];

// Define the endpoint
app.get('/stocks/sort/pricing', (req, res) => {
  const pricing = req.query.pricing;
  if (!pricing || (pricing !== 'low-to-high' && pricing !== 'high-to-low')) {
    return res.status(400).json({ error: "Invalid pricing parameter. Use 'low-to-high' or 'high-to-low'." });
  }

  // Sort stocks based on the pricing parameter
  const sortedStocks = [...stocks].sort((a, b) => {
    return pricing === 'low-to-high' ? a.price - b.price : b.price - a.price;
  });
  res.json(sortedStocks); // Send sorted stocks as JSON response
});
app.get('/stocks/sort/growth', (req, res) => {
  const order = req.query.order; // Get the sorting order from query parameter

  let sortedStocks;
  if (order === 'high-to-low') {
    sortedStocks = stocks.sort((a, b) => b.growth - a.growth); // Sort high to low
  } else {
    sortedStocks = stocks.sort((a, b) => a.growth - b.growth); // Sort low to high
  }

  res.json({ stocks: sortedStocks }); // Send sorted stocks as JSON response
});
  

app.get('/stocks/sort/growth', (req, res) => {
    const { growth } = req.query; // Retrieve the growth parameter from query string
  
    // Validate the 'growth' parameter
    if (!growth || (growth !== 'low-to-high' && growth !== 'high-to-low')) {
      return res.status(400).json({ error: "Invalid growth parameter. Use 'low-to-high' or 'high-to-low'." });
    }
  
    // Sort stocks based on the growth parameter
    const sortedStocks = [...stocks].sort((a, b) => {
      return growth === 'low-to-high' ? a.growth - b.growth : b.growth - a.growth;
    });
  
    // Send the sorted stocks as a JSON response
    res.json(sortedStocks);
  });
  
  
function filterByExchange(exchange) {
  return stocks.filter(
    (stock) => stock.exchange.toLowerCase() === exchange.toLowerCase()
  );
}
// Endpoint to filter stocks by exchange
app.get('/stocks/filter/exchange', (req, res) => {
  const exchange = req.query.exchange; // Get the exchange from query parameter

  if (!exchange) {
    return res.status(400).json({ error: 'Exchange parameter is required' });
  }

  const filteredStocks = filterByExchange(exchange); // Filter stocks by exchange
  res.json({ stocks: filteredStocks }); // Send filtered stocks as JSON response
});

function filterByIndustry(industry) {
  return stocks.filter(
    (stock) => stock.industry.toLowerCase() === industry.toLowerCase()
  );
}

// Endpoint to filter stocks by industry
app.get('/stocks/filter/industry', (req, res) => {
  const industry = req.query.industry; // Get the industry from query parameter

  if (!industry) {
    return res.status(400).json({ error: 'Industry parameter is required' });
  }

  const filteredStocks = filterByIndustry(industry); // Filter stocks by industry
  res.json({ stocks: filteredStocks }); // Send filtered stocks as JSON response
});
app.get('/stocks', (req, res) => {
  res.json({ stocks }); // Send all stocks as JSON response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
