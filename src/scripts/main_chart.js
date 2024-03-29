import Chart from 'chart.js/auto';
const CoinGecko = require('coingecko-api');

class MainChart {
  constructor(el) {
    this.el = el;
    this.el.innerHTML = "<canvas>mainChart</canvas>";
  }

  // Get all of the data needed to render the chart
  getData() {
    const CoinGeckoClient = new CoinGecko();
    let data = CoinGeckoClient.simple.price({
      ids: ["polkadot", "cardano", "dogecoin", "solana"],
    })

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
    const ctx = document.getElementById("mainChart").getContext("2d");
    
    // Gradient Fill:
    let gradient = ctx.createLinearGradient(0, 0, 0, 750);
    gradient.addColorStop(0, 'rgba(100, 255, 35, 1)');
    gradient.addColorStop(1, 'rgba(125, 125, 250, 1)');
    
    
    // Chart.js data:
    const data = {
      labels: [
        "Polkadot", 
        "Cardano", 
        "DogeCoin", 
        "Solana"
      ],
      datasets: [{
        type: "line",
        label: "Line kWh Per Blockchain Transaction",
        data: [0.796, 0.5479, 0.12, 0.00051],
        fill: false,
        pointStyle: [dot, ada, doge, sol],
        tension: 0.5,
      }, {
        type: "bar",
        label: "Bar kWh Per Blockchain Transaction",
        data: [0.796, 0.5479, 0.12, 0.00051],
        fill: true,
        backgroundColor: gradient,
        pointStyle: [dot, ada, doge, sol],
        tension: 0.5,
      }],
    };

    // setting var for animation function
    let delayed;
    const config = {
      type: "scatter",
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
            if (context.type === "data" && context.mode === "default" && !delayed) {
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

