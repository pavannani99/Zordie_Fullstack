import { SpinningLogos } from "../ui/spinning-logos";
const SpinningLogosDemo = () => {
  return (
    <div>
         {/* Header Badge */}
      <div className="text-center mb-16">
        <span className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full shadow-lg">
          Integrations
        </span>
      </div>

      {/* Main Heading */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Seamless Integrations 
          <br />
          With <span className="text-blue-600">Your Favorite Tools</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Connect with over 200+ popular business tools to create a truly unified workflow.
        </p>
      </div>
      <SpinningLogos />
    </div>
  );
};

export { SpinningLogosDemo };