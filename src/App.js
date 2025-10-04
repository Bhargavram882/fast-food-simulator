import React, { useEffect } from 'react';
import { ChefHat } from 'lucide-react';
import ControlPanel from './components/ControlPanel';
import StatsBoard from './components/StatsBoard';
import OrderLineSection from './components/OrderLineSection';
import KitchenSection from './components/KitchenSection';
import ServerSection from './components/ServerSection';
import InfoPanel from './components/InfoPanel';
import { useSimulation } from './hooks/useSimulation';

const App = () => {
  const {
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
  } = useSimulation();

  useEffect(() => {
    return () => {
      stopSimulation();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
              Fast Food Simulator
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Promise-Based Restaurant Operations in Real-Time</p>
        </div>

        {/* Stats Dashboard */}
        <StatsBoard 
          isRunning={isRunning}
          elapsedTime={elapsedTime}
          completedOrders={completedOrders}
          totalOrders={totalOrders}
        />

        {/* Control Panel */}
        <ControlPanel 
          isRunning={isRunning}
          onStart={startSimulation}
          onStop={stopSimulation}
        />
        
        {/* Process Flow Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrderLineSection 
            orderLine={orderLine}
            currentOrderTaking={currentOrderTaking}
          />

          <KitchenSection 
            currentCooking={currentCooking}
            kitchenQueue={kitchenQueue}
          />

          <ServerSection 
            currentServing={currentServing}
            serviceQueue={serviceQueue}
            servingLine={servingLine}
          />
        </div>

        {/* Info Panel */}
        <InfoPanel />
      </div>
    </div>
  );
};

export default App;