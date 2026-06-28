const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const currenySet = new Set(['USD','EUR','INR','USD']);

const transactions = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

transactions.forEach(function(transaction,index) {
  transaction > 0 ? console.log(`Transaction ${index +1 }: You have deposited ${transaction}`): console.log(`Transaction ${index +1 }: You have withdrawn ${Math.abs(transaction)}`);
})

currencies.forEach((description,currency) => console.log(`${currency}: ${description}`))

currenySet.forEach(currency => console.log(currency))


//Map

//Calculating INR for USD transactions
const usdToINR = 95;
const usdToINRTransactions = transactions.map( transaction => transaction * usdToINR )
console.log(usdToINRTransactions);

// Transaction Descriptions
console.log(transactions.map((transaction,index) => `${index+1}: You have ${transaction >0 ? 'deposited': 'withdrawn'} ${Math.abs(transaction)} INR`));

//Filter only deposits
console.log(transactions);
console.log(transactions.filter(transaction => transaction > 0));

//Find Curren Balance
//Reduce

const currentBalance = transactions.reduce((previous,transaction) => previous + transaction)
console.log(currentBalance);


const now = new Date();
console.log(now);

console.log(new Date(2026,11,25,0,0,1));
console.log(new Date(0));



