import React, { useState, useEffect } from 'react';
import DashboardStats from '../components/DashboardStats';
import ApplicationRow from '../components/ApplicationRow';

export default function DashboardPage() {
  const [applications, setApplications] = useState([]);
  const [summary, setSummary] = useState({});
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      // Build filter endpoint URL path dynamically
      const appUrl = filter ? `https://loan-application-qwqs.onrender.com/api/applications?status=${filter}` : 'https://loan-application-qwqs.onrender.com/api/applications';
      
      const [appRes, summaryRes] = await Promise.all([
        fetch(appUrl),
        fetch('https://loan-application-qwqs.onrender.com/api/summary')
      ]);

      if (appRes.ok && summaryRes.ok) {
        setApplications(await appRes.json());
        setSummary(await summaryRes.json());
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  // Handle live screen updates without forcing a full page reload [cite: 96, 119]
  const handleLocalStatusChange = (id, newStatus) => {
    setApplications(prevApps => 
      prevApps.map(item => item.id === id ? { ...item, status: newStatus } : item)
    );
    
    // Refresh the statistics values out-of-band
    fetch('https://loan-application-qwqs.onrender.com/api/summary')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Underwriting Overview</h2>
          <p className="text-xs text-zinc-500">Track and review submitted lending queries below.</p>
        </div>
        
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 rounded p-2 focus:outline-none"
          >
            <option value="">Filter Status: All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Analytics Telemetry Component */}
      <DashboardStats summary={summary} />

      {/* Data Layout Context Elements */}
      {loading && applications.length === 0 ? (
        <p className="text-center text-sm text-zinc-500 py-10">Fetching live entry tracks...</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-sm text-zinc-500 py-10 bg-zinc-950 rounded border border-zinc-900">
          No loan applications found matching this status.
        </p>
      ) : (
        <>
          {/* DESKTOP Presentation View */}
          <div className="hidden md:block bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400 font-semibold uppercase">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Purpose</th>
                  <th className="p-4">Language</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {applications.map(app => (
                  <ApplicationRow 
                    key={app.id} 
                    app={app} 
                    onStatusUpdate={handleLocalStatusChange} 
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE Presentation Stack Cards */}
          <div className="block md:hidden space-y-4">
            {applications.map(app => (
              <ApplicationRow 
                key={app.id} 
                app={app} 
                onStatusUpdate={handleLocalStatusChange} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}