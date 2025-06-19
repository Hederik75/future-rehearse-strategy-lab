
import React from 'react';
import { Download, ArrowLeft, TrendingUp, AlertTriangle, Target, FileText } from 'lucide-react';

interface Response {
  id: string;
  question: string;
  answer: string;
}

interface InsightsSummaryProps {
  responses: Response[];
  onBack: () => void;
}

export const InsightsSummary: React.FC<InsightsSummaryProps> = ({ responses, onBack }) => {
  const generateWordCloud = () => {
    const allText = responses.map(r => r.answer).join(' ').toLowerCase();
    const words = allText.split(/\s+/).filter(word => 
      word.length > 3 && 
      !['that', 'this', 'with', 'have', 'will', 'from', 'they', 'been', 'were', 'said', 'each', 'which', 'their', 'would', 'there', 'could', 'other'].includes(word)
    );
    
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '');
      if (cleanWord) {
        wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1;
      }
    });

    return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({ word, count }));
  };

  const generateInsights = () => {
    const insights = [];
    const allAnswers = responses.map(r => r.answer.toLowerCase()).join(' ');

    // Strategic priorities
    const priorities = [];
    if (allAnswers.includes('capability') || allAnswers.includes('expertise')) {
      priorities.push('Building deep sector capabilities and expertise');
    }
    if (allAnswers.includes('partnership') || allAnswers.includes('acquisition')) {
      priorities.push('Strategic partnerships and acquisitions');
    }
    if (allAnswers.includes('technology') || allAnswers.includes('digital')) {
      priorities.push('Technology and digital transformation focus');
    }
    if (allAnswers.includes('client') || allAnswers.includes('relationship')) {
      priorities.push('Long-term client relationship development');
    }
    if (allAnswers.includes('market') || allAnswers.includes('local')) {
      priorities.push('Local market adaptation and relevance');
    }

    // Potential pitfalls
    const pitfalls = [];
    if (allAnswers.includes('slow') || allAnswers.includes('late')) {
      pitfalls.push('Moving too slowly in a fast-evolving market');
    }
    if (allAnswers.includes('generic') || allAnswers.includes('differentiate')) {
      pitfalls.push('Failing to differentiate from competitors');
    }
    if (allAnswers.includes('investment') || allAnswers.includes('resource')) {
      pitfalls.push('Insufficient investment in capabilities');
    }
    if (allAnswers.includes('execution') || allAnswers.includes('delivery')) {
      pitfalls.push('Gap between strategy and execution capabilities');
    }

    return { priorities, pitfalls };
  };

  const wordCloud = generateWordCloud();
  const { priorities, pitfalls } = generateInsights();

  const exportInsights = () => {
    const content = `
Strategic Workshop Insights
==========================

RESPONSES:
${responses.map(r => `
${r.question}
→ ${r.answer}
`).join('\n')}

KEY THEMES:
${wordCloud.slice(0, 10).map(w => `• ${w.word} (mentioned ${w.count} times)`).join('\n')}

STRATEGIC PRIORITIES:
${priorities.map(p => `• ${p}`).join('\n')}

POTENTIAL PITFALLS:
${pitfalls.map(p => `• ${p}`).join('\n')}

Generated on ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'strategic-insights.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#00A3B5] hover:text-[#008A9A] font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to prompts
          </button>
        </div>

        <div className="bg-[#00A3B5] text-white p-8 md:p-12 rounded-lg mb-12">
          <div className="flex items-center gap-4 mb-4">
            <TrendingUp className="w-8 h-8 text-[#FFC20E]" />
            <h2 className="text-3xl md:text-4xl font-bold">Strategic Insights Summary</h2>
          </div>
          <p className="text-xl opacity-90">
            Based on your {responses.length} responses, here are the key strategic themes and considerations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Word Cloud */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-[#00A3B5]" />
              <h3 className="text-2xl font-bold text-[#333333]">Key Themes</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {wordCloud.map(({ word, count }, index) => (
                <span
                  key={word}
                  className="px-3 py-2 bg-[#00A3B5]/10 text-[#00A3B5] rounded-full font-medium"
                  style={{
                    fontSize: `${Math.max(14, Math.min(24, 14 + count * 2))}px`
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Strategic Priorities */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-[#00A3B5]" />
              <h3 className="text-2xl font-bold text-[#333333]">Strategic Priorities</h3>
            </div>
            <ul className="space-y-3">
              {priorities.length > 0 ? priorities.map((priority, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FFC20E] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#333333] leading-relaxed">{priority}</span>
                </li>
              )) : (
                <li className="text-gray-500 italic">No specific priorities identified from responses</li>
              )}
            </ul>
          </div>
        </div>

        {/* Potential Pitfalls */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-[#FFC20E]" />
            <h3 className="text-2xl font-bold text-[#333333]">Potential Pitfalls</h3>
          </div>
          <ul className="space-y-3">
            {pitfalls.length > 0 ? pitfalls.map((pitfall, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FFC20E] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-[#333333] leading-relaxed">{pitfall}</span>
              </li>
            )) : (
              <li className="text-gray-500 italic">No specific pitfalls identified from responses</li>
            )}
          </ul>
        </div>

        {/* Detailed Responses */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-[#333333] mb-6">Your Complete Responses</h3>
          <div className="space-y-6">
            {responses.map((response, index) => (
              <div key={response.id} className="border-l-4 border-[#00A3B5] pl-6">
                <h4 className="font-semibold text-[#333333] mb-2">{response.question}</h4>
                <p className="text-[#333333] opacity-80 leading-relaxed">{response.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={exportInsights}
            className="bg-[#FFC20E] hover:bg-[#E6A900] text-black font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-3 justify-center"
          >
            <Download className="w-5 h-5" />
            Download strategic insights
          </button>
          <button className="bg-[#00A3B5] hover:bg-[#008A9A] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-3 justify-center">
            <Target className="w-5 h-5" />
            Plan a follow-up session
          </button>
        </div>
      </div>
    </section>
  );
};
