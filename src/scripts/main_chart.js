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
      ids: ['polkadot', 'cardano', 'dogecoin', 'solana'],
    })
    console.log(data);
    
    const cryptoPrices = data.then(data => {
      console.log(data[key])
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
      return prices;
    });

    return cryptoPrices;
  };

  async createChart() {
    // Create thumbnail images for the linechart points

    const dot = new Image();
    dot.src = "https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png?1639712644";

    const ada = new Image();
    ada.src = "https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860";

    const doge = new Image();
    doge.src = "https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png?1547792256";

    const sol = new Image();
    sol.src = "https://assets.coingecko.com/coins/images/4128/thumb/solana.png?1640133422";

    // Context for the chart.js library
    const ctx = document.getElementById('mainChart').getContext('2d');
    
    // Gradient Fill:
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    
    
    // Chart.js data:
    const labels = ['Polkadot', 'Cardano', 'DogeCoin', 'Solana'];
    const data = {
      labels,
      datasets: [
        {
          data: [0.796, 0.5479, 0.12, 0.00051],
          label: "KWH Per Blockchain Transaction",
          fill: true,
          backgroundColor: gradient,
          pointStyle: [dot, ada, doge, sol],
          tension: 0.5,
        },
      ],
    };
    let delayed; // setting var for animation function
    const config = {
      type: "line",
      data: data,
      options: {
        radius: 25,
        hitRadius: 10,
        hoverRadius: 10,
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
                return value;
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