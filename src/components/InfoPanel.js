import React from 'react';

const InfoPanel = () => {
  return (
    <div className="mt-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <div className="w-1.5 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
        Two-Promise Architecture
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-orange-500/10 rounded-2xl p-5 border border-orange-400/30">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <h4 className="font-bold text-orange-300">CookPromise</h4>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Server awaits this Promise while the Cook prepares the order. Resolved when order moves to service queue.
          </p>
        </div>
        <div className="bg-green-500/10 rounded-2xl p-5 border border-green-400/30">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h4 className="font-bold text-green-300">CustomerPromise</h4>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Customer awaits this Promise in serving line. Resolved when Server calls their order number for pickup.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;