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
    // debugger
    const cryptoPrices = data.then(data => {
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
      // console.log(prices);
      return prices;
    });

    return cryptoPrices;
    // const func = async() => {
    //   let data = await CoinGeckoClient.coins.fetch('power-ledger');
    //   return data;
    // };
    //   for (let key in dataKey) {
    //     const coinObj = dataKey[key];
    //   }
    // });
  };

  async createChart() {

    // let test = async () => {
    //   const data = await this.getData();
    //   return data;
    // }
    // console.log(test());
    
    const ada = new Image();
    ada.src = "https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860";

    const miota = new Image();
    miota.src = "https://assets.coingecko.com/coins/images/692/thumb/IOTA_Swirl.png?1604238557";

    const xno = new Image();
    xno.src = "https://assets.coingecko.com/coins/images/756/thumb/nano.png?1637232468";

    const powr = new Image();
    powr.src = "https://assets.coingecko.com/coins/images/1104/thumb/power-ledger.png?1547035082";

    const xlm = new Image();
    xlm.src = "https://assets.coingecko.com/coins/images/100/thumb/Stellar_symbol_black_RGB.png?1552356157";


    const ctx = document.getElementById('mainChart').getContext('2d');

    // Gradient Fill:
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

    let delayed;

    const labels = ['Cardano', 'Iota', 'Nano', 'Power-Ledger', 'Stellar'];
    const data = {
      labels,
      datasets: [
        {
          // data: prices,
          data: await this.getData(),
          label: "Crypto's",
          fill: true,
          backgroundColor: gradient,
          pointStyle: [ada, miota, xno, powr, xlm],
          tension: 0.5,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
      options: {
        radius: 5,
        hitRadius: 30,
        hoverRadius: 12,
        responsive: true,
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        scales: {
          y: {
            ticks: {
              callback: function(value) {
                return '$' + value;
              }
            }
          }
        }
      }
    }

    const myChart = new Chart(ctx, config);
  }
  

};



export default MainChart;
