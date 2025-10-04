class Order {
  static nextId = 1;
  
  constructor() {
    this.orderNumber = Order.nextId++;
    this.createdAt = Date.now();
  }
  
  static reset() {
    Order.nextId = 1;
  }
}

export default Order;