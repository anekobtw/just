function Hero() {
  return (
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-400 px-4 py-2 rounded-full mb-8 animate-pulse">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Currently monitoring 5083 websites</span>
          </div>
          
          <h1 className="font-bold text-gray-700 mb-6 text-8xl mx-auto">
            <span className="text-(--cool-sky)">Just.</span> Monitor
          </h1>
          
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            Get instant alerts when your website goes down.<br />Monitoring has never been easier.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="bg-(--cool-sky) text-white px-8 py-4 rounded-lg hover:bg-(--azure-blue) cursor-pointer transition-all gap-2 shadow-lg shadow-blue-200">
              Start For Free
            </button>
          </div>
        </div>
      </section>
  )
}


function App() {
  return (
    <div className="min-h-screen">
      <Hero />
    </div>
  )
}

export default App
