//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Users, Zap, BookOpen, Brain, BarChart3, Clock, Target, Shield, Lightbulb, TrendingUp, DollarSign, Award, MessageSquare, FileText, Calculator, Eye, Headphones } from 'lucide-react';

const HRAgentsDashboard = () => {
  const [primeHRScore, setPrimeHRScore] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [optimusProgress, setOptimusProgress] = useState(0);
  const [maxiLearningPath, setMaxiLearningPath] = useState(0);
  const [realTimeData, setRealTimeData] = useState([
    { name: 'Active Alerts', value: 12, trend: '+3' },
    { name: 'Sync Status', value: 99, trend: '+1' },
    { name: 'Agent Coordination', value: 94, trend: '+2' }
  ]);

  const [optimusMetrics, setOptimusMetrics] = useState([
    { name: 'JDs Generated', value: 247, trend: '+12' },
    { name: 'Budget Saved', value: 85, trend: '+5' },
    { name: 'Performance Score', value: 92, trend: '+8' }
  ]);

  const [maxiMetrics, setMaxiMetrics] = useState([
    { name: 'Learning Paths', value: 156, trend: '+15' },
    { name: 'ROI Improvement', value: 78, trend: '+12' },
    { name: 'Review Accuracy', value: 96, trend: '+4' }
  ]);

  // Animated counters and progress bars
  useEffect(() => {
    const timer = setInterval(() => {
      setPrimeHRScore(prev => prev >= 400 ? 0 : prev + 8);
      setOptimusProgress(prev => prev >= 100 ? 0 : prev + 2);
      setMaxiLearningPath(prev => prev >= 100 ? 0 : prev + 1.5);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Voice animation
  useEffect(() => {
    const voiceTimer = setInterval(() => {
      setIsListening(prev => !prev);
    }, 2000);

    return () => clearInterval(voiceTimer);
  }, []);

  const FloatingIcon = ({ Icon, delay = 0, position = '' }) => (
    <div 
      className={`absolute opacity-10 animate-bounce ${position}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationDuration: '3s'
      }}
    >
      <Icon size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-2">
            HR Intelligence Suite
          </h1>
          <p className="text-gray-600">Orchestrated AI agents for comprehensive HR management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Prime HR - Master Orchestrator */}
          <div
  className="rounded-3xl p-8 text-white relative overflow-hidden shadow-custom"
  style={{
    background: 'linear-gradient(180deg, #10ad8b 1.08%, rgb(0, 33, 179) 100%)'
  }}
>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Brain className="w-10 h-10 " />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Prime HR</h2>
                  <p className="text-orange-200">Master Orchestrator</p>
                </div>
              </div>
              
              <p className="text-orange-100 mb-8 text-lg leading-relaxed">
                The central intelligence that orchestrates every agent, providing custom alert systems and real-time data synchronization across your entire HR ecosystem.
              </p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-orange-200 font-medium">ORCHESTRATION SCORE</span>
                    <span className="text-3xl font-bold">{primeHRScore}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-4">
                    <div 
                      className="bg-white h-4 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${(primeHRScore / 400) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {realTimeData.map((item, index) => (
                    <div key={index} className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="text-xs text-orange-200 mb-1">{item.name}</div>
                      <div className="text-xl font-bold">{item.value}</div>
                      <div className="text-xs text-green-200">{item.trend}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-6 h-6" />
                      <span className="font-medium">Custom Alerts</span>
                    </div>
                    <div className="text-2xl font-bold">24/7 Active</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-6 h-6" />
                      <span className="font-medium">Real-time Sync</span>
                    </div>
                    <div className="text-2xl font-bold">Live Data</div>
                  </div>
                </div>
              </div>
            </div>
            
            <FloatingIcon Icon={Users} delay={0} position="top-4 right-4" />
            <FloatingIcon Icon={BarChart3} delay={1000} position="bottom-4 right-8" />
            <FloatingIcon Icon={Target} delay={2000} position="top-16 right-16" />
          </div>

          {/* Optimus - JD Generator & Analytics */}
          <div className="rounded-3xl p-8 text-white relative overflow-hidden"
          style={{
          background: 'linear-gradient(180deg, #10ad8b 1.08%, rgb(0, 33, 179) 100%)'
            }}>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Award className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Optimus</h2>
                  <p className="text-blue-200">JD Generator & Analytics</p>
                </div>
              </div>
              
              <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                One-click job description generator with intelligent budget management, performance analysis, portfolio verification, and culture fit prediction.
              </p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-blue-200 font-medium">JD GENERATION PROGRESS</span>
                    <span className="text-3xl font-bold">{optimusProgress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-4">
                    <div 
                      className="bg-white h-4 rounded-full transition-all duration-300"
                      style={{ width: `${optimusProgress}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {optimusMetrics.map((item, index) => (
                    <div key={index} className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="text-xs text-blue-200 mb-1">{item.name}</div>
                      <div className="text-xl font-bold">{item.value}</div>
                      <div className="text-xs text-green-200">+{item.trend}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-6 h-6" />
                      <span className="font-medium">Budget Mgmt</span>
                    </div>
                    <div className="text-xl font-bold">Smart Control</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-6 h-6" />
                      <span className="font-medium">Portfolio Verify</span>
                    </div>
                    <div className="text-xl font-bold">AI Powered</div>
                  </div>
                </div>
              </div>
            </div>
            
            <FloatingIcon Icon={FileText} delay={500} position="top-4 right-4" />
            <FloatingIcon Icon={Calculator} delay={1500} position="bottom-4 right-8" />
            <FloatingIcon Icon={TrendingUp} delay={2500} position="top-16 right-16" />
          </div>

          {/* Maxi - Learning & Development */}
          <div className=" rounded-3xl p-8 text-white relative overflow-hidden"
          style={{
          background: 'linear-gradient(180deg,rgb(3, 66, 255) 1.08%, rgb(229, 179, 99) 100%)'
            }}>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <BookOpen className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Maxi</h2>
                  <p className="text-orange-200">Learning & Development</p>
                </div>
              </div>
              
              <p className="text-orange-100 mb-8 text-lg leading-relaxed">
                AI-curated learning paths with external platform integration, ROI calculation, predictive modeling, and AI-assisted performance reviews.
              </p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-orange-200 font-medium">LEARNING PATH COMPLETION</span>
                    <span className="text-3xl font-bold">{Math.round(maxiLearningPath)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-4">
                    <div 
                      className="bg-white h-4 rounded-full transition-all duration-300"
                      style={{ width: `${maxiLearningPath}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {maxiMetrics.map((item, index) => (
                    <div key={index} className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="text-xs text-orange-200 mb-1">{item.name}</div>
                      <div className="text-xl font-bold">{item.value}</div>
                      <div className="text-xs text-green-200">+{item.trend}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-6 h-6" />
                      <span className="font-medium">AI Reviews</span>
                    </div>
                    <div className="text-xl font-bold">Intelligent</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-6 h-6" />
                      <span className="font-medium">Predictive Model</span>
                    </div>
                    <div className="text-xl font-bold">Advanced</div>
                  </div>
                </div>
              </div>
            </div>
            
            <FloatingIcon Icon={Lightbulb} delay={300} position="top-4 right-4" />
            <FloatingIcon Icon={TrendingUp} delay={1300} position="bottom-4 right-8" />
            <FloatingIcon Icon={Target} delay={2300} position="top-16 right-16" />
          </div>

          {/* Monica - Voice Control Agent */}
            <div className=" rounded-3xl p-8 text-white relative overflow-hidden"
          style={{
          background: 'linear-gradient(180deg,rgb(3, 66, 255) 1.08%, rgb(229, 179, 99) 100%)'
            }}>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <MessageSquare className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Monica</h2>
                  <p className="text-white/80">Voice Control Agent</p>
                </div>
              </div>
              
              <p className="text-white/90 mb-8 text-lg leading-relaxed">
                Advanced voice-powered AI agent that seamlessly controls and coordinates all HR operations through natural conversation and intelligent voice commands.
              </p>
              
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isListening ? 'bg-white/30 scale-110' : 'bg-white/20'
                  }`}>
                    {isListening ? <Mic className="w-16 h-16" /> : <MicOff className="w-16 h-16" />}
                  </div>
                  {isListening && (
                    <>
                      <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-ping"></div>
                      <div className="absolute inset-4 rounded-full border-2 border-white/30 animate-pulse"></div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-xl font-bold mb-2">
                  {isListening ? 'Listening for commands...' : 'Ready to assist'}
                </div>
                <div className="text-white/80">
                  Voice-activated control for all HR agents
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/15 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <Headphones className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Voice Commands</div>
                  <div className="text-lg font-bold">∞</div>
                </div>
                
                <div className="bg-white/15 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <Brain className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Agent Control</div>
                  <div className="text-lg font-bold">4/4</div>
                </div>
                
                <div className="bg-white/15 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <Zap className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Response Time</div>
                  <div className="text-lg font-bold">0.2s</div>
                </div>
              </div>
            </div>
            
            <FloatingIcon Icon={Headphones} delay={200} position="top-4 right-4" />
            <FloatingIcon Icon={MessageSquare} delay={1200} position="bottom-4 right-8" />
            <FloatingIcon Icon={Mic} delay={2200} position="top-16 right-16" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HRAgentsDashboard;