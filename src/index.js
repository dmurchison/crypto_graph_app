import MainChart from './scripts/main_chart';

document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main")
  const chart = new MainChart(main);
  chart.createChart();
});
