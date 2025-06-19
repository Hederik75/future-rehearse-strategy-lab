
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Lightbulb } from 'lucide-react';

interface SpeculativeCardProps {
  id: string;
  question: string;
  reflection: string;
  suggestions: string[];
  index: number;
  onResponse: (id: string, question: string, answer: string) => void;
}

export const SpeculativeCard: React.FC<SpeculativeCardProps> = ({
  id,
  question,
  reflection,
  suggestions,
  index,
  onResponse
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [answer, setAnswer] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSuggestionToggle = (suggestion: string) => {
    setSelectedSuggestions(prev => {
      if (prev.includes(suggestion)) {
        return prev.filter(s => s !== suggestion);
      }
      return [...prev, suggestion];
    });
  };

  const handleSubmitResponse = () => {
    const finalAnswer = answer.trim() || selectedSuggestions.join(', ');
    if (finalAnswer) {
      onResponse(id, question, finalAnswer);
    }
  };

  React.useEffect(() => {
    const finalAnswer = answer.trim() || selectedSuggestions.join(', ');
    if (finalAnswer) {
      onResponse(id, question, finalAnswer);
    }
  }, [answer, selectedSuggestions, id, question, onResponse]);

  return (
    <div className="group">
      <div 
        className={`bg-[#00A3B5] rounded-lg overflow-hidden transition-all duration-300 cursor-pointer
          ${isExpanded ? 'shadow-xl' : 'shadow-lg hover:shadow-xl hover:bg-[#008A9A]'}`}
        onClick={handleToggle}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#FFC20E] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight">
                  {question}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-[#FFC20E] ml-12">
                <MessageSquare className="w-5 h-5" />
                <p className="font-medium">
                  {reflection}
                </p>
              </div>
            </div>
            <div className="ml-4 text-white group-hover:text-[#FFC20E] transition-colors">
              {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="bg-white p-6 md:p-8 border-t-4 border-[#FFC20E]" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-6">
              <div>
                <label className="block text-[#333333] font-semibold mb-3 text-lg">
                  Your response:
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Share your strategic thinking here..."
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#00A3B5] focus:outline-none resize-none"
                  rows={4}
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-[#FFC20E]" />
                  <label className="text-[#333333] font-semibold text-lg">
                    Or select from these strategic considerations:
                  </label>
                </div>
                <div className="grid gap-3">
                  {suggestions.map((suggestion, idx) => (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${selectedSuggestions.includes(suggestion)
                          ? 'border-[#00A3B5] bg-[#00A3B5]/5'
                          : 'border-gray-200 hover:border-[#00A3B5]/50 hover:bg-gray-50'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSuggestions.includes(suggestion)}
                        onChange={() => handleSuggestionToggle(suggestion)}
                        className="mt-1 w-5 h-5 text-[#00A3B5] rounded focus:ring-[#00A3B5]"
                      />
                      <span className="text-[#333333] leading-relaxed">{suggestion}</span>
                    </label>
                  ))}
                </div>
              </div>

              {(answer.trim() || selectedSuggestions.length > 0) && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Response captured
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
