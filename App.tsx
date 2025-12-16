import React, { useState, useEffect } from 'react';
import { 
  Trophy, CheckCircle, Circle, Book, Zap, 
  Menu, X, ExternalLink, ChevronRight, ChevronDown, 
  BarChart, Users, Star, Code, Hash, Info, Bot, 
  Play, RefreshCw, Eye, EyeOff, Copy, Lightbulb, LightbulbOff
} from 'lucide-react';
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ROADMAP_DATA, IMPORTANT_TIPS, RESOURCES } from './constants';
import { Stage, SubTopic } from './types';

// --- Types for AI Generation ---

interface GeneratedProblem {
  title: string;
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  examples: { input: string; output: string }[];
  hint: string;
  algorithmIdea: string; // New field for algorithm idea
  cppSolution: string;
}

// --- Components ---

const ProgressBar = ({ completed, total }: { completed: number; total: number }) => {
  const percentage = Math.round((completed / total) * 100) || 0;
  return (
    <div className="w-full bg-slate-800 rounded-full h-4 mb-6 border border-slate-700">
      <div 
        className="bg-gradient-to-r from-primary-600 to-primary-400 h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-end px-2"
        style={{ width: `${percentage}%` }}
      >
        <span className="text-[10px] font-bold text-white">{percentage}%</span>
      </div>
    </div>
  );
};

const Header = ({ 
  toggleSidebar, 
  completedCount, 
  totalCount 
}: { 
  toggleSidebar: () => void;
  completedCount: number; 
  totalCount: number;
}) => (
  <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-slate-900/80 border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 md:hidden focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <Code size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 hidden sm:block">
              CP Mastery
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Tiến độ</span>
            <span className="text-sm font-mono text-primary-400 font-bold">{completedCount} / {totalCount} Topics</span>
          </div>
          <a 
            href="https://oj.vnoi.info/" 
            target="_blank" 
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sm font-medium rounded-lg transition-colors border border-slate-700"
          >
            <Users size={16} />
            <span>VNOI</span>
          </a>
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-primary-400">
            <Trophy size={18} />
          </button>
        </div>
      </div>
    </div>
  </header>
);

