// Purely Supplemental file to help you understand the types of for loops in js

// 1: Regular for loop:
// Great for math calculations
for (let i = 0; i < 100; i+=2) {
    console.log(i);
}

// 2: For/in loop:
// Great for getting every index of an array, officially speaking, loops through every property of a value
let animals = ["cow", "pig", "turkey"];
for (let i in animals) {
    let animal = animals[i];
    console.log(animal + " at index " + i);
}

// 3: For/of loop:
// The fanciest of loops
// loops through every value in an arrays and objects
for (let animal of animals) {
    console.log(animal);
}