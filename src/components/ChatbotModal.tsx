import { useState, useRef, useEffect } from 'react';
import { X, Send, Phone, Calendar, User, Mail, Clock, Check, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyAddress?: string;
  mode?: 'general' | 'schedule-call' | 'advisor' | 'strategy-session' | 'apply-strategy';
 
}

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

export function ChatbotModal({ isOpen, onClose, propertyAddress, mode = 'general' }: ChatbotModalProps) {
  // Set initial message based on mode
  const getInitialMessage = () => {
    if (mode === 'general') {
      return {
        id: '1',
        type: 'bot' as const,
        content: "👋 Hi! Welcome to AIPropertyReport.com! I'm LIAM. I can help you understand how our platform works and what insights you'll get in your free property report. What would you like to know?",
        timestamp: new Date()
      };
    }
    return {
      id: '1',
      type: 'bot' as const,
      content: "Hi! I'm your Liquidity Investment Analysis Model. I've reviewed your report and I'm excited to help you unlock your home's potential. What's your main goal?",
      timestamp: new Date()
    };
  };

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [inputValue, setInputValue] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [conversationStage, setConversationStage] = useState<'intro' | 'goal' | 'details' | 'booking'>('intro');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: ''
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = {
    intro: mode === 'general' ? [
      "How does it work?",
      "What's in the report?",
      "Is it really free?",
      "Get my report now"
    ] : [
      "Unlock my home equity",
      "Investment opportunities",
      "Refinance guidance",
      "General consultation"
    ],
    goal: [
      "Tell me more",
      "What's the next step?",
      "Book a call now"
    ],
    home: [
      "Tell me more",
      "Generate my report",
      "Talk to an advisor"
    ]
  };

  const addMessage = (content: string, type: 'bot' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickReply = (reply: string) => {
    addMessage(reply, 'user');
    setShowQuickReplies(false);

    // Simulate typing delay
    setTimeout(() => {
      let botResponse = '';
      
      if (conversationStage === 'intro') {
        // Home mode responses
        if (mode === 'general') {
          if (reply.includes('How does it work')) {
            botResponse = "Great question! Simply enter your property address above, and our AI instantly analyzes: 📊 Property valuation • 💰 Hidden equity opportunities • 📈 Investment potential • 🏦 Refinance options. The whole report generates in under 60 seconds - completely free!";
            setConversationStage('goal');
          } else if (reply.includes("What's in the report")) {
            botResponse = "Your free report includes: ✅ AI-powered property valuation • ✅ Unlockable capital scenarios (10%, 30%, 50%) • ✅ Investment growth projections across S&P 500, Bitcoin, Gold & more • ✅ Market trends & negotiation intelligence • ✅ Personalized refinance opportunities. Everything you need to maximize your home's wealth potential!";
            setConversationStage('goal');
          } else if (reply.includes('Is it really free')) {
            botResponse = "Yes, 100% free! No credit card, no hidden fees, ever. We provide these reports to help homeowners discover opportunities they didn't know existed. If you want expert guidance to act on your insights, our advisors are available for free consultations too.";
            setConversationStage('goal');
          } else if (reply.includes('Get my report')) {
            botResponse = "Perfect! Just scroll up to the address input field, enter your property address, and hit 'Generate Report'. You'll have your complete AI property intelligence report in seconds. Need any help?";
            setShowQuickReplies(false);
          }
        }
        // Report mode responses
        else {
          if (reply.includes('equity')) {
            botResponse = "Great choice! Based on your property report, you could unlock $300K+ in capital. Our advisors specialize in helping homeowners like you deploy this strategically. Would you like to schedule a free 30-minute consultation to explore your options?";
          } else if (reply.includes('Investment')) {
            botResponse = "Perfect! I see your report shows strong growth potential across multiple asset classes. Our certified advisors can create a personalized investment strategy. Ready to book a free consultation to discuss your portfolio?";
          } else if (reply.includes('Refinance')) {
            botResponse = "Smart move! Current market conditions might save you thousands. Our mortgage specialists can analyze your exact situation. Shall we schedule a no-obligation call to review your refinance opportunities?";
          } else {
            botResponse = "I'd love to help! Our advisors have helped 2,340+ homeowners unlock $45M+ in hidden capital. A quick 30-minute call can map out a personalized strategy for you. When would be a good time to chat?";
          }
          setConversationStage('goal');
        }
      } else if (conversationStage === 'goal') {
        if (reply.includes('Tell me more')) {
          if (mode === 'general') {
            botResponse = "Our platform uses advanced AI and hedonic regression models analyzing 47+ comparable properties, CoreLogic data, and real-time market trends. Unlike Zillow estimates, we provide actionable investment strategies and wealth-building opportunities specific to YOUR property. Ready to see your report?";
          } else {
            botResponse = "Our advisors are certified financial professionals with an average of 12+ years experience. They'll review your report, analyze your financial goals, and create a custom action plan - completely free. Most clients walk away with 3-5 actionable strategies. Sound good?";
          }
        } else if (reply.includes('next step') || reply.includes('Generate my report')) {
          if (mode === 'general') {
            botResponse = "Awesome! Just enter your property address in the search box at the top of the page and click 'Generate Free Report'. Your comprehensive AI property report will be ready in under 60 seconds!";
            setShowQuickReplies(false);
          } else {
            botResponse = "Let's get you on the calendar! I just need a few quick details to connect you with the perfect advisor. What's your name?";
            setConversationStage('details');
          }
        } else if (reply.includes('Book a call') || reply.includes('Talk to an advisor')) {
          botResponse = "Excellent! Let me grab a few details to match you with the right advisor. First, what's your name?";
          setConversationStage('details');
          setShowBookingForm(true);
        }
      }

      addMessage(botResponse, 'bot');
      
      if (conversationStage === 'goal' && !reply.includes('Tell me more')) {
        if (mode === 'general' && (reply.includes('Generate') || reply.includes('Get my report'))) {
          setShowQuickReplies(false);
        } else if (mode !== 'general') {
          setShowQuickReplies(false);
        }
      } else if (conversationStage === 'intro' && mode === 'general') {
        setShowQuickReplies(true);
      } else if (conversationStage === 'intro') {
        setShowQuickReplies(true);
      }
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    const userMessage = inputValue;
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      
      if (conversationStage === 'details') {
        if (!userInfo.name) {
          setUserInfo(prev => ({ ...prev, name: userMessage }));
          botResponse = `Nice to meet you, ${userMessage}! What's the best email to send your consultation details?`;
        } else if (!userInfo.email) {
          setUserInfo(prev => ({ ...prev, email: userMessage }));
          botResponse = "Perfect! And what's a good phone number to reach you?";
        } else if (!userInfo.phone) {
          setUserInfo(prev => ({ ...prev, phone: userMessage }));
          botResponse = "Great! When would you prefer to have your consultation? (e.g., 'Tomorrow 2pm', 'This week mornings', 'Next Monday')";
        } else {
          setUserInfo(prev => ({ ...prev, preferredTime: userMessage }));
          botResponse = "🎉 Perfect! I'm booking your free consultation now...";
          setConversationStage('booking');
          
          // Show success message after a delay
          setTimeout(() => {
            addMessage("✅ You're all set! You'll receive a confirmation email at " + userInfo.email + " within 5 minutes with your advisor's calendar link. Our team will also call you to confirm. Looking forward to helping you unlock your property's potential!", 'bot');
          }, 2000);
          return;
        }
      } else {
        botResponse = "I'd be happy to help! Could you tell me more about what you're looking for?";
      }

      addMessage(botResponse, 'bot');
    }, 1000);
  };

  const handleBookingFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addMessage("📅 Booking your consultation...", 'user');
    
    setTimeout(() => {
      addMessage("✅ You're all set! You'll receive a confirmation email at " + userInfo.email + " within 5 minutes with your advisor's calendar link. Our team will also call you at " + userInfo.phone + " to confirm your " + userInfo.preferredTime + " appointment. Looking forward to helping you unlock your property's potential!", 'bot');
      setShowBookingForm(false);
      setConversationStage('booking');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      ></div>

      {/* Chat Modal */}
      <div className="relative w-full max-w-md h-[600px] sm:h-[700px] bg-white rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none shadow-2xl flex flex-col pointer-events-auto animate-slide-up sm:animate-slide-left overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#0A0A0A] to-[#161718] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
                <MessageCircle className="text-white" size={20} />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#18A36F] border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-white font-medium text-[15px]">LIAM</h3>
              <p className="text-white/80 text-[11px]">Liquidity Investment Analysis Model</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Property Context Banner */}
        {propertyAddress && (
          <div className="px-6 py-3 bg-gradient-to-r from-[#F8FAFF] to-white border-b border-black/[0.06]">
            <p className="text-[#6A6A6A] text-[11px] mb-1">Discussing your report for:</p>
            <p className="text-black text-[12px] font-medium">{propertyAddress}</p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#FAFBFC]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-b from-[#0A0A0A] to-[#161718] text-white'
                    : 'bg-white text-black border border-black/[0.06] shadow-sm'
                }`}
              >
                <p className="text-[14px] leading-relaxed">{message.content}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    message.type === 'user' ? 'text-white/70' : 'text-[#6A6A6A]'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Quick Replies */}
          {showQuickReplies && (
            <div className="flex flex-wrap gap-2 pt-2">
              {quickReplies[conversationStage === 'intro' ? 'intro' : 'goal'].map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(reply)}
                  className="px-4 py-2 rounded-full bg-white border border-[#000]/20 text-[#000] text-[13px] font-medium hover:bg-[#005BFF]/5 transition-all duration-200 shadow-sm hover:shadow"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Booking Form */}
          {showBookingForm && !userInfo.email && (
            <div className="bg-white rounded-xl p-5 border border-black/[0.06] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="text-[#005BFF]" size={18} />
                <h4 className="text-black font-medium text-[14px]">Quick Booking Form</h4>
              </div>
              <form onSubmit={handleBookingFormSubmit} className="space-y-3">
                <div>
                  <label className="block text-[#6A6A6A] text-[11px] mb-1 uppercase tracking-wide font-medium">Your Name</label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-black/[0.12] rounded-lg text-[14px] focus:outline-none focus:border-[#005BFF] transition-colors"
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#6A6A6A] text-[11px] mb-1 uppercase tracking-wide font-medium">Email</label>
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-black/[0.12] rounded-lg text-[14px] focus:outline-none focus:border-[#005BFF] transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#6A6A6A] text-[11px] mb-1 uppercase tracking-wide font-medium">Phone</label>
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-black/[0.12] rounded-lg text-[14px] focus:outline-none focus:border-[#005BFF] transition-colors"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#6A6A6A] text-[11px] mb-1 uppercase tracking-wide font-medium">Preferred Time</label>
                  <input
                    type="text"
                    value={userInfo.preferredTime}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, preferredTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-black/[0.12] rounded-lg text-[14px] focus:outline-none focus:border-[#005BFF] transition-colors"
                    placeholder="Tomorrow 2pm"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#005BFF] to-[#0066FF] text-white py-3 rounded-lg text-[14px] font-medium hover:opacity-90 transition-opacity"
                >
                  <Calendar size={16} className="mr-2" />
                  Book My Free Consultation
                </Button>
              </form>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 bg-white border-t border-black/[0.06]">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-black/[0.12] rounded-full text-[14px] focus:outline-none focus:border-[#005BFF] transition-colors"
              disabled={conversationStage === 'booking'}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || conversationStage === 'booking'}
              className="p-3 rounded-full bg-gradient-to-b from-[#0A0A0A] to-[#161718] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-[#6A6A6A] text-[10px] text-center mt-2">
            🔒 Your information is secure and never shared
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slide-left {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-slide-left {
          animation: slide-left 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}