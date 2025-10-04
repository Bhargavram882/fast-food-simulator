import React from 'react';
import { Users, ClipboardList } from 'lucide-react';

const OrderLineSection = ({ orderLine, currentOrderTaking }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-blue-400/20 transition-all hover:border-blue-400/40">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Order Line</h2>
          <p className="text-blue-300 text-sm">Step 1: Customer Arrival</p>
        </div>
      </div>
      
      <div className="bg-blue-950/30 rounded-2xl p-6 mb-4 border border-blue-400/20">
        <div className="text-center mb-4">
          <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            {orderLine.length}
          </p>
          <p className="text-blue-300 mt-2 font-medium">Waiting to Order</p>
        </div>
        <div className="flex justify-center gap-2 flex-wrap min-h-16">
          {orderLine.slice(0, 12).map((_, i) => (
            <div 
              key={i} 
              className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-pulse"
              style={{animationDelay: `${i * 0.1}s`}}
            >
              {i + 1}
            </div>
          ))}
          {orderLine.length > 12 && (
            <div className="text-blue-400 text-sm flex items-center">+{orderLine.length - 12}</div>
          )}
        </div>
      </div>

      <div className="bg-purple-950/30 rounded-2xl p-6 border border-purple-400/20">
        <div className="flex items-center gap-3 mb-4">
          <ClipboardList className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Order Taker</h3>
        </div>
        <div className="text-center">
          <p className="text-purple-300 text-sm mb-2">Currently Processing</p>
          {currentOrderTaking ? (
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <p className="text-3xl font-black text-white">#{currentOrderTaking}</p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-purple-400/50">Idle</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderLineSection;