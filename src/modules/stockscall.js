const { sub, format } = require('date-fns');

function getStockPrice() {
  const today = new Date();
  const yesterday = sub(today, { days: 1 });
  const dayBefore = sub(today, { days: 2 });

  const formattedToday = format(today, 'yyyy-MM-dd');
  const formattedYesterday = format(yesterday, 'yyyy-MM-dd');
  const formattedDayBefore = format(dayBefore, 'yyyy-MM-dd');

  console.log(formattedToday);
  console.log(formattedDayBefore);
  console.log(formattedYesterday);

  async function fetchDataAndManagePrices(stockSymbol, manageFunction) {
    try {
      const response = await fetch(
        `https://api.polygon.io/v1/open-close/${stockSymbol}/${formattedYesterday}?adjusted=true&apiKey=qBl_JyU88JhE59kt7A0keOmf49iwKvv8`,
      );
      const stocksData = await response.json();
      console.log(stocksData);
      console.log(response);
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
    const stockArrow = document.querySelector('.stock-down');

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
          stockArrow.style.transform = 'translate(-2px, -1px) rotate(180deg)';
        } else {
          stockPrice.style.color = 'var(--negative-numbers)';
          stockArrow.style.color = 'var(--negative-numbers)';
          stockArrow.style.transform = 'translate(-2px, -1px) rotate(0)';
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
    const openPrice = nasdaqInfo.open;
    const closePrice = nasdaqInfo.close;

    const changePercentage = calculatePercentageChange(openPrice, closePrice);

    const finalPrice = `${changePercentage.toFixed(2)}%`;
    prices.push(finalPrice);
  }

  function calculatePercentageChange(openPrice, closePrice) {
    const priceDifference = openPrice - closePrice;

    const percentageChange = (priceDifference / closePrice) * 100;

    return percentageChange;
  }

  function manageApple(appleInfo) {
    const openPrice = appleInfo.open;
    const closePrice = appleInfo.close;

    const changePercentage = calculatePercentageChange(openPrice, closePrice);

    const finalPrice = `${changePercentage.toFixed(2)}%`;
    prices.push(finalPrice);
  }

  function manageDow(dowInfo) {
    const openPrice = dowInfo.open;
    const closePrice = dowInfo.close;

    const changePercentage = calculatePercentageChange(openPrice, closePrice);

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
