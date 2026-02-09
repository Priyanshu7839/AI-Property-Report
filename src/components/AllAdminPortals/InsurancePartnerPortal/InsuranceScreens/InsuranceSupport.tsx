import { HelpCircle, MessageSquare, Book, Mail, Phone } from 'lucide-react';
import { Button } from '../../../ui/button';

interface SupportProps {
  onNavigate: (screen: string) => void;
}

export function InsuranceSupport({ onNavigate }: SupportProps) {
  const faqs = [
    {
      question: 'How do I respond to a new lead?',
      answer: 'Click on the lead ID to view details, then use the "Contact Homeowner" button to reach out via email or phone.'
    },
    {
      question: 'What happens if I miss an SLA deadline?',
      answer: 'SLA breaches are tracked in your performance dashboard. Consistent breaches may affect your partner status.'
    },
    {
      question: 'How are commissions calculated?',
      answer: 'You earn 10% commission on the annual premium for each bound policy, paid monthly.'
    },
    {
      question: 'Can I adjust my coverage area?',
      answer: 'Yes, visit Settings > Coverage Area to update your service territory and lead preferences.'
    }
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Support</h1>
        <p className="text-gray-600 mt-1">Get help with the Insurance Partner Portal.</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
          <div className="bg-blue-50 p-3 rounded-lg w-fit mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600 mb-4">Get instant help from our support team</p>
          <Button className="w-full">Start Chat</Button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
          <div className="bg-green-50 p-3 rounded-lg w-fit mb-4">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-sm text-gray-600 mb-4">We'll respond within 24 hours</p>
          <Button variant="outline" className="w-full">Send Email</Button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
          <div className="bg-purple-50 p-3 rounded-lg w-fit mb-4">
            <Phone className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-sm text-gray-600 mb-4">Mon-Fri, 8am-6pm CST</p>
          <Button variant="outline" className="w-full">1-800-PARTNER</Button>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-50 p-2 rounded-lg">
            <Book className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-600 mt-0.5">Quick answers to common questions</p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-2 p-4 text-sm text-gray-600 border-l-2 border-blue-500 bg-blue-50/30">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="#" className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <p className="text-sm font-medium text-gray-900">Partner Onboarding Guide</p>
            <p className="text-xs text-gray-500 mt-1">Get started with the portal</p>
          </a>
          
          <a href="#" className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <p className="text-sm font-medium text-gray-900">Best Practices</p>
            <p className="text-xs text-gray-500 mt-1">Tips for maximizing conversions</p>
          </a>
          
          <a href="#" className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <p className="text-sm font-medium text-gray-900">Video Tutorials</p>
            <p className="text-xs text-gray-500 mt-1">Watch step-by-step guides</p>
          </a>
          
          <a href="#" className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <p className="text-sm font-medium text-gray-900">API Documentation</p>
            <p className="text-xs text-gray-500 mt-1">Technical integration docs</p>
          </a>
        </div>
      </div>
    </div>
  );
}
