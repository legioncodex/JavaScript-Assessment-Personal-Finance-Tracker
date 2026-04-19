const orderData = [
  { id: 1, userId: 10, items: [{ name: "Book", price: 10, quantity: 2 }] },
  { id: 2, userId: 11, items: [{ name: "Laptop", price: 1000, quantity: 1 }] },
  { id: 3, userId: 10, items: [{ name: "Pen", price: 2, quantity: 1 }] },
];

const userData = [
  { id: 10, name: "Eyo", email: "eyo@example.com" },
  { id: 11, name: "jane", email: "jane@example.com" },
];

//threshold
const MIN_TOTAL = 15;

let userCache = null;

async function fetchUsers() {
  if (userCache) return userCache;
  userCache = userData;
  return userCache;
}

async function fetchOrders() {
  return orderData;
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function buildUserMap(users) {
  return users.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});
}

async function processOrders() {
  const [orders, users] = await Promise.all([fetchOrders(), fetchUsers()]);
  const userMap = buildUserMap(users);

  return orders
    .map((order) => ({
      orderId: order.id,
      userName: userMap[order.userId]?.name ?? "unknown",
      total: calculateTotal(order.items),
    }))
    .filter((order) => order.total >= MIN_TOTAL)
    .sort((a, b) => b.total - a.total);
}

module.exports = { processOrders, calculateTotal, buildUserMap };

processOrders().then((result) => console.log(result));
