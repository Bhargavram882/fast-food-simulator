import React, { useState } from 'react';
import { Play, Square } from 'lucide-react';
import { validateInputs } from '../utils/validation';

const ControlPanel = ({ isRunning, onStart, onStop }) => {
  const [customerInterval, setCustomerInterval] = useState('2000');
  const [cookInterval, setCookInterval] = useState('3000');
  const [orderTakerTime, setOrderTakerTime] = useState('1500');
  const [serverTime, setServerTime] = useState('1000');
  const [simDuration, setSimDuration] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    const validationError = validateInputs(
      customerInterval,
      cookInterval,
      orderTakerTime,
      serverTime,
      simDuration
    );
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError('');
    onStart(
      parseInt(customerInterval),
      parseInt(cookInterval),
      parseInt(orderTakerTime),
      parseInt(serverTime),
      simDuration ? parseInt(simDuration) : null
    );
  };

  const fields = [
    { label: 'Customer Arrival', value: customerInterval, setter: setCustomerInterval, placeholder: '2000', required: true },
    { label: 'Cook Time', value: cookInterval, setter: setCookInterval, placeholder: '3000', required: true },
    { label: 'Order Taker Time', value: orderTakerTime, setter: setOrderTakerTime, placeholder: '1500', required: false },
    { label: 'Server Time', value: serverTime, setter: setServerTime, placeholder: '1000', required: false },
    { label: 'Sim Duration', value: simDuration, setter: setSimDuration, placeholder: 'Optional', required: false }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 mb-6 border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
        Configuration
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {fields.map((field, idx) => (
          <div key={idx}>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {field.label} (ms) {field.required && <span className="text-orange-400">*</span>}
            </label>
            <input
              type="number"
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              disabled={isRunning}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 transition-all"
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
      
      {error && (
        <div className="bg-red-500/20 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl backdrop-blur-sm">
          <p className="text-red-300 font-medium">{error}</p>
        </div>
      )}
      
      <div className="flex gap-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-green-500/50 font-bold text-lg"
        >
          <Play className="w-6 h-6" />
          Start Simulation
        </button>
        
        <button
          onClick={onStop}
          disabled={!isRunning}
          className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-red-500/50 font-bold text-lg"
        >
          <Square className="w-6 h-6" />
          Stop Simulation
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;