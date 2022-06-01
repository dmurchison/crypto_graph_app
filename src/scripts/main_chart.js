import Chart from 'chart.js/auto';
import CoinGecko from 'coingecko-api';

class MainChart {
  constructor(el) {
    this.el = el;
    this.el.inner
  }
}




// const data = {
//   'Flow': 2.73,
//   'Ape Coin': 6.86,
//   'Axie Infinity': 24.22,
//   'The Sandbox': 1.45,
//   'Decentraland': 1.09
// }
// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//   type:'bar',
//   data:{
//     labels: Object.keys(data),
//     datasets:[{
//       label:'USD',
//       data: Object.values(data),
//     }]
//   },
//   options: {
//     title:{
//       display:true,
//       text:'Most Popular Non-Fungible Tokens (NFT)',
//       fontSize:25
//     },
//     // backgroundColor:['green', 'blue', 'teal', 'purple', 'pink'],
//     // borderWidth:1,
//     // borderColor:'grey',
//     // hoverBorderWidth:2,
//   }
// });

// export default myChart;
