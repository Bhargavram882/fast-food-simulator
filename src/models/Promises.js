export class CookPromise {
  constructor(orderNumber) {
    this.orderNumber = orderNumber;
    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  
  complete() {
    this.resolve(this.orderNumber);
  }
}

export class CustomerPromise {
  constructor(orderNumber) {
    this.orderNumber = orderNumber;
    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  
  complete() {
    this.resolve(this.orderNumber);
  }
}