export default () => ({
  orderServiceUrl:
    process.env.ORDER_SERVICE_URL ??
    'http://localhost:3001',

  inventoryServiceUrl:
    process.env.INVENTORY_SERVICE_URL ??
    'http://localhost:3002',

  paymentServiceUrl:
    process.env.PAYMENT_SERVICE_URL ??
    'http://localhost:3003',
});