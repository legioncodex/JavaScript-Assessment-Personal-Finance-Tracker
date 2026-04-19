const { processOrders, calculateTotal, buildUserMap } = require("./processor");

let pass = 0,
  fail = 0;

function test(name, fn) {
  try {
    fn();
    console.log(name);
    pass++;
  } catch (error) {
    console.log(`${name}: ${error.message}`);
    fail++;
  }
}

test("calculate total", () => {
  const total = calculateTotal([{ price: 10, quantity: 2 }]);
  if (total !== 20) throw new Error(`Expected 20, got ${total}`);
});

test("build user map", () => {
  const map = buildUserMap([{ id: 10, name: "Eyo" }]);
  if (map[10].name !== "Eyo") throw new Error("Wrong name");
});

processOrders().then((result) => {
  test("filter order", () => {
    if (result.find((o) => o.orderId === 3))
      throw new Error("should filter order less than 15");
  });

  test("sort descending", () => {
    if (result[0].total < result[1].total) throw new Error("Not sorted");
  });

  console.log(`Passed: ${pass}, Failed: ${fail}`);
});
