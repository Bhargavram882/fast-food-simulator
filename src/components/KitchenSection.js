import React from 'react';
import { ChefHat } from 'lucide-react';

const KitchenSection = ({ currentCooking, kitchenQueue }) => {
  return (
    <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-orange-400/20 transition-all hover:border-orange-400/40">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
          <ChefHat className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Kitchen</h2>
          <p className="text-orange-300 text-sm">Step 2: Order Preparation</p>
        </div>
      </div>
      
      <div className="bg-orange-950/30 rounded-2xl p-6 mb-4 border border-orange-400/20">
        <p className="text-orange-300 text-sm mb-3 font-medium">🔥 Currently Cooking</p>
        {currentCooking ? (
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg animate-pulse">
            <p className="text-4xl font-black text-white">#{currentCooking}</p>
          </div>
        ) : (
          <p className="text-3xl font-bold text-orange-400/50">Idle</p>
        )}
      </div>

      <div className="bg-orange-950/30 rounded-2xl p-6 border border-orange-400/20">
        <div className="flex items-center justify-between mb-3">
          <p className="text-orange-300 text-sm font-medium">📋 Kitchen Queue</p>
          <span className="px-3 py-1 bg-orange-500/30 rounded-full text-orange-200 font-bold text-sm">
            {kitchenQueue.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 min-h-16">
          {kitchenQueue.length > 0 ? (
            kitchenQueue.map((ticket) => (
              <div 
                key={ticket.order.orderNumber} 
                className="px-4 py-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg text-white font-bold shadow-lg hover:scale-105 transition-transform"
              >
                #{ticket.order.orderNumber}
              </div>
            ))
          ) : (
            <p className="text-orange-400/50 text-sm w-full text-center py-4">No orders waiting</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KitchenSection;