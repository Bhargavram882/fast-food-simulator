export const validateInputs = (customerInterval, cookInterval, orderTakerTime, serverTime, simDuration) => {
  const custInt = parseInt(customerInterval);
  const cookInt = parseInt(cookInterval);
  const orderInt = parseInt(orderTakerTime);
  const servInt = parseInt(serverTime);
  
  if (isNaN(custInt) || custInt < 500) {
    return 'Customer arrival interval must be a number >= 500ms';
  }
  if (isNaN(cookInt) || cookInt < 500) {
    return 'Cook fulfillment interval must be a number >= 500ms';
  }
  if (isNaN(orderInt) || orderInt < 500) {
    return 'Order taker time must be a number >= 500ms';
  }
  if (isNaN(servInt) || servInt < 500) {
    return 'Server time must be a number >= 500ms';
  }
  if (simDuration && (isNaN(parseInt(simDuration)) || parseInt(simDuration) < 1000)) {
    return 'Simulation duration must be empty or a number >= 1000ms';
  }
  return null;
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};