import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddWebsite() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Website:', url, 'Email:', email);
    fetch("http://localhost:8080/api/add-website", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
        email: email
      })})
  };

  return (
    <div className="min-h-screen bg-(--alice-blue) flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-[#70BAFF]/20 p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-2 text-center">
          Add Your Website
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Note that you can monitor only 1 website per email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email for Alerts
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-(--cool-sky) text-white px-8 py-4 rounded-lg hover:bg-(--azure-blue) transition-all shadow-lg shadow-[#70BAFF]/30 hover:shadow-xl hover:shadow-[#70BAFF]/40 font-medium cursor-pointer hover:scale-105"
          >
            Start Monitoring
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full text-gray-600 hover:text-gray-800 transition-colors text-sm cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default AddWebsite;
