import React, { useState } from 'react';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: '', mobile: '', amount: '', purpose: '', language: ''
  });
  const [error, setError] = useState('');
  const [successId, setSuccessId] = useState('');
  const [loading, setLoading] = useState(false);

  const languages = ['Hindi', 'Tamil', 'Telugu', 'Marathi', 'English'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Form Validations
    if (!formData.name || !formData.mobile || !formData.amount || !formData.purpose || !formData.language) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.mobile.length !== 10 || isNaN(formData.mobile)) {
      setError('Mobile number must be a valid 10-digit number.');
      return;
    }
    if (Number(formData.amount) <= 0) {
      setError('Loan amount must be greater than 0.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://loan-application-qwqs.onrender.com/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount)
        })
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to submit application.');
      }

      setSuccessId(resData.id); // Save the database ID as confirmation reference [cite: 92, 130]
      setFormData({ name: '', mobile: '', amount: '', purpose: '', language: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (successId) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-zinc-950 border border-zinc-800 rounded-lg text-center">
        <h2 className="text-xl font-bold text-green-400 mb-2">Submission Successful!</h2>
        <p className="text-zinc-400 text-sm mb-4">Your application has been received safely.</p>
        <div className="bg-zinc-900 p-3 rounded text-sm font-mono text-white mb-6 border border-zinc-800">
          <p className="text-xs text-zinc-500 mb-1">REFERENCE NUMBER:</p>
          {successId}
        </div>
        <button
          onClick={() => setSuccessId('')}
          className="w-full bg-white text-black text-sm font-bold py-2 px-4 rounded hover:bg-zinc-200"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-zinc-950 border border-zinc-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-6 text-center">New Loan Application</h2>
      
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-900/40 border border-red-800 text-red-400 p-3 rounded text-xs">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Applicant Name *</label>
          <input
            type="text" name="name" value={formData.name} onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Mobile Number *</label>
          <input
            type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} maxLength={10}
            placeholder="9876543210"
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Loan Amount (₹) *</label>
          <input
            type="number" name="amount" value={formData.amount} onChange={handleInputChange}
            placeholder="50000"
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Purpose of Loan *</label>
          <textarea
            name="purpose" value={formData.purpose} onChange={handleInputChange} rows={3}
            placeholder="Home improvement, business expansion, etc."
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:outline-none focus:border-zinc-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Preferred Language *</label>
          <select
            name="language" value={formData.language} onChange={handleInputChange}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:outline-none focus:border-zinc-500"
          >
            <option value="">-- Choose Language --</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-white text-black font-bold py-2.5 rounded text-sm hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}