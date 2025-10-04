import { useState, useRef } from 'react';
import Order from '../models/Order';
import Customer from '../models/Customer';
import OrderTicket from '../models/OrderTicket';
import { CookPromise, CustomerPromise } from '../models/Promises';

export const useSimulation = () => {
  const [orderLine, setOrderLine] = useState([]);
  const [currentOrderTaking, setCurrentOrderTaking] = useState(null);
  const [kitchenQueue, setKitchenQueue] = useState([]);
  const [currentCooking, setCurrentCooking] = useState(null);
  const [serviceQueue, setServiceQueue] = useState([]);
  const [currentServing, setCurrentServing] = useState(null);
  const [servingLine, setServingLine] = useState([]);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const stateRef = useRef({
    orderLine: [],
    kitchenQueue: [],
    serviceQueue: [],
    servingLine: []
  });
  
  const intervalsRef = useRef({
    customerArrival: null,
    orderTaker: null,
    cook: null,
    server: null,
    simEnd: null,
    timer: null
  });

  const startOrderTakerProcess = (orderInt, cookInt, servInt) => {
    intervalsRef.current.orderTaker = setInterval(() => {
      if (stateRef.current.orderLine.length > 0) {
        if (!currentOrderTaking) {
          stateRef.current.orderLine.shift();
          const order = new Order();
          setCurrentOrderTaking(order.orderNumber);
          setOrderLine([...stateRef.current.orderLine]);
          
          setTimeout(() => {
            const cookPromise = new CookPromise(order.orderNumber);
            const customerPromise = new CustomerPromise(order.orderNumber);
            const ticket = new OrderTicket(order, cookPromise, customerPromise);
            const customer = new Customer(order, customerPromise);
            
            stateRef.current.kitchenQueue.push(ticket);
            setKitchenQueue([...stateRef.current.kitchenQueue]);
            
            customer.moveToServingLine();
            stateRef.current.servingLine.push(customer);
            setServingLine([...stateRef.current.servingLine]);
            
            customer.waitForOrder().then(() => {
              const index = stateRef.current.servingLine.findIndex(
                c => c.order.orderNumber === order.orderNumber
              );
              if (index !== -1) {
                stateRef.current.servingLine.splice(index, 1);
                setServingLine([...stateRef.current.servingLine]);
                setCompletedOrders(prev => prev + 1);
              }
            });
            
            setCurrentOrderTaking(null);
            
            if (!intervalsRef.current.cook) {
              startCookProcess(cookInt, servInt);
            }
          }, orderInt);
        }
      }
    }, 100);
  };

  const startCookProcess = (cookInt, servInt) => {
    intervalsRef.current.cook = setInterval(() => {
      if (!currentCooking && stateRef.current.kitchenQueue.length > 0) {
        const ticket = stateRef.current.kitchenQueue.shift();
        setKitchenQueue([...stateRef.current.kitchenQueue]);
        setCurrentCooking(ticket.order.orderNumber);
        
        setTimeout(() => {
          ticket.cookPromise.complete();
          stateRef.current.serviceQueue.push(ticket);
          setServiceQueue([...stateRef.current.serviceQueue]);
          setCurrentCooking(null);
          
          if (!intervalsRef.current.server) {
            startServerProcess(servInt);
          }
        }, cookInt);
      }
    }, 100);
  };

  const startServerProcess = (servInt) => {
    intervalsRef.current.server = setInterval(() => {
      if (!currentServing && stateRef.current.serviceQueue.length > 0) {
        const ticket = stateRef.current.serviceQueue.shift();
        setServiceQueue([...stateRef.current.serviceQueue]);
        setCurrentServing(ticket.order.orderNumber);
        
        setTimeout(() => {
          ticket.customerPromise.complete();
          setCurrentServing(null);
        }, servInt);
      }
    }, 100);
  };

  const startSimulation = (custInt, cookInt, orderInt, servInt, simDur) => {
    setIsRunning(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    Order.reset();
    setCompletedOrders(0);
    setTotalOrders(0);
    
    intervalsRef.current.customerArrival = setInterval(() => {
      stateRef.current.orderLine.push(Date.now());
      setOrderLine([...stateRef.current.orderLine]);
      setTotalOrders(prev => prev + 1);
      
      if (!intervalsRef.current.orderTaker) {
        startOrderTakerProcess(orderInt, cookInt, servInt);
      }
    }, custInt);
    
    if (simDur) {
      intervalsRef.current.simEnd = setTimeout(() => {
        stopSimulation();
      }, simDur);
    }

    intervalsRef.current.timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
  };

  const stopSimulation = () => {
    Object.values(intervalsRef.current).forEach(interval => {
      if (interval) {
        clearInterval(interval);
        clearTimeout(interval);
      }
    });
    intervalsRef.current = {
      customerArrival: null,
      orderTaker: null,
      cook: null,
      server: null,
      simEnd: null,
      timer: null
    };
    stateRef.current = {
      orderLine: [],
      kitchenQueue: [],
      serviceQueue: [],
      servingLine: []
    };
    setIsRunning(false);
  };

  return {
    orderLine,
    currentOrderTaking,
    kitchenQueue,
    currentCooking,
    serviceQueue,
    currentServing,
    servingLine,
    completedOrders,
    totalOrders,
    isRunning,
    elapsedTime,
    startSimulation,
    stopSimulation
  };
};