import React from 'react';
import { Clock, Bell, Users, TrendingUp } from 'lucide-react';
import { formatTime } from '../utils/validation';

const StatsBoard = ({ isRunning, elapsedTime, completedOrders, totalOrders }) => {
  const efficiency = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

  if (!isRunning) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-4 border border-blue-400/30">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <span className="text-blue-300 text-sm font-medium">Time Elapsed</span>
        </div>
        <p className="text-3xl font-bold text-white">{formatTime(elapsedTime)}</p>
      </div>
      <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-2xl p-4 border border-green-400/30">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="w-5 h-5 text-green-400" />
          <span className="text-green-300 text-sm font-medium">Completed</span>
        </div>
        <p className="text-3xl font-bold text-white">{completedOrders}</p>
      </div>
      <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-4 border border-purple-400/30">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-purple-400" />
          <span className="text-purple-300 text-sm font-medium">Total Orders</span>
        </div>
        <p className="text-3xl font-bold text-white">{totalOrders}</p>
      </div>
      <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-4 border border-orange-400/30">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          <span className="text-orange-300 text-sm font-medium">Efficiency</span>
        </div>
        <p className="text-3xl font-bold text-white">{efficiency}%</p>
      </div>
    </div>
  );
};

export default StatsBoard;