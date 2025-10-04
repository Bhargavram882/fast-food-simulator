import React from 'react';
import { Package } from 'lucide-react';

const ServerSection = ({ currentServing, serviceQueue, servingLine }) => {
  return (
    <div className="lg:col-span-2 bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-green-400/20 transition-all hover:border-green-400/40">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Server & Pickup Counter</h2>
          <p className="text-green-300 text-sm">Step 3: Order Delivery</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-950/30 rounded-2xl p-6 border border-green-400/20">
          <p className="text-green-300 text-sm mb-3 font-medium">📢 Server Calling</p>
          {currentServing ? (
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg animate-pulse">
              <p className="text-4xl font-black text-white">#{currentServing}</p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-green-400/50">Waiting</p>
          )}
        </div>

        <div className="bg-green-950/30 rounded-2xl p-6 border border-green-400/20">
          <div className="flex items-center justify-between mb-3">
            <p className="text-green-300 text-sm font-medium">✅ Ready to Serve</p>
            <span className="px-3 py-1 bg-green-500/30 rounded-full text-green-200 font-bold text-sm">
              {serviceQueue.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 min-h-16">
            {serviceQueue.length > 0 ? (
              serviceQueue.map((ticket) => (
                <div 
                  key={ticket.order.orderNumber} 
                  className="px-3 py-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg text-white font-bold text-sm shadow-lg"
                >
                  #{ticket.order.orderNumber}
                </div>
              ))
            ) : (
              <p className="text-green-400/50 text-xs w-full text-center py-4">No orders ready</p>
            )}
          </div>
        </div>

        <div className="bg-green-950/30 rounded-2xl p-6 border border-green-400/20">
          <p className="text-green-300 text-sm mb-3 font-medium">⏳ Serving Line</p>
          <div className="text-center">
            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              {servingLine.length}
            </p>
            <p className="text-green-300 text-sm mt-2">Customers Waiting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerSection;