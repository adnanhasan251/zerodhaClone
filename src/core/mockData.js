
export const generateMockData = (symbol, days = 30) => {
    const data = [];
    const basePrice = getBasePrice(symbol);
    const volatility = getVolatility(symbol);
    let price = basePrice;
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      const open = price + (Math.random() - 0.5) * volatility;
      const high = open + Math.random() * volatility;
      const low = open - Math.random() * volatility;
      const close = (open + high + low) / 3;
      
      data.push({
        date: date.toISOString().split('T')[0],
        open,
        high,
        low,
        close,
        volume: Math.floor(Math.random() * 1000000),
      });
      
      price = close;
    }
    return data;
  };
  
  
  const getBasePrice = (symbol) => {
    const prices = {
      'INFY': 180,
      'ONGC': 320,
      'TCS': 130,
      'KPITTECH': 250,
      'QUICKHEAL': 290,
      'WIPRO': 420,
      'N&M': 3500,
      'RELIANCE': 1500,
      'HUL': 140,
  
    };
    return prices[symbol] || 100;
  };
  
  const getVolatility = (symbol) => {
    const volatility = {
      'INFY': 8,  
      'ONGC': 6,
      'TCS': 5,
      'KPITTECH': 3,
      'QUICKHEAL': 3,
      'WIPRO': 4,
      'N&M': 40,
      'RELIANCE': 20,
      'HUL': 2,
    };
    return volatility[symbol] || 2;
  };
  
  
  export const getCompanyInfo = (symbol) => {
    const companyInfo = {
      'AAPL': { name: 'Apple Inc.', sector: 'Technology' },
      'MSFT': { name: 'Microsoft Corporation', sector: 'Technology' },
      'AMZN': { name: 'Amazon.com Inc.', sector: 'Consumer Cyclical' },
      'TSLA': { name: 'Tesla, Inc.', sector: 'Automotive' },
      'META': { name: 'Meta Platforms Inc.', sector: 'Technology' },
      'NVDA': { name: 'NVIDIA Corporation', sector: 'Technology' },
      'TCS': { name: 'Tata Consultancy Services', sector: 'Technology' },
      'INFY': { name: 'Infosys Limited', sector: 'Technology' },
      'JPM': { name: 'JPMorgan Chase & Co.', sector: 'Financial Services' },
      'GOOGL': { name: 'Alphabet Inc.', sector: 'Technology' }
    };
    return companyInfo[symbol] || { name: symbol, sector: 'Unknown' };
  };
  
export {  getBasePrice, getVolatility };