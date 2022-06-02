import Chart from 'chart.js/auto';
const CoinGecko = require('coingecko-api');

class MainChart {
  constructor(el) {
    this.el = el;
    this.el.innerHTML = "<canvas>mainChart</canvas>";
  }

  getData() {
    const CoinGeckoClient = new CoinGecko();
    let data = CoinGeckoClient.simple.price({
      ids: ['cardano', 'iota', 'nano', 'power-ledger', 'stellar'],
    })
    data.then(data => {
      const coins = [];
      const temp = [];
      let dataKey = data.data;
      for (let key in dataKey) {
        coins.push(key);
        temp.push(dataKey[key]);
      }
      let prices = [];
      temp.forEach(price => {
        prices.push(Object.values(price));
      });
      prices = prices.flat(Infinity);
      console.log(coins);
      console.log(prices);
    });
    // const func = async() => {
    //   let data = await CoinGeckoClient.coins.fetch('power-ledger');
    //   return data;
    // };
    //   for (let key in dataKey) {
    //     const coinObj = dataKey[key];
    //   }
    // });
  };

  createChart() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    const graph = new Chart(ctx, {
      type:'bar',
      data:{
        labels: ['cardano', 'iota', 'nano', 'power-ledger', 'stellar'],
        datasets: [{
          label:'Top 5 Environmentally Friendly CryptoCurrencies',
          data: [0.555117, 0.137137, 1.17, 0.332455, 0.28136],
          backgroundColor: ['green', 'blue', 'teal', 'purple', 'pink'],
          autoPadding: true,
          label: {
            font: {
              size: 30,
            }
          }
        }]
      },
    });
  }
  
}



export default MainChart;