const Sidebar = ({ 
  isOpen, 
  close, 
  activeTab, 
  setActiveTab 
}: { 
  isOpen: boolean; 
  close: () => void; 
  activeTab: string; 
  setActiveTab: (t: string) => void;
}) => {
  const menuItems = [
    { id: 'roadmap', label: 'Lộ trình học', icon: <Hash size={18} /> },
    { id: 'ai_practice', label: 'Luyện tập cùng AI', icon: <Bot size={18} /> },
    { id: 'resources', label: 'Tài liệu & Web', icon: <Book size={18} /> },
    { id: 'tips', label: 'Lời khuyên', icon: <Zap size={18} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={close}
        />
      )}
      
      {/* Sidebar Content */}
      <aside className={`
        fixed top-16 bottom-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); close(); }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${activeTab === item.id 
                  ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Mục tiêu</h4>
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-bold text-slate-200">ICPC / IOI</span>
            </div>
            <p className="text-xs text-slate-500">Hãy kiên trì mỗi ngày.</p>
          </div>
        </div>
      </aside>
    </>
  );
};

const ItemDetailModal = ({ 
  item, 
  onClose 
}: { 
  item: SubTopic | null; 
  onClose: () => void 
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
          <div>
            <h3 className="text-xl font-bold text-white">{item.name}</h3>
            {item.description && <p className="text-slate-400 text-sm mt-1">{item.description}</p>}
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Theory / Meaning */}
          {item.details && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-primary-400 uppercase tracking-wide flex items-center gap-2">
                <BookOpenIcon size={16} />
                Ý nghĩa & Lý thuyết
              </h4>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {item.details}
              </p>
            </div>
          )}

          {/* Code Snippet */}
          {item.codeSnippet && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-green-400 uppercase tracking-wide flex items-center gap-2">
                <Code size={16} />
                Ví dụ Code (C++)
              </h4>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-green-600/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                    <code>{item.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Links if any */}
          {item.links && item.links.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                Bài tập & Liên kết
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.links.map((link, i) => (
                  <a 
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-primary-400 hover:bg-slate-750 hover:text-primary-300 border border-slate-700 transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={14} />
                    {link.title || "Xem liên kết"}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- AI Practice Section Component ---

const AIPracticeSection = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Dễ');
  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState<GeneratedProblem | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState('');

  const generateProblem = async () => {
    if (!topic.trim()) {
      setError('Vui lòng nhập chủ đề (ví dụ: Quy hoạch động, Đồ thị...)');
      return;
    }
    
    setLoading(true);
    setError('');
    setProblem(null);
    setShowSolution(false);
    setShowHint(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Create a competitive programming problem about "${topic}" with difficulty "${difficulty}".
      The problem should be original and formatted as a strict JSON object.
      Language: Vietnamese.
      IMPORTANT: Provide a detailed "algorithmIdea" explaining the logical approach before the code.
      `;

      const responseSchema: Schema = {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Problem title in Vietnamese" },
          statement: { type: Type.STRING, description: "Problem description/story in Vietnamese" },
          inputFormat: { type: Type.STRING, description: "Input specification" },
          outputFormat: { type: Type.STRING, description: "Output specification" },
          constraints: { type: Type.STRING, description: "N, M constraints etc." },
          examples: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                input: { type: Type.STRING },
                output: { type: Type.STRING }
              }
            }
          },
          hint: { type: Type.STRING, description: "A subtle hint for the solution" },
          algorithmIdea: { type: Type.STRING, description: "Detailed explanation of algorithm logic and approach" },
          cppSolution: { type: Type.STRING, description: "Full C++ solution code" }
        },
        required: ["title", "statement", "inputFormat", "outputFormat", "constraints", "examples", "hint", "algorithmIdea", "cppSolution"]
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
      });

      const text = response.text;
      if (text) {
        setProblem(JSON.parse(text));
      } else {
        setError("Không nhận được phản hồi từ AI. Vui lòng thử lại.");
      }

    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi khi tạo bài tập. Vui lòng kiểm tra kết nối hoặc API Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Input Section */}
      <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Bot className="text-primary-400" />
          Tạo bài tập tuỳ chỉnh
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Chủ đề</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="VD: Quy hoạch động, Dijkstra..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Độ khó</label>
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 appearance-none"
            >
              <option value="Dễ">Dễ (Beginner)</option>
              <option value="Trung bình">Trung bình (Intermediate)</option>
              <option value="Khó">Khó (Advanced)</option>
              <option value="Cực khó">Cực khó (Master)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={generateProblem}
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="animate-spin" size={20} /> : <Play size={20} />}
              {loading ? "Đang tạo..." : "Tạo bài tập"}
            </button>
          </div>
        </div>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </div>

      {/* Result Section */}
      {problem && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
          <div className="bg-slate-800/80 p-6 border-b border-slate-700 flex justify-between items-start">
            <div>
               <span className="inline-block px-2 py-1 bg-primary-600/20 text-primary-400 text-xs font-bold rounded mb-2 border border-primary-600/30">
                {topic} • {difficulty}
              </span>
              <h2 className="text-2xl font-bold text-white">{problem.title}</h2>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-slate-300 leading-relaxed">{problem.statement}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">Input</h4>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm text-slate-300">
                  {problem.inputFormat}
                  <div className="mt-2 text-slate-500 pt-2 border-t border-slate-800/50">
                    {problem.constraints}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">Output</h4>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm text-slate-300">
                  {problem.outputFormat}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">Ví dụ</h4>
              <div className="grid gap-4">
                {problem.examples.map((ex, i) => (
                  <div key={i} className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-500 mb-1">Input</div>
                      <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap">{ex.input}</pre>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-500 mb-1">Output</div>
                      <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap">{ex.output}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hint & Solution Actions */}
            <div className="pt-6 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => setShowHint(!showHint)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showHint 
                      ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' 
                      : 'bg-slate-800 text-slate-400 hover:text-yellow-400 hover:bg-slate-700'
                  }`}
                >
                  {showHint ? <LightbulbOff size={16} /> : <Lightbulb size={16} />}
                  {showHint ? "Ẩn gợi ý" : "Xem gợi ý"}
                </button>

                <button 
                  onClick={() => setShowSolution(!showSolution)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showSolution
                      ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                      : 'bg-slate-800 text-slate-400 hover:text-primary-400 hover:bg-slate-700'
                  }`}
                >
                  {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showSolution ? "Ẩn lời giải" : "Xem lời giải"}
                </button>
              </div>

              {/* Hint Card */}
              {showHint && (
                <div className="mt-6 animate-fade-in">
                  <div className="bg-yellow-900/10 border border-yellow-700/30 p-4 rounded-xl">
                    <h5 className="text-yellow-500 text-sm font-bold mb-2 flex items-center gap-2">
                      <Lightbulb size={16} />
                      Gợi ý nhỏ
                    </h5>
                    <p className="text-yellow-200/80 text-sm leading-relaxed">
                      {problem.hint}
                    </p>
                  </div>
                </div>
              )}

              {/* Solution Section */}
              {showSolution && (
                <div className="mt-6 space-y-6 animate-fade-in">
                  
                  {/* Algorithm Idea Box */}
                  <div className="bg-blue-900/10 border border-blue-700/30 p-4 rounded-xl">
                    <h5 className="text-blue-400 text-sm font-bold mb-2 flex items-center gap-2">
                      <Bot size={16} />
                      Ý tưởng thuật toán
                    </h5>
                    <p className="text-blue-200/80 text-sm leading-relaxed">
                      {problem.algorithmIdea}
                    </p>
                  </div>
                  
                  {/* Code Solution */}
                  <div className="relative group">
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => navigator.clipboard.writeText(problem.cppSolution)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"
                        title="Copy Code"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    <pre className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-sm text-slate-300 overflow-x-auto">
                      <code>{problem.cppSolution}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// Helper icon
const BookOpenIcon = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);


interface StageCardProps {
  stage: Stage;
  completedItems: Set<string>;
  toggleItem: (id: string) => void;
  onViewDetails: (item: SubTopic) => void;
}

const StageCard: React.FC<StageCardProps> = ({ 
  stage, 
  completedItems, 
  toggleItem,
  onViewDetails
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate progress for this specific stage
  const stageItemIds = stage.categories.flatMap(c => c.items.map(i => i.id));
  const stageTotal = stageItemIds.length;
  const stageCompleted = stageItemIds.filter(id => completedItems.has(id)).length;
  const isComplete = stageTotal > 0 && stageCompleted === stageTotal;

  return (
    <div className={`
      relative overflow-hidden rounded-2xl border transition-all duration-300
      ${isComplete 
        ? 'bg-slate-900/40 border-green-900/30' 
        : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'}
    `}>
      {/* Stage Header */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`
                text-xs font-bold px-2 py-1 rounded text-white
                ${stage.id === 1 ? 'bg-blue-600' : 
                  stage.id === 2 ? 'bg-indigo-600' : 
                  stage.id === 3 ? 'bg-purple-600' : 'bg-rose-600'}
              `}>
                GIAI ĐOẠN {stage.id}
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <BarChart size={12} />
                {stage.duration}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{stage.title.split(': ')[1]}</h3>
            <p className="text-sm text-slate-400">{stage.description}</p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300
              ${isExpanded ? 'bg-slate-700 rotate-180' : 'bg-slate-800'}
            `}>
              <ChevronDown size={20} className="text-slate-300" />
            </div>
          </div>
        </div>

        {/* Mini Progress Bar for Stage */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-primary-500'}`} 
              style={{ width: `${(stageCompleted / stageTotal) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-slate-400">{stageCompleted}/{stageTotal}</span>
        </div>
      </div>

      {/* Expanded Content */}
      <div className={`
        border-t border-slate-700/50 bg-slate-900/30 transition-all duration-300 ease-in-out
        ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
      `}>
        <div className="p-6 grid gap-6 md:grid-cols-2">
          {stage.categories.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="font-semibold text-primary-200 text-sm uppercase tracking-wide border-b border-slate-700/50 pb-2">
                {cat.title}
              </h4>
              <ul className="space-y-2">
                {cat.items.map((item) => {
                  const isChecked = completedItems.has(item.id);
                  const hasDetails = item.details || item.codeSnippet;
                  return (
                    <li 
                      key={item.id} 
                      className={`
                        group flex items-start gap-3 p-2 rounded-lg transition-colors cursor-pointer select-none
                        ${isChecked ? 'bg-green-900/10' : 'hover:bg-slate-800'}
                      `}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className={`mt-0.5 flex-shrink-0 transition-colors ${isChecked ? 'text-green-500' : 'text-slate-600 group-hover:text-slate-500'}`}>
                        {isChecked ? <CheckCircle size={20} /> : <Circle size={20} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${isChecked ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                            {item.name}
                          </span>
                          
                          {/* Info Button for Details */}
                          {hasDetails && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewDetails(item);
                              }}
                              className="p-1 rounded text-slate-500 hover:text-primary-400 hover:bg-slate-700 transition-colors"
                              title="Xem chi tiết & Code mẫu"
                            >
                              <Info size={16} />
                            </button>
                          )}
                        </div>
                        
                        {item.description && (
                          <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                        )}
                        
                        {item.links && item.links.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.links.map((link, i) => (
                              <a 
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-800 text-primary-400 hover:bg-slate-700 hover:text-primary-300 border border-slate-700 transition-colors"
                              >
                                <ExternalLink size={10} />
                                {link.title || "Xem bài tập"}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TipsSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
    {IMPORTANT_TIPS.map((tip, index) => (
      <div key={index} className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:border-primary-500/50 transition-colors">
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-primary-400 mb-4 border border-slate-700">
          {/* Simple icon mapping based on string name, fallback to Zap */}
          <Zap size={24} /> 
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
        <p className="text-slate-400 leading-relaxed">{tip.content}</p>
      </div>
    ))}
  </div>
);

const ResourcesSection = () => (
  <div className="space-y-8 animate-fade-in">
    <div>
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Trophy className="text-yellow-500" size={24} />
        Nền tảng thi đấu (Judges)
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESOURCES.filter(r => r.category === 'Judge').map((res) => (
          <a 
            key={res.name}
            href={res.url} 
            target="_blank" 
            rel="noreferrer"
            className="flex flex-col p-4 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-750 hover:border-primary-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-200 group-hover:text-primary-300">{res.name}</span>
              <ExternalLink size={16} className="text-slate-500 group-hover:text-primary-400" />
            </div>
            <p className="text-xs text-slate-400">{res.description}</p>
          </a>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Book className="text-blue-500" size={24} />
        Tài liệu & Cộng đồng
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESOURCES.filter(r => r.category !== 'Judge').map((res) => (
          <a 
            key={res.name}
            href={res.url} 
            target="_blank" 
            rel="noreferrer"
            className="flex flex-col p-4 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-750 hover:border-blue-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-200 group-hover:text-blue-300">{res.name}</span>
              <ExternalLink size={16} className="text-slate-500 group-hover:text-blue-400" />
            </div>
            <p className="text-xs text-slate-400">{res.description}</p>
          </a>
        ))}
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  
  // New state for modal
  const [selectedTopic, setSelectedTopic] = useState<SubTopic | null>(null);

  // Load progress from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cp_mastery_progress');
    if (saved) {
      setCompletedItems(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    localStorage.setItem('cp_mastery_progress', JSON.stringify(Array.from(completedItems)));
  }, [completedItems]);

  const toggleItem = (id: string) => {
    const newSet = new Set(completedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCompletedItems(newSet);
  };

  // Compute stats
  const totalItems = ROADMAP_DATA.reduce((acc, stage) => 
    acc + stage.categories.reduce((cAcc, cat) => cAcc + cat.items.length, 0), 0
  );
  const completedCount = completedItems.size;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-primary-500/30 selection:text-primary-200">
      <Header 
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
        completedCount={completedCount}
        totalCount={totalItems}
      />

      <Sidebar 
        isOpen={isSidebarOpen} 
        close={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="md:ml-64 pt-6 pb-20 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Dashboard Header Content */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              {activeTab === 'roadmap' && "Lộ trình Competitive Programming"}
              {activeTab === 'ai_practice' && "Luyện tập cùng AI"}
              {activeTab === 'resources' && "Kho tài liệu"}
              {activeTab === 'tips' && "Lời khuyên quan trọng"}
            </h2>
            
            {activeTab === 'roadmap' && (
              <>
                <p className="text-slate-400 max-w-2xl mb-6">
                  Theo dõi tiến độ học tập từ cơ bản đến nâng cao. Đánh dấu các chủ đề bạn đã nắm vững để xem sự tiến bộ của mình.
                </p>
                <ProgressBar completed={completedCount} total={totalItems} />
              </>
            )}
            {activeTab === 'ai_practice' && (
              <p className="text-slate-400 max-w-2xl mb-6">
                Sử dụng trí tuệ nhân tạo để tạo ra các bài toán lập trình độc đáo phù hợp với trình độ của bạn.
              </p>
            )}
             {activeTab === 'resources' && (
              <p className="text-slate-400 max-w-2xl mb-6">
                Tuyển tập các website, sách và cộng đồng tốt nhất để luyện tập.
              </p>
            )}
             {activeTab === 'tips' && (
              <p className="text-slate-400 max-w-2xl mb-6">
                Những tư duy và thói quen cốt lõi để đi đường dài với lập trình thi đấu.
              </p>
            )}
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {activeTab === 'roadmap' && (
              <div className="grid gap-6">
                {ROADMAP_DATA.map(stage => (
                  <StageCard 
                    key={stage.id} 
                    stage={stage} 
                    completedItems={completedItems} 
                    toggleItem={toggleItem}
                    onViewDetails={setSelectedTopic}
                  />
                ))}
              </div>
            )}

            {activeTab === 'ai_practice' && <AIPracticeSection />}

            {activeTab === 'resources' && <ResourcesSection />}
            
            {activeTab === 'tips' && <TipsSection />}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      <ItemDetailModal 
        item={selectedTopic} 
        onClose={() => setSelectedTopic(null)} 
      />
    </div>
  );
};

export default App;