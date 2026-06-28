const juliaDogs =[1,3,5,6,7];
const kateDogs = [7,4,3,1,2];

const checkDogs = function(juliaDogs, kateDogs) {
    const juliaShallow = juliaDogs.slice(0);

    console.log(juliaShallow);
    juliaShallow.splice(juliaShallow.length-2,2);
    juliaShallow.splice(0,1);

    const allDogs = kateDogs.concat(juliaShallow);
    console.log((allDogs));
    allDogs.forEach((age, indiex) => age >= 3? console.log(`Dog number ${indiex+1} is an adult, and is ${age} years old.`): console.log(`Dog number ${indiex+1} is still a puppy🐶`));
}

checkDogs(juliaDogs,kateDogs)


// Calculate Dog age in human years
const humanYears = (dogsArr) => dogsArr.map( dogAge => dogAge <=2? 2 * dogAge : 16 + dogAge *4 )

const dogsArr1 = [5,2,4,1,15,8,3];
const dogsArr2 = [16,6,10,5,6,1,4];

const humanYears1 = humanYears(dogsArr1);
const humanYears2 = humanYears(dogsArr2);
console.log('Dogs Age:', dogsArr1)
console.log('Human Years',humanYears1);
console.log('Dogs Age:', dogsArr2)
console.log('Human Years',humanYears(humanYears2));

const allDogsHumanYears = humanYears1.concat(humanYears2);
console.log('All Dogs Human Years', allDogsHumanYears);
const adultDogs = allDogsHumanYears.filter(humanYears => humanYears > 18);
console.log('Filtered dogs', adultDogs);
const avgAgeOfAdultDogs = Math.round(adultDogs.reduce((totalAge,currentAge) => totalAge+= currentAge) / adultDogs.length);
console.log('Average Age of Adult Dogs', avgAgeOfAdultDogs);


const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// Coding Challenge #4


//This time, Julia and Kate are studying the activity levels of different dog breeds.

//YOUR TASKS:
//1. Store the the average weight of a "Husky" in a variable "huskyWeight"
const huskyWeight = breeds.filter(breed => breed.breed === 'Husky')?.[0]?.averageWeight;
console.log(`Husky Weight ${huskyWeight}`);

//2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
 const dogBothActivities = breeds.filter(breed => breed.activities.includes('running') && breed.activities.includes('fetch'))?.[0]?.breed;
 console.log(`dog(s) like both running and fetch ${dogBothActivities}`);
 
//3. Create an array "allActivities" of all the activities of all the dog breeds
const allActivities = new Array(breeds.map((breed =>breed.activities)).flat(1));
console.log(allActivities);

//4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
const uniqueActivities = new Set(breeds.map((breed =>breed.activities)).flat(1));
console.log(uniqueActivities);
//5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
const swimmingAdjacent = new Set(breeds.filter(breed => breed.activities.includes('swimming')).map(breed => breed.activities).flat(1));
swimmingAdjacent.delete('swimming');
console.log(swimmingAdjacent);

//6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
console.log(breeds.every(breed => breed.averageWeight >= 10));
//7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".
console.log(breeds.some(breed => breed.activities.length >=3))
//BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
console.log(Math.max(...breeds.filter(breed => breed.activities.includes('fetch')).map(breed => breed.averageWeight)));


const account1 = {
  owner: 'Venkat Utla',
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Lakshmi Utla',
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Hanshitha Utla',
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Karthikeya Utla',
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// All deposits in bank
const totalDeposit = accounts.flatMap(account => account.transactions).filter(amount => amount > 0).reduce((totalDeposit=0, currentDeposit) => totalDeposit + currentDeposit);
console.log(`Total Deposits: ${totalDeposit}`);

//How many deposits with atleast 1000 dollers
const depositsGreaterThan1000 = accounts.flatMap(account => account.transactions).filter(amount => amount > 1000);
console.log(depositsGreaterThan1000.length);


/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/


const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
dogs.map(dog => dog.recFood = Math.round(dog.weight ** 0.75 * 28));
console.log(dogs);
//2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
const upperLimit = Math.round(sarahDog.recFood + (0.1 * sarahDog.recFood));
const lowerLimit = Math.round(sarahDog.recFood - (0.1 * sarahDog.recFood));
if (sarahDog.curFood > upperLimit) {
  console.log(`Sarah dog is eating too much`);  
} else if(sarahDog.curFood < lowerLimit) {
  console.log(`Sarah dog is eating too little`);
} else {
  console.log(`Sarah dog is eating okay`);
}

//3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
const ownersTooMuch = dogs.filter(dog => dog.curFood > Math.round(dog.recFood + (0.1 * dog.recFood))).flatMap(dog => dog.owners);
const ownersTooLittle = dogs.filter(dog => dog.curFood < Math.round(dog.recFood - (0.1 * dog.recFood))).flatMap(dog => dog.owners);
console.log('Owners Too Much', ...ownersTooMuch);
console.log('Owners Too Little', ...ownersTooLittle);

//4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersTooLittle.join(' and ')}'s dogs eat too little!`);

//5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(dogs.find(dog => dog.curFood === dog.recFood)?.length > 0);

//6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
console.log(dogs.every(dog => dog.curFood >= Math.round(dog.recFood - (0.1 * dog.recFood)) && dog.curFood <= Math.round(dog.recFood + (0.1 * dog.recFood))))

//7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const okayDogs = dogs.filter(dog => dog.curFood >= Math.round(dog.recFood - (0.1 * dog.recFood)) && dog.curFood <= Math.round(dog.recFood + (0.1 * dog.recFood)));
console.log(okayDogs);

//8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.

const result = Object.groupBy(dogs,dog => {
  if (dog.curFood === dog.recFood) {
    return "exact";
  } else if(dog.curFood < dog.recFood - (0.1 * dog.recFood)) {
    return "too-little";
  } else {
    return "too-much";
  }
});

console.log(result);

//9. Group the dogs by the number of owners they have

const byOwners = Object.groupBy(dogs, dog => dog.owners.length);
console.log(byOwners);

//10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

const sortedDogs = dogs.slice().sort((dog1, dog2) => dog1.recFood - dog2.recFood);
console.log('Original Dogs', dogs);
console.log('Sorted dogs', sortedDogs);












