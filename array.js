//level 1
array1 = [1, 2, 3, 4];
array1 = array1.map((num) => num * 2);
console.log(array1);
//2
evenNumbers = [1, 2, 3, 4, 5, 6];
evenNumbers = evenNumbers.filter((num) => num % 2 === 0);
console.log(evenNumbers);

//3
sum = [10, 20, 30];
sum = sum.reduce((acc, num) => acc + num, 0);
console.log(sum);

//4
greater = [10, 40, 55, 70];
greater = greater.filter((num) => num > 50);
console.log(greater);

//5
check = ["banana", "apple", "mango"];
check = check.some((fruit) => fruit === "apple");
console.log(check);

//level 2
square = [1, 2, 3, 4];
square = square.map((num) => num * num).filter((num) => num % 2 === 0);
console.log(square);

//2
arr2 = [2, "-1", 4, 6];
someNegative = arr2.some((num) => num < 0);
everyPositive = arr2.every((num) => num > 0);
console.log(`some=${someNegative}, every=${everyPositive}`);

//3
flat = [1, [2, 3], [4, [5]]];
flat = flat.flat();
console.log(flat);

//4
asc = [5, 2, 9, 1];
asc.sort((a, b) => b - a);
console.log(asc);

//5
splice = ["apple", "banana", "mango"];
index = splice.indexOf("banana");
splice.splice(index, 1);
console.log(splice);

//level 3
users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
names = users.map((user) => user.name);
console.log(names);

//2
fruits = ["apple", "banana", "apple", "mango", "banana"];

counts = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

console.log(counts);

//3
uniqueArray = [...new Set([1, 2, 2, 3, 4, 4, 5])];
console.log(uniqueArray);

//4
age = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 20 },
  { name: "Eve", age: 30 },
];
age = age.sort((a, b) => a.age - b.age);
console.log(age);

//5
items = [
  { name: "Book", price: 10, inStock: true },
  { name: "Pen", price: 2, inStock: false },
  { name: "Bag", price: 20, inStock: true },
];
total = items.reduce((acc, item) => acc + item.price, 0);
console.log(total);
