import React from 'react';

export default function DashboardStats({ summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
        <p className="text-xs text-zinc-500 uppercase font-semibold">Total Apps</p>
        <p className="text-xl font-bold text-white mt-1">{summary.totalApplications || 0}</p>
      </div>
      <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
        <p className="text-xs text-zinc-500 uppercase font-semibold">Total Amount</p>
        <p className="text-xl font-bold text-white mt-1">₹{(summary.totalAmountRequested || 0).toLocaleString('en-IN')}</p>
      </div>
      <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg border-l-2 border-l-emerald-600">
        <p className="text-xs text-zinc-500 uppercase font-semibold">Approved</p>
        <p className="text-xl font-bold text-emerald-400 mt-1">{summary.countPerStatus?.approved || 0}</p>
      </div>
      <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg border-l-2 border-l-red-600">
        <p className="text-xs text-zinc-500 uppercase font-semibold">Rejected</p>
        <p className="text-xl font-bold text-red-400 mt-1">{summary.countPerStatus?.rejected || 0}</p>
      </div>
    </div>
  );
}