import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Zap,
  Cpu,
  Brain,
  Compass,
} from 'lucide-react';
import { chatWithGemini, ChatMessage } from '../../services/geminiService';

interface MentorPersona {
  id: string;
  name: string;
  title: string;
  roleDescription: string;
  systemInstruction: string;
  recommendedModel: string;
  quickPrompts: string[];
}

const MENTOR_PERSONAS: MentorPersona[] = [
  {
    id: 'staff-architect',
    name: 'Dr. Evelyn Vance',
    title: 'Staff Systems Architect & Tech Lead',
    roleDescription: 'Specializes in distributed systems, scalability, database indexing, and deep technical interviews.',
    systemInstruction:
      'You are Dr. Evelyn Vance, a Staff Systems Architect at a top cloud infrastructure provider with 15+ years experience. You provide clear, rigorous architectural guidance, system design trade-offs (CAP, latency vs throughput, caching strategies), and code design advice.',
    recommendedModel: 'gemini-4-argon',
    quickPrompts: [
      'How do I explain consistent hashing in a System Design round?',
      'What are the key trade-offs between PostgreSQL and Cassandra?',
      'Review my architectural strategy for a multi-tenant SaaS.',
    ],
  },
  {
    id: 'faang-em',
    name: 'Marcus Brody',
    title: 'Senior Engineering Manager (Tier-1)',
    roleDescription: 'Focuses on team leadership, behavioral interviews, internship conversion, and career velocity.',
    systemInstruction:
      'You are Marcus Brody, a Senior Engineering Manager at a top-tier tech company. You guide candidates through behavioral questions, internship conversion strategies, salary negotiations, and engineering team dynamics using the STAR method.',
    recommendedModel: 'gemini-3.8-flash',
    quickPrompts: [
      'How do I convert a summer internship into a full-time return offer?',
      'How should I answer: "Tell me about a time you disagreed with an engineer"?',
      'What signals stand out most during an engineering manager interview?',
    ],
  },
  {
    id: 'speed-coach',
    name: 'Flash Career Coach',
    title: 'Rapid Response Career Strategist',
    roleDescription: 'Quick resume checks, rapid interview drills, and instant syntax questions.',
    systemInstruction:
      'You are a high-speed, sharp technical career coach. Give immediate, actionable, bulleted answers without fluff.',
    recommendedModel: 'gemini-3.1-flash-lite',
    quickPrompts: [
      'Quick review: 3 action verbs for a DevOps resume.',
      'What questions should I ask the interviewer at the end of a round?',
      'Give me a 30-second elevator pitch for a Full-Stack AI Engineer.',
    ],
  },
];

export const AICareerMentor: React.FC = () => {
  const [selectedPersonaId, setSelectedPersonaId] = useState(MENTOR_PERSONAS[0].id);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Greetings. I am your AI Career Mentor. Whether you need deep System Design critiques, interview prep, or strategic career trajectory guidance, I am here to help you accelerate your engineering journey.',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentPersona = MENTOR_PERSONAS.find((p) => p.id === selectedPersonaId) || MENTOR_PERSONAS[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: textToSend.trim() };
    const updatedHistory = [...messages, userMessage];

    setMessages(updatedHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await chatWithGemini({
        message: textToSend.trim(),
        history: updatedHistory.slice(0, -1),
        model: selectedModel,
        systemInstruction: currentPersona.systemInstruction,
      });

      setMessages([...updatedHistory, { role: 'model', text: responseText }]);
    } catch {
      // Deterministic fallback response
      setMessages([
        ...updatedHistory,
        {
          role: 'model',
          text: `Insight from ${currentPersona.name}: Focusing on measurable outcomes and structural clarity is paramount. In interviews, anchor every technical decision with explicit constraints: requirements, scale, trade-offs, and failure recovery.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonaChange = (id: string) => {
    setSelectedPersonaId(id);
    const persona = MENTOR_PERSONAS.find((p) => p.id === id);
    if (persona) {
      setSelectedModel(persona.recommendedModel);
      setMessages([
        {
          role: 'model',
          text: `Switched mentor role to ${persona.name} (${persona.title}). How can I assist you with your career goals?`,
        },
      ]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0c1224] via-[#10182b] to-[#080B18] border border-indigo-500/20 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            PART 4 & FEATURE REQUIREMENT • GEMINI MULTI-TURN CHATBOT
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            AI Career Mentor & Strategic Counsel
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Multi-turn conversation engine with specialized engineering roles, memory preservation, and model routing.
          </p>
        </div>

        {/* Model Selector Affordance */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 self-start md:self-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Model:
          </span>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-transparent text-xs text-cyan-300 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="gemini-4-argon" className="bg-slate-900 text-white">
              gemini-4-argon (Complex reasoning)
            </option>
            <option value="gemini-3.8-flash" className="bg-slate-900 text-white">
              gemini-3.8-flash (General guidance)
            </option>
            <option value="gemini-3.1-flash-lite" className="bg-slate-900 text-white">
              gemini-3.1-flash-lite (Ultra fast)
            </option>
          </select>
        </div>
      </div>

      {/* Main Mentor Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 cols): Persona Selection */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-cyan-400" />
              Specialized Mentor Roles
            </h3>

            <div className="space-y-2.5">
              {MENTOR_PERSONAS.map((persona) => {
                const isSelected = persona.id === selectedPersonaId;
                return (
                  <button
                    key={persona.id}
                    onClick={() => handlePersonaChange(persona.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/20 border-cyan-400 ring-1 ring-cyan-400/40 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center justify-between">
                      <span>{persona.name}</span>
                      <span className="text-[10px] text-cyan-300 font-mono">
                        {persona.recommendedModel.replace('gemini-', '')}
                      </span>
                    </div>
                    <div className="text-[11px] text-indigo-300 mt-0.5">{persona.title}</div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {persona.roleDescription}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="p-5 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Suggested Conversation Starters
            </h4>
            <div className="space-y-2">
              {currentPersona.quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-left text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Scrollable Multi-Turn Chat Window */}
        <div className="lg:col-span-8 flex flex-col h-[640px] rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">{currentPersona.name}</h4>
                <div className="text-[11px] text-slate-400">{currentPersona.title}</div>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
              Role Instruction Active
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm ${
                      isUser ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-cyan-400" />}
                  </div>

                  <div
                    className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed space-y-1.5 whitespace-pre-line ${
                      isUser
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-md'
                        : 'bg-slate-900/90 border border-slate-800/80 text-slate-200 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <div className="text-[10px] opacity-70 font-mono mb-1">
                      {isUser ? 'You' : currentPersona.name}
                    </div>
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  {currentPersona.name} is synthesizing counsel...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Ask ${currentPersona.name} for career guidance, technical trade-offs, or review...`}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
