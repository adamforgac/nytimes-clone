const { sub, format } = require('date-fns');

function getStockPrice() {
  const today = new Date();
  const yesterday = sub(today, { days: 1 });

  const formattedYesterday = format(yesterday, 'yyyy-MM-dd');
  console.log(formattedYesterday);

  async function getNasdaq() {
    const response = await fetch(
      `https://api.polygon.io/v1/open-close/NDAQ/${formattedYesterday}?adjusted=true&apiKey=qBl_JyU88JhE59kt7A0keOmf49iwKvv8`,
    );
    const stocksData = await response.json();
    console.log(stocksData);
    addToStockObjects(stocksData, 'Nasdaq');
  }

  async function getApple() {
    const response = await fetch(
      `https://api.polygon.io/v1/open-close/AAPL/${formattedYesterday}?adjusted=true&apiKey=qBl_JyU88JhE59kt7A0keOmf49iwKvv8`,
    );
    const stocksData = await response.json();
    console.log(stocksData);
    addToStockObjects(stocksData, 'Apple');
  }

  async function getDow() {
    const response = await fetch(
      `https://api.polygon.io/v1/open-close/AMZN/${formattedYesterday}?adjusted=true&apiKey=qBl_JyU88JhE59kt7A0keOmf49iwKvv8`,
    );
    const stocksData = await response.json();
    console.log(stocksData);
    addToStockObjects(stocksData, 'Amazon');
  }

  const asyncFunctions = [getNasdaq(), getApple(), getDow()];

  Promise.all(asyncFunctions)
    .then(() => {
      changeDomPrice();
    });

  const stockObjects = [];

  function addToStockObjects(data, stock) {
    const stockInfo = {
      stockName: stock,
      stockPriceOpen: data.open,
      stockPriceClose: data.close,
      calculatePercentage() {
        const priceDifference = this.stockPriceClose - this.stockPriceOpen;
        const percentageChange = (priceDifference / this.stockPriceClose) * 100;
        const finalPrice = `${percentageChange.toFixed(2)}%`;
        return finalPrice;
      },
    };

    stockObjects.push(stockInfo);
  }

  function changeDomPrice() {
    const stockName = document.querySelector('.stock-name');
    const stockPrice = document.querySelector('.stock-percentage');
    const stockArrow = document.querySelector('.stock-down');

    let index = 0;

    function updateStockInfo() {
      stockPrice.classList.add('fade-out');
      stockArrow.classList.add('fade-out');
      stockName.classList.add('fade-out');
      const currentStockName = stockObjects[index].stockName;
      const currentStockPrice = stockObjects[index].calculatePercentage();

      setTimeout(() => {
        stockName.textContent = currentStockName;
        stockPrice.textContent = currentStockPrice;
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

      index = (index + 1) % stockObjects.length;
    }

    updateStockInfo();
    setInterval(updateStockInfo, 5000);
  }
}
export default getStockPrice;
