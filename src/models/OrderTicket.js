class OrderTicket {
  constructor(order, cookPromise, customerPromise) {
    this.order = order;
    this.cookPromise = cookPromise;
    this.customerPromise = customerPromise;
  }
}

export default OrderTicket;