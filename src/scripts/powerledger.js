// const CoinGecko = require('coingecko-api');
// import Chart from 'chart.js/auto';

// class MainChart {
//   constructor(el) {
//     this.el = el;
//     // this.el.innerHTML = "<h1>POWR</h1>"
//     this.el.innerText = "POWR";
//     this.el.addEventListener('click', this.getData.bind(this))
//   }

//   handleClick() {
//     // this.el.children[0].innerText = "Ouch!"
//   }

//   getData() {
//     const CoinGeckoClient = new CoinGecko();
//     const func = async() => {
//       let data = await CoinGeckoClient.coins.all();
//       return data;
//     };
//     func().then(data => {
//       let dataKey = data.data;
//       console.log(dataKey);
//       let mainChart = document.createElement("canvas")
//       for (let key in dataKey) {
//         const coinObj = dataKey[key];
//         let id = coinObj.id;
//         let symbol = coinObj.symbol;
//         let name = coinObj.name;
//         let li = document.createElement("li");
//         li.innerText = `name: ${name}, symbol: ${symbol}`
//         ul.append(li);
//         // console.log(key);
//       }
//       this.el.append(mainChart)
//     });
//   }


// };

// export default PowerLedger;
