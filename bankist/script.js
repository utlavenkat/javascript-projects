'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Venkat Utla',
  transactions: [
                  {amount: 200 , date: '2019-11-18T21:31:17.178Z'},
                  {amount: 450 , date: '2019-12-23T07:42:02.383Z'},
                  {amount: -400 , date: '2020-01-28T09:15:04.904Z'},
                  {amount: 3000 , date: '2020-04-01T10:17:24.185Z'},
                  {amount: -650 , date: '2020-05-08T14:11:59.604Z'},
                  {amount: -130 , date: '2020-05-27T17:01:17.194Z'},
                  {amount: 70 , date: '2020-07-11T23:36:17.929Z'},
                  {amount: 1300 , date: '2020-07-12T10:51:36.790Z'},
                ],
  interestRate: 1.2, // %
  pin: 1111
};

const account2 = {
  owner: 'Lakshmi Utla',
  transactions: [
                  {amount: 5000 , date: '2019-11-01T13:15:33.035Z'},
                  {amount: 3400 , date: '2019-11-30T09:48:16.867Z'},
                  {amount: -150 , date: '2019-12-25T06:04:23.907Z'},
                  {amount: -790 , date: '2020-01-25T14:18:46.235Z'},
                  {amount: -3210 , date: '2020-02-05T16:33:06.386Z'},
                  {amount: -1000 , date: '2020-04-10T14:43:26.374Z'},
                  {amount: 8500 , date: '2020-06-25T18:49:59.371Z'},
                  {amount: -30 , date: '2020-07-26T12:01:20.894Z'},
                ],
  interestRate: 1.5,
  pin: 2222
};

const account3 = {
  owner: 'Hanshitha Utla',
  transactions: [
                  {amount: 200 , date: '2026-11-18T21:31:17.178Z'},
                  {amount: -200 , date: '2026-12-23T07:42:02.383Z'},
                  {amount: 340 , date: '2026-01-28T09:15:04.904Z'},
                  {amount: -300 , date: '2026-04-01T10:17:24.185Z'},
                  {amount: -20 , date: '2026-05-08T14:11:59.604Z'},
                  {amount: 50 , date: '2026-05-27T17:01:17.194Z'},
                  {amount: 400 , date: '2026-07-11T23:36:17.929Z'},
                  {amount: -460 , date: '2026-07-12T10:51:36.790Z'},
                ],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Karthikeya Utla',
  transactions: [
                  {amount: 430 , date: '2024-11-18T21:31:17.178Z'},
                  {amount: 1000 , date: '2025-01-28T09:15:04.904Z'},
                  {amount: 700 , date: '2024-12-23T07:42:02.383Z'},
                  {amount: 50 , date: '2025-04-01T10:17:24.185Z'},
                  {amount: 90 , date: '2025-05-08T14:11:59.604Z'},
                ],
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const now = new Date();
const hour = `${now.getHours()}`.padStart(2,0);
const minutes = `${now.getMinutes()}`.padStart(2,0);

const formattedDate = function(date,locale = 'en-IN') {
  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  };

  return Intl.DateTimeFormat(locale,options).format(new Date(date));
}

const printableDate = function(date) {
  const inputDate = new Date(date);
  const daysPassed = Math.abs(Math.round((new Date() - inputDate)/(24*60*60*1000)));
  if(daysPassed === 0) return 'Today';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <=7)  return `${daysPassed} days ago`;
  return `${formattedDate(inputDate)}`;
}

labelDate.textContent = `${formattedDate(now)}, ${hour}:${minutes}`;

const displayCurrency = function(amount,locale = 'en-IN') {
  const options = {
    style: 'currency',
    currency: 'INR'
  }
  return Intl.NumberFormat(locale,options).format(amount);
}

const startLogoutTimer = function() {
  
  let time = 300;

  const timer = setInterval(() => {
    time--;
    const minutes = String(Math.trunc(time / 60)).padStart(2,0);
    const seconds = String(Math.trunc(time % 60)).padStart(2,0);
    labelTimer.textContent = `${minutes} : ${seconds}`;
    if(time === 0) {
      clearInterval(timer);
      containerApp.style.opacity =0;
      labelWelcome.textContent = `Login to get started`;
    }
  },1000)

  return timer;
}

const createUserName = function(accounts) {
  accounts.forEach((account) => {
      account.userName = account.owner
      .toLowerCase()
      .split(' ')
      .map(nameword => nameword.charAt(0))
      .join('');
    });
    
}
createUserName(accounts);

