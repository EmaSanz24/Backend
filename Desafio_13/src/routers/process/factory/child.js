let qtty = 0;
process.on("message", (msg) => {
  if (msg == "default") {
    qtty = 10e7;
  } else {
    qtty = msg;
  }
  let qttyOfNumbers = {};
  let numbers = [];
  for (let i = 0; i < qtty; i++) {
    const numb = Math.floor(Math.random() * 1000) + 1;
    numbers.push(numb);
  }

  let countFunc = (keys) => {
    qttyOfNumbers[keys] = ++qttyOfNumbers[keys] || 1;
  };

  numbers.forEach(countFunc);

  process.send(qttyOfNumbers);
});

// const random = (qtty) => {

//   return qttyOfNumbers;
// };
