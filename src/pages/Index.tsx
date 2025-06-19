
import React, { useState } from 'react';
import { SpeculativeCard } from '../components/SpeculativeCard';
import { InsightsSummary } from '../components/InsightsSummary';
import { Download, ArrowRight, Lightbulb, Target, TrendingUp } from 'lucide-react';

interface Response {
  id: string;
  question: string;
  answer: string;
}

const Index = () => {
  const [responses, setResponses] = useState<Response[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const speculativePrompts = [
    {
      id: "trust-mandate",
      question: "Imagine we become the first consultancy to sign a 10-year transformation mandate with a leading energy company.",
      reflection: "What would we have done differently today to earn that level of trust?",
      suggestions: [
        "Built deep sector expertise through strategic hires",
        "Developed proprietary energy transition frameworks",
        "Established long-term client partnerships",
        "Invested in energy-specific technology capabilities"
      ]
    },
    {
      id: "revenue-growth",
      question: "Imagine our energy revenues surpass our traditional banking and finance practice by 2027.",
      reflection: "What internal and external conditions must align for this to happen?",
      suggestions: [
        "Rapid energy market transformation creates demand",
        "Strategic acquisitions expand our capabilities",
        "Government policies accelerate clean energy adoption",
        "We develop unique IP in energy consulting"
      ]
    },
    {
      id: "lifecycle-delivery",
      question: "What if client demand shifts towards full lifecycle delivery – from strategy to execution?",
      reflection: "How do we reposition ourselves in the market?",
      suggestions: [
        "Build implementation capabilities internally",
        "Form strategic partnerships with execution specialists",
        "Acquire boutique implementation firms",
        "Develop hybrid consulting-execution models"
      ]
    },
    {
      id: "failure-scenario",
      question: "It's 2028. We have shut down our energy consulting branch.",
      reflection: "What went wrong? Were we too slow, too generic, too externally led, or too under-invested in local relevance?",
      suggestions: [
        "Failed to differentiate from competitors",
        "Underestimated local market dynamics",
        "Insufficient investment in talent and capabilities",
        "Misread the pace of market transformation"
      ]
    },
    {
      id: "market-volume",
      question: "What if the market volume is smaller than expected?",
      reflection: "How do we create a profitable model? How do we balance depth of engagement with the need for scale?",
      suggestions: [
        "Focus on high-value, premium engagements",
        "Develop scalable digital consulting products",
        "Create consortium-based delivery models",
        "Build recurring revenue through retainer relationships"
      ]
    }
  ];

  const handleResponse = (id: string, question: string, answer: string) => {
    setResponses(prev => {
      const existingIndex = prev.findIndex(r => r.id === id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { id, question, answer };
        return updated;
      }
      return [...prev, { id, question, answer }];
    });
  };

  const handleShowSummary = () => {
    if (responses.length > 0) {
      setShowSummary(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#00A3B5] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Exploring the future with speculative questions
          </h1>
          <p className="text-2xl md:text-3xl font-light opacity-90">
            Unlock bold thinking for uncertain markets
          </p>
        </div>
      </section>

      {/* Section 1 - Why speculative questions? */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#00A3B5] text-white p-8 md:p-12 rounded-lg mb-12">
            <div className="flex items-start gap-4 mb-6">
              <Lightbulb className="w-8 h-8 text-[#FFC20E] flex-shrink-0 mt-1" />
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                In fast-moving, volatile markets, traditional forecasts fall short. Speculative questions help us not to predict the future — but to rehearse it.
              </h2>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-[#333333] leading-relaxed space-y-6">
            <p>
              Speculative questioning is a practice derived from speculative design and futures thinking. Rather than asking "What will happen?", these disciplines focus on "What if it happened?", "What would it mean?", or "How might we respond if this became reality?"
            </p>
            
            <p>
              This approach is especially valuable in industries shaped by political uncertainty, technological disruption, and regulatory change. It has been used by institutions such as the UK Government Office for Science (through its Foresight programme), the United Nations Development Programme (UNDP), and innovation teams at companies like Google X, IKEA's SPACE10, and Philips Design.
            </p>
            
            <p>
              For a consulting firm entering the energy market, speculative questioning helps expose blind spots, challenge assumptions, and generate strategies that are bold, adaptive, and plausible.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 - Speculative strategy prompts */}
      {!showSummary && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Target className="w-8 h-8 text-[#00A3B5]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#333333]">
                Speculative strategy prompts
              </h2>
            </div>
            
            <div className="space-y-6">
              {speculativePrompts.map((prompt, index) => (
                <SpeculativeCard
                  key={prompt.id}
                  {...prompt}
                  index={index}
                  onResponse={handleResponse}
                />
              ))}
            </div>

            {responses.length > 0 && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleShowSummary}
                  className="bg-[#FFC20E] hover:bg-[#E6A900] text-black font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-3 mx-auto group"
                >
                  <TrendingUp className="w-5 h-5" />
                  Generate Strategic Insights
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[#333333] mt-4 opacity-75">
                  {responses.length} of {speculativePrompts.length} prompts completed
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 3 - Reflection summary */}
      {showSummary && (
        <InsightsSummary 
          responses={responses} 
          onBack={() => setShowSummary(false)}
        />
      )}
    </div>
  );
};

export default Index;
