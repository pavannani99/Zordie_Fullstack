import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';

const WaitLanding = () => {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 8,
    minutes: 8,
    seconds: 32
  });
  const [openFaq, setOpenFaq] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const faqData = [
    {
      question: "What is Zordie?",
      answer: "Soonix is a premium Framer template by Temlis that helps you launch a clean, high-converting waitlist page. It's designed to grow your email list and build momentum before your product goes live.",
    },
    {
      question: "What's included in this template?",
      answer: "The template includes a complete waitlist landing page with countdown timer, email capture, mobile preview, FAQ section, and all necessary components for a successful product launch."
    },
    {
      question: "How do I customize this template?",
      answer: "You can easily customize colors, fonts, content, and layout through Framer's intuitive interface. All components are fully editable and responsive."
    },
    {
      question: "Is support available?",
      answer: "Yes, we provide comprehensive documentation and support to help you get the most out of your template."
    },
    {
      question: "How much will this cost?",
      answer: "Pricing details are available on our main website. We offer competitive rates for premium Framer templates."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 mt-12">
        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          {/* Logo and Title Section */}
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="w-20 h-20 bg-black rounded-2xl mx-auto mb-8 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <span className="text-white text-3xl font-bold">S</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Get <span className="font-medium">early access</span>
            </h1>
            
            <p className="text-gray-600 text-lg mb-12 max-w-md mx-auto">
              We're getting close. Sign up to get early access to<br />
              Soonix and start building your viral waitlist.
            </p>

            {/* Email Signup */}
            <div className={`flex flex-col md:flex-row items-center justify-center gap-4 mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-6 py-4 border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-full md:w-80 transition-all duration-300"
              />
              <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium">
                Join waitlist
              </button>
            </div>

            {/* Social Proof */}
            <div className={`flex items-center justify-center gap-3 text-gray-600 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <span>Join +<span className="animate-counter">5,000</span> others on the waitlist</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className={`text-center mb-20 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex justify-center items-center gap-8 md:gap-16">
              {Object.entries(timeLeft).map(([unit, value], index) => (
                <div key={unit} className="text-center">
                  <div className="bg-white rounded-2xl shadow-lg p-6 mb-3 transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-100">
                    <span className="text-4xl md:text-5xl font-light text-gray-900 block">{value}</span>
                  </div>
                  <span className="text-gray-500 text-sm uppercase tracking-wide">{unit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Preview Section */}
          <div className="relative flex justify-center mb-20 h-96">
            {/* Phone mockup - cropped to show only top 40% */}
            <div className={`relative z-10 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <div className="relative overflow-hidden h-48">
                <img 
                  src="https://framerusercontent.com/images/aakgjIMOuAYyuSyHV3PxMpdikWs.png?scale-down-to=2048" 
                  alt="Mobile App Preview"
                  className="w-80 h-auto transform hover:scale-105 transition-transform duration-500 object-top"
                  style={{ clipPath: 'inset(0 0 40% 0)' }}
                />
                
                {/* Floating mobile image */}
                <div className="absolute -right-8 top-8 animate-float">
                  <img
                    src="https://framerusercontent.com/images/lThhKZlHi8SrHJHxYYRjGkhOx3U.png?scale-down-to=512"
                    alt="Floating mobile"
                    className="w-24 h-auto transform hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Cloud blur effect - positioned to cover the visible phone area */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-32 z-20 pointer-events-none">
              <img 
                src="https://framerusercontent.com/images/kQtFldHlO1TcN7vmItvJzjgg.png" 
                alt="cloud"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>

          {/* FAQ Section */}
          <div className={`max-w-2xl mx-auto transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Frequently asked<br />questions
              </h2>
              <p className="text-gray-600">
                Everything you need to know about the Soonix template. Find<br />
                answers to the most common questions below.
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-md ${openFaq === index ? 'scale-[1.02]' : ''}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    <div className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-45' : ''}`}>
                      {openFaq === index ? (
                        <X className="w-6 h-6 text-gray-600" />
                      ) : (
                        <Plus className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center mt-20 pt-12 border-t border-gray-200">
            <div className="flex justify-center items-center space-x-4 text-gray-500 text-sm">
              <span>Webflow Templates</span>
              <span>•</span>
              <span>Framer Templates</span>
              <span>•</span>
              <span>Temlis.com</span>
            </div>
          </footer>
        </main>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }
        
        @keyframes counter {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          50% {
            opacity: 0.5;
            transform: translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-counter {
          animation: counter 2s ease-in-out infinite;
          display: inline-block;
          color: #000;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default WaitLanding;