const displayTransactions = function (account) {
  containerMovements.innerHTML ='';
  
  account.transactions.forEach((transaction,index) => {
    const transactionType = transaction.amount > 0 ? 'deposit':'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${transactionType}">${index+1} ${transactionType}</div>
          <div class="movements__date">${printableDate(transaction.date)}</div>
          <div class="movements__value">${displayCurrency(transaction.amount)}</div>
      </div>`;
       
    containerMovements.insertAdjacentHTML('afterbegin',html);
  });
}

const displaySummary = function(account) {
  const depositAmount = account.transactions
                          .filter( transaction => transaction.amount > 0)
                          .reduce((total,transaction) => total + transaction.amount , 0);

  const withdrawalAmount = account.transactions
                        .filter( transaction => transaction.amount < 0)
                        .reduce((total,transaction) => total + (transaction.amount ?? 0),0);
  const interestAmount = account.transactions
                          .filter(transaction => transaction.amount > 0)
                          .map(deposit => (deposit.amount * account.interestRate) / 100 )
                          .reduce((total, interest) => total + interest) 
  const balance = account.transactions.reduce((balance,transaction) => balance+= transaction.amount, 0) + interestAmount;
  account.balance = balance;
  labelSumIn.innerHTML = `${displayCurrency(depositAmount)}`;
  labelSumOut.innerHTML = `${displayCurrency(withdrawalAmount)} `;
  labelSumInterest.innerHTML = `${displayCurrency(interestAmount)}`;
  labelBalance.innerHTML = `${displayCurrency(balance)}`;
}

let loginAccount, timer;

btnLogin.addEventListener('click', function(e) {
  //Prevent form being submitted automatically.
  e.preventDefault();

  const userName =inputLoginUsername.value;
  const pin = inputLoginPin.value;
   
  loginAccount = accounts.find(account => account?.userName === userName && account?.pin === Number(pin))
  if(loginAccount) {
    inputLoginUsername.value = inputLoginPin.value = '';
    if(timer) {
      clearInterval(timer);
    }
    timer = startLogoutTimer();
    //Display UI and message
    labelWelcome.innerHTML = `Welcome ${loginAccount.owner}`;
    containerApp.style.opacity =100;
    //Display Transactions
    displayTransactions(loginAccount);
    //Display Summary
    displaySummary(loginAccount);
  } else {
      labelWelcome.innerHTML = `Login failed. Please try again`;
      containerApp.style.opacity =0;
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const toAccount = accounts.find(account => account.userName === inputTransferTo.value);
  const transferAmount = inputTransferAmount.value;
  if( toAccount
    && transferAmount > 0 
    && loginAccount.balance >= transferAmount
    && toAccount.userName !== loginAccount.userName) {
      loginAccount.transactions.push({amount: Number(-transferAmount), date: new Date().toISOString()})
      toAccount.transactions.push({amount:Number(transferAmount), date:new Date().toISOString()});
      displayTransactions(loginAccount);
      displaySummary(loginAccount);
      inputTransferTo.value = inputTransferAmount.value ='';

      clearInterval(timer);
      timer = startLogoutTimer();
  }
  });

  btnClose.addEventListener('click', function(e) {
    e.preventDefault();
    const closeUserName = inputCloseUsername.value;
    const closePin = inputClosePin.value;
    console.log(closeUserName, closePin);
    if (loginAccount.userName === closeUserName && loginAccount.pin === Number(closePin)) {
          const index = accounts.findIndex(account => 
                                      account.userName === loginAccount.userName 
                                      && account.pin === loginAccount.pin
                                    );
          accounts.splice(index,1);
          containerApp.style.opacity =0;
          labelWelcome.innerHTML = `Log in to get started`;

    }
  });

  btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    const loanAmount = Number(inputLoanAmount.value);
    if(loanAmount > 0 && 
      loginAccount.transactions.some(transaction => 
              transaction.amount > 0 
              && transaction.amount >= loanAmount * 0.1)
             ) {
              loginAccount.transactions.push({amount:loanAmount, date: new Date().toISOString()});
              displayTransactions(loginAccount);
              displaySummary(loginAccount);
              inputLoanAmount.value ='';
              clearInterval(timer);
              timer = startLogoutTimer();
             }
  });

  let sort = false;
  btnSort.addEventListener('click', function(e) {
    e.preventDefault();
    sort = !sort
    const sortedTransactions = sort ? loginAccount.transactions.slice().sort((transaction1,transaction2) => transaction1.amount-transaction2.amount) 
                                  :  loginAccount.transactions.slice().sort((transaction1,transaction2) =>  transaction2.amount-transaction1.amount);
    loginAccount.transactions = sortedTransactions;
    displayTransactions(loginAccount)
  })
