import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  RefreshCw,
  Verified,
} from "lucide-react";

interface Website {
  url: string;
  email: string;
  is_running: boolean;
  last_checked: string;
  ping: number;
}

function WebsiteCard({ website }: { website: Website }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-(--cool-sky)">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              website.is_running ? "bg-green-500" : "bg-red-500"
            } animate-pulse`}
          />
          <div>
            <h4 className="font-medium text-gray-800 truncate max-w-50">
              {website.url.replace(/^https?:\/\//, "")}
            </h4>
            <p className="text-xs text-gray-400">{website.email}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            {website.is_running ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                website.is_running ? "text-green-600" : "text-red-600"
              }`}
            >
              {website.is_running ? "Online" : "Offline"}
            </span>
          </div>
          <p className="text-xs text-gray-400">{website.ping}ms</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Last checked: {new Date(website.last_checked).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWebsites();
    setInterval(() => {
      fetchWebsites();
    }, 5000);
  }, []);

  const fetchWebsites = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8080/api/get-websites");
    const data = await res.json();
    setWebsites(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-(--alice-blue)">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800">
                <span className="text-(--cool-sky)">Just.</span> Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchWebsites}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw
                  className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                />
              </button>
              <button
                onClick={() => navigate("/add-website")}
                className="flex items-center gap-2 bg-(--cool-sky) text-white px-4 py-2 rounded-lg hover:bg-(--azure-blue) transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Website
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Websites List */}
        <div className="rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Monitored Websites
            </h3>
            <span className="text-sm text-gray-500">
              {websites.length} website{websites.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-(--cool-sky) animate-spin" />
            </div>
          ) : websites.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">
                No websites yet
              </h4>
              <p className="text-gray-400 mb-6">
                Start monitoring
              </p>
              <button
                onClick={() => navigate("/add-website")}
                className="inline-flex items-center gap-2 bg-(--cool-sky) text-white px-6 py-3 rounded-lg hover:bg-(--azure-blue) transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Your Website
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {websites.map((website, index) => (
                <WebsiteCard key={index} website={website} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
