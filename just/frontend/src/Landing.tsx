import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Shield, Bell } from "lucide-react";

function Hero() {
  const navigate = useNavigate();
  const words = ["Monitor", "Observe", "Protect", "Network", "Analyze"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-(--alice-blue)">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-400 px-4 py-2 rounded-full mb-8 animate-pulse">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Currently monitoring 5083 websites</span>
        </div>

        <h1 className="font-bold text-gray-700 mb-6 text-8xl mx-auto">
          <span className="text-(--cool-sky)">Just. </span>
          <span className="inline-block">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Get instant alerts when your website goes down.
          <br />
          Monitoring has never been easier.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            className="bg-(--cool-sky) text-white px-8 py-4 rounded-lg hover:bg-(--azure-blue) cursor-pointer transition-all gap-2 shadow-lg shadow-[#70BAFF]/30 hover:scale-105"
            onClick={() => navigate("/add-website")}
          >
            Start For Free
          </button>
          <button
            className="border border-gray-300 text-gray-600 px-8 py-4 rounded-lg hover:border-(--cool-sky) hover:text-(--azure-blue) cursor-pointer transition-all"
            onClick={() => navigate("/home")}
          >
            View Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-4">
            Everything You Need to Stay Online
          </h2>
          <p className="text-xl text-gray-500 mx-auto">
            Comprehensive monitoring tools to keep your websites running
            smoothly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-xl border border-gray-200 hover:border-(--cool-sky) hover:shadow-lg transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl text-gray-700 font-semibold mb-3">
              Real-Time Monitoring
            </h3>
            <p className="text-gray-500">
              Check your website status every 30 seconds to ensure maximum
              reliability.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-xl border border-gray-200 hover:border-(--cool-sky) hover:shadow-lg transition">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              SSL Monitoring
            </h3>
            <p className="text-gray-500">
              Track SSL certificate expiration and get alerts before your
              certificates expire to avoid security warnings.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-xl border border-gray-200 hover:border-(--cool-sky) hover:shadow-lg transition">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl text-gray-700 font-semibold mb-3">
              Instant Alerts
            </h3>
            <p className="text-gray-500">
              Get notified immediately via email when your website goes down or
              recovers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
    </div>
  );
}

export default Landing;
