// Define OrderStatus as a plain object
const OrderStatus = Object.freeze({
  NEW: 'NEW',
  PAYED: 'PAYED',
  SHIPPED: 'SHIPPED',
  CANCELED: 'CANCELED',
  REFUNDED: 'REFUNDED',
});

// Export the OrderStatus object
module.exports = OrderStatus;
