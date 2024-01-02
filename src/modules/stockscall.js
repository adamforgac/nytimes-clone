const { format, subDays } = require('date-fns');

function getStockPrice() {
  const today = new Date();
  const yesterday = subDays(today, 4);
  const dayBefore = subDays(today, 5);

  const formattedToday = format(today, 'yyyy-MM-dd');
  const formattedYesterday = format(yesterday, 'yyyy-MM-dd');
  const formattedDayBefore = format(dayBefore, 'yyyy-MM-dd');

  async function fetchDataAndManagePrices(stockSymbol, manageFunction) {
    try {
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/day/${formattedDayBefore}/${formattedYesterday}?adjusted=true&sort=asc&limit=120&apiKey=qBl_JyU88JhE59kt7A0keOmf49iwKvv8`,
        { mode: 'cors' },
      );
      const stocksData = await response.json();
      console.log(stocksData);
      manageFunction(stocksData);
    } catch (error) {
      // alert(`Error fetching ${stockSymbol} data: ${error}`);
    }
  }

  const prices = [];

  function changeDomPrice() {
    const infoArray = [
      ['Nasdaq', prices[0]],
      ['Apple', prices[1]],
      ['Dow', prices[2]],
    ];

    const stockInfoContainer = document.querySelector('.stocks-info');
    const stockName = document.querySelector('.stock-name');
    const stockPrice = document.querySelector('.stock-percentage');
    const stockArrow = document.querySelector('.percentage');

    let index = 0;

    function updateStockInfo() {
      const [name, price] = infoArray[index];

      stockPrice.classList.add('fade-out');
      stockArrow.classList.add('fade-out');
      stockName.classList.add('fade-out');

      setTimeout(() => {
        stockName.textContent = name;
        stockPrice.textContent = price;
        if (!stockPrice.textContent.includes('-')) {
          stockPrice.style.color = 'green';
          stockArrow.style.color = 'green';
          stockArrow.style.transform = 'translate(-5px, 4px) rotate(180deg)';
        } else {
          stockPrice.style.color = 'var(--negative-numbers)';
          stockArrow.style.color = 'var(--negative-numbers)';
          stockArrow.style.transform = 'translate(-5px, 5px) rotate(0)';
        }

        stockPrice.classList.remove('fade-out');
        stockArrow.classList.remove('fade-out');
        stockName.classList.remove('fade-out');
      }, 500);

      index = (index + 1) % infoArray.length;
    }

    updateStockInfo();
    setInterval(updateStockInfo, 5000);
  }

  function manageNasdaq(nasdaqInfo) {
    const firstPrice = nasdaqInfo.results[0].o;
    const secondPrice = nasdaqInfo.results[1].o;

    const changePercentage = calculatePercentageChange(firstPrice, secondPrice);

    const finalPrice = `${changePercentage.toFixed(2)}%`;
    prices.push(finalPrice);
  }

  function calculatePercentageChange(todayPrice, yesterdayPrice) {
    const priceDifference = todayPrice - yesterdayPrice;

    const percentageChange = (priceDifference / yesterdayPrice) * 100;

    return percentageChange;
  }

  function manageApple(appleInfo) {
    const firstPrice = appleInfo.results[0].o;
    const secondPrice = appleInfo.results[1].o;

    const changePercentage = calculatePercentageChange(firstPrice, secondPrice);

    const finalPrice = `${changePercentage.toFixed(2)}%`;
    prices.push(finalPrice);
  }

  function manageDow(dowInfo) {
    const firstPrice = dowInfo.results[0].o;
    const secondPrice = dowInfo.results[1].o;

    const changePercentage = calculatePercentageChange(firstPrice, secondPrice);

    const finalPrice = `${changePercentage.toFixed(2)}%`;
    prices.push(finalPrice);
  }

  Promise.all([
    fetchDataAndManagePrices('NDAQ', manageNasdaq),
    fetchDataAndManagePrices('AAPL', manageApple),
    fetchDataAndManagePrices('DOW', manageDow),
  ]).then(() => {
    changeDomPrice();
  });
}

export default getStockPrice;
