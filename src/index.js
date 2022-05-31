import Example from "./scripts/example";
import myChart from "./scripts/nft_chart";

document.addEventListener("DOMContentLoaded", () => {
  console.log('Hello World');
  const main = document.getElementById("main")
  new Example(main)
  const ctx = document.getElementById('myChart').getContext('2d');
});
