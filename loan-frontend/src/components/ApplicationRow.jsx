import React, { useState } from 'react';

export default function ApplicationRow({ app, onStatusUpdate }) {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus) => {
    setLoading(true);
    try {
      const response = await fetch(`https://loan-application-qwqs.onrender.com/api/applications/${app.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        onStatusUpdate(app.id, newStatus); // Instantly re-render dashboard view state locally [cite: 96, 119]
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setLoading(false);
    }
  };

  // Color helper function based on entry status
  const getBadgeColor = (status) => {
    if (status === 'approved') return 'text-emerald-400 bg-emerald-950/40 border-emerald-800';
    if (status === 'rejected') return 'text-red-400 bg-red-950/40 border-red-800';
    return 'text-amber-400 bg-amber-950/40 border-amber-800';
  };

  const formattedDate = new Date(app.created_at).toLocaleDateString('en-IN');

  return (
    <>
      {/* LAPTOP / TABLET ROUTE: Standard Table Row */}
      <tr className="hidden md:table-row border-b border-zinc-900 hover:bg-zinc-950 text-sm">
        <td className="p-4 font-medium text-white">{app.name}</td>
        <td className="p-4 text-zinc-300">₹{app.amount.toLocaleString('en-IN')}</td>
        <td className="p-4 text-zinc-400 max-w-xs truncate">{app.purpose}</td>
        <td className="p-4 text-zinc-400">{app.language}</td>
        <td className="p-4">
          <span className={`px-2 py-0.5 text-xs rounded border capitalize ${getBadgeColor(app.status)}`}>
            {app.status}
          </span>
        </td>
        <td className="p-4 text-zinc-500">{formattedDate}</td>
        <td className="p-4 text-right">
          {app.status === 'pending' && (
            <div className="flex justify-end gap-2">
              <button
                disabled={loading} onClick={() => updateStatus('approved')}
                className="bg-emerald-600 text-white text-xs px-2 py-1 rounded hover:bg-emerald-700 disabled:opacity-40"
              >
                Approve
              </button>
              <button
                disabled={loading} onClick={() => updateStatus('rejected')}
                className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 disabled:opacity-40"
              >
                Reject
              </button>
            </div>
          )}
        </td>
      </tr>

      {/* MOBILE DEVICE ROUTE: Clean Stack Card View */}
      <div className="block md:hidden bg-zinc-950 border border-zinc-800 p-4 rounded-lg space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-white font-bold">{app.name}</h4>
            <p className="text-xs text-zinc-500">Phone: {app.mobile}</p>
          </div>
          <span className={`px-2 py-0.5 text-xs rounded border capitalize ${getBadgeColor(app.status)}`}>
            {app.status}
          </span>
        </div>
        
        <div className="text-xs text-zinc-400 space-y-1 bg-zinc-900/50 p-2 rounded">
          <p><span className="text-zinc-500">Amount:</span> ₹{app.amount.toLocaleString('en-IN')}</p>
          <p><span className="text-zinc-500">Language:</span> {app.language}</p>
          <p><span className="text-zinc-500">Date:</span> {formattedDate}</p>
          <p className="pt-1 text-zinc-300"><span className="text-zinc-500">Purpose:</span> {app.purpose}</p>
        </div>

        {app.status === 'pending' && (
          <div className="flex gap-2 pt-1">
            <button
              disabled={loading} onClick={() => updateStatus('approved')}
              className="flex-1 bg-emerald-600 text-white text-xs font-semibold py-1.5 rounded text-center"
            >
              Approve
            </button>
            <button
              disabled={loading} onClick={() => updateStatus('rejected')}
              className="flex-1 bg-red-600 text-white text-xs font-semibold py-1.5 rounded text-center"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </>
  );
}