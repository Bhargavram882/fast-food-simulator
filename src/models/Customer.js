class Customer {
  constructor(order, customerPromise) {
    this.order = order;
    this.customerPromise = customerPromise;
    this.inServingLine = false;
  }
  
  moveToServingLine() {
    this.inServingLine = true;
  }
  
  waitForOrder() {
    return this.customerPromise.promise;
  }
}

export default Customer;