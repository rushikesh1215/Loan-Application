import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ApplyPage from './pages/ApplyPage';
import DashboardPage from './pages/DashboardPage';
import './App.css'

export default function App() {
  const [currentTab, setCurrentTab] = useState('apply');

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-1">
        {currentTab === 'apply' ? <ApplyPage /> : <DashboardPage />}
      </main>
    </div>
  );
}