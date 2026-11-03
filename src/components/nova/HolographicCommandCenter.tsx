import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Mic,
  MicOff,
  Volume2,
  Maximize2,
  Minimize2,
  Sparkles,
  Cpu,
  Shield,
  Zap,
  Activity,
  Send,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sliders,
  ChevronRight,
  Eye,
} from 'lucide-react';
import {
  NOVA_PERSONALITIES,
  speakNovaResponse,
  parseNovaCommand,
} from '../../services/novaIntelligence';
import {
  NovaPersonalityId,
  NovaCommandExecution,
} from '../../types/nova';
import { UserProfile } from '../../types/career';

interface HolographicCommandCenterProps {
  user: UserProfile;
  onNavigate: (tabId: string) => void;
  onTriggerAgents?: () => void;
  onOpenVisionModal?: () => void;
}

export const HolographicCommandCenter: React.FC<HolographicCommandCenterProps> = ({
  user,
  onNavigate,
  onTriggerAgents,
  onOpenVisionModal,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // States
  const [selectedPersonality, setSelectedPersonality] = useState<NovaPersonalityId>('jarvis-prime');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [activeCommand, setActiveCommand] = useState<NovaCommandExecution | null>(null);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    'NOVA Quantum Kernel v4.0 initialized',
    'Three.js WebGL spatial engine online at 60 FPS',
    'Voice synthesis engine connected (Web Speech API)',
    '4-Agent coordination bridge connected',
  ]);

  // Audio waveform animation state
  const [audioFrequencies, setAudioFrequencies] = useState<number[]>([15, 30, 65, 80, 45, 90, 70, 35, 60, 20, 85, 40]);

  // Active personality
  const personality = NOVA_PERSONALITIES.find((p) => p.id === selectedPersonality) || NOVA_PERSONALITIES[0];

  // Three.js animation setup
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080b18, 0.12);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Holographic Core - Outer Wireframe Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Dynamic Gyro Orbit Ring 1
    const ringGeo1 = new THREE.RingGeometry(2.1, 2.14, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    scene.add(ringMesh1);

    // Dynamic Gyro Orbit Ring 2
    const ringGeo2 = new THREE.RingGeometry(2.4, 2.43, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    scene.add(ringMesh2);

    // Swarm of ambient neural particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.8 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xa5b4fc,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Core rotation
      sphereMesh.rotation.y = elapsed * 0.25;
      sphereMesh.rotation.x = elapsed * 0.15;

      innerMesh.rotation.y = -elapsed * 0.4;
      innerMesh.rotation.z = elapsed * 0.2;

      ringMesh1.rotation.z = elapsed * 0.35;
      ringMesh2.rotation.x = elapsed * 0.28;

      // Dynamic pulsation when speaking or listening
      const pulse = Math.sin(elapsed * 4) * 0.08 + 1.0;
      innerMesh.scale.set(pulse, pulse, pulse);

      particles.rotation.y = elapsed * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // Synthetic or live audio waveform simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSpeaking || isListening) {
        setAudioFrequencies(Array.from({ length: 16 }, () => Math.floor(Math.random() * 80 + 20)));
      } else {
        setAudioFrequencies(Array.from({ length: 16 }, () => Math.floor(Math.random() * 15 + 5)));
      }
    }, 120);
    return () => clearInterval(interval);
  }, [isSpeaking, isListening]);

  // Voice Recognition Handler
  const handleToggleVoice = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    // Check Web Speech API support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setExecutionLogs((prev) => [
        'Browser does not support Web Speech API natively. Please type commands below.',
        ...prev,
      ]);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setExecutionLogs((prev) => ['[VOICE ENGINE] Listening for speech...', ...prev]);
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        setIsListening(false);
        handleProcessCommand(spokenText);
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
        setExecutionLogs((prev) => [`[VOICE WARNING] Error: ${err.error || 'Check microphone'}`, ...prev]);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech start error:', err);
      setIsListening(false);
    }
  };

  // Process Command Intent
  const handleProcessCommand = (text: string) => {
    if (!text.trim()) return;
    const parsed = parseNovaCommand(text);
    setActiveCommand(parsed);
    setExecutionLogs((prev) => [
      `[INTENT DETECTED] "${parsed.intent}" with ${parsed.actions.length} action(s)`,
      `[COMMAND INPUT] "${text}"`,
      ...prev,
    ]);

    // Speak natural response
    setIsSpeaking(true);
    speakNovaResponse(
      `Understood. I have prepared the plan for ${parsed.intent}. Please review the actions on your HUD.`,
      selectedPersonality,
      () => setIsSpeaking(false)
    );
  };

  // Execute Approved Command
  const handleExecuteActiveCommand = () => {
    if (!activeCommand) return;
    setExecutionLogs((prev) => [
      `[DISPATCHED] Executing ${activeCommand.actions.length} action(s) for ${activeCommand.intent}...`,
      ...prev,
    ]);

    // Check target module and route
    const firstAction = activeCommand.actions[0];
    if (firstAction) {
      if (firstAction.targetModule === 'agent-centre') {
        if (onTriggerAgents) onTriggerAgents();
        onNavigate('agent-centre');
      } else if (firstAction.targetModule === 'digital-twin') {
        onNavigate('career-dna');
      } else if (firstAction.targetModule === 'skill-verification') {
        onNavigate('skill-verification');
      } else if (firstAction.targetModule === 'interview-arena') {
        onNavigate('interview-arena');
      } else if (firstAction.targetModule === 'talent-marketplace') {
        onNavigate('job-match');
      } else if (firstAction.targetModule === 'project-cofounder') {
        onNavigate('project-studio');
      } else if (firstAction.targetModule === 'career-mentor') {
        onNavigate('career-mentor');
      }
    }

    setActiveCommand(null);
    setTranscript('');
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!mountRef.current) return;
    if (!isFullscreen) {
      if (mountRef.current.requestFullscreen) {
        mountRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={mountRef}
      className={`relative w-full bg-[#080B18] text-slate-100 flex flex-col transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 p-6 overflow-y-auto' : 'rounded-2xl border border-indigo-500/20 p-4 lg:p-6 mb-8'
      }`}
    >
      {/* Top Hologram Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-500/15 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                NOVA AI 4.0 Holographic Core
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 uppercase">
                  Quantum HUD
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              JARVIS-inspired autonomous career orchestrator & multimodal spatial intelligence
            </p>
          </div>
        </div>

        {/* Personality & Mode Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Persona:</span>
            <select
              value={selectedPersonality}
              onChange={(e) => {
                const newId = e.target.value as NovaPersonalityId;
                setSelectedPersonality(newId);
                const p = NOVA_PERSONALITIES.find((x) => x.id === newId);
                if (p) {
                  speakNovaResponse(`Switching to ${p.name}. Systems online.`, newId);
                }
              }}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              {NOVA_PERSONALITIES.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {onOpenVisionModal && (
            <button
              onClick={onOpenVisionModal}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              NOVA Vision
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Immersive Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Holographic Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Telemetry HUD Panel */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Active Personality Card */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: `${personality.accentColor}25`, border: `1px solid ${personality.accentColor}50` }}
              >
                <Sparkles className="w-4 h-4" style={{ color: personality.accentColor }} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{personality.name}</h4>
                <p className="text-[11px] text-slate-400">{personality.tagline}</p>
              </div>
            </div>
            <p className="text-xs text-slate-300/90 leading-relaxed mb-3">
              {personality.systemPrompt.slice(0, 115)}...
            </p>
            <div className="flex flex-wrap gap-1.5">
              {personality.capabilities.map((cap, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* System Telemetry Diagnostics */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Quantum Diagnostics
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Neural Core Load</span>
                  <span className="font-mono text-cyan-400">24%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '24%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Context Window</span>
                  <span className="font-mono text-indigo-400">1.2M / 2.0M tokens</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div className="flex justify-between py-1 border-t border-slate-800/60">
                <span className="text-slate-400">Orchestration Latency</span>
                <span className="font-mono text-emerald-400">42ms</span>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-800/60">
                <span className="text-slate-400">Zero-Trust Guard</span>
                <span className="font-mono text-emerald-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Active
                </span>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-800/60">
                <span className="text-slate-400">Candidate Readiness</span>
                <span className="font-mono text-indigo-400 font-bold">{user.readinessScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center 3D Holographic Core & Voice HUD */}
        <div className="lg:col-span-6 flex flex-col items-center justify-between min-h-[460px] relative rounded-xl bg-gradient-to-b from-indigo-950/20 via-slate-950/40 to-slate-900/40 border border-indigo-500/20 p-4 overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* Three.js Canvas Container */}
          <div ref={canvasContainerRef} className="w-full h-72 flex items-center justify-center relative cursor-grab active:cursor-grabbing">
            {/* Holographic Status Overlay */}
            <div className="absolute top-2 left-3 flex items-center gap-2 text-xs font-mono text-cyan-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/30 backdrop-blur-md">
              <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-rose-500 animate-ping' : isSpeaking ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'}`} />
              STATUS: {isListening ? 'LISTENING (SPEECH API)' : isSpeaking ? 'VOICE SYNTHESIS' : 'QUANTUM CORE IDLE'}
            </div>
          </div>

          {/* Real-time Audio Frequency Waveform */}
          <div className="w-full flex items-center justify-center gap-1 h-8 my-2 px-6">
            {audioFrequencies.map((val, idx) => (
              <div
                key={idx}
                className="w-1.5 rounded-full transition-all duration-100"
                style={{
                  height: `${Math.max(6, val * 0.35)}px`,
                  backgroundColor: isListening ? '#f43f5e' : isSpeaking ? '#38bdf8' : '#6366f1',
                  opacity: 0.85,
                }}
              />
            ))}
          </div>

          {/* Voice Input & Natural Language Command Bar */}
          <div className="w-full relative mt-2">
            <div className="flex items-center gap-2 bg-slate-900/90 border border-indigo-500/30 rounded-xl p-1.5 focus-within:border-indigo-500 backdrop-blur-xl">
              <button
                onClick={handleToggleVoice}
                className={`p-2.5 rounded-lg transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/40'
                    : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                }`}
                title={isListening ? 'Click to stop listening' : 'Speak voice command to NOVA'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleProcessCommand(transcript);
                }}
                placeholder={isListening ? 'Listening to your voice...' : 'Command NOVA (e.g. "Find my skill gaps", "Start 4-agent workflow", "Simulate salary")...'}
                className="flex-1 bg-transparent px-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />

              <button
                onClick={() => handleProcessCommand(transcript)}
                disabled={!transcript.trim()}
                className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dispatch</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Action Matrix & Execution Console */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Quick Hologram Action Matrix */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Quick Command Matrix
            </h4>
            <div className="space-y-1.5">
              {[
                { label: 'Analyze Skill Gaps & What-If', query: 'Find my skill gaps and simulate career path' },
                { label: 'Trigger 4-Agent Pipeline', query: 'Start four agent workflow' },
                { label: 'Launch Interview Simulator', query: 'Start DSA practice session' },
                { label: 'Architect Capstone Project', query: 'Architect project with co-founder' },
                { label: 'Open Talent Marketplace', query: 'Find matching jobs on marketplace' },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTranscript(btn.query);
                    handleProcessCommand(btn.query);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/40 text-xs text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate">{btn.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Execution Feed */}
          <div className="flex-1 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                Telemetry Log
              </h4>
              <button
                onClick={() => setExecutionLogs(['Telemetry cleared', 'Standing by for instructions'])}
                className="text-[10px] text-slate-500 hover:text-slate-300 font-mono"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 space-y-1.5 font-mono text-[11px] text-slate-400 max-h-48 overflow-y-auto pr-1">
              {executionLogs.map((log, i) => (
                <div key={i} className="leading-tight py-0.5 border-b border-slate-800/40">
                  <span className="text-cyan-400/80 mr-1">&gt;</span>
                  <span className={log.includes('INTENT') ? 'text-indigo-300 font-semibold' : log.includes('VOICE') ? 'text-emerald-300' : ''}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Command Confirmation HUD Modal */}
      {activeCommand && (
        <div className="mt-4 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 backdrop-blur-xl animate-fadeIn">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  APPROVAL CHECKPOINT
                </span>
                <h4 className="text-sm font-bold text-white">{activeCommand.intent}</h4>
              </div>
              <p className="text-xs text-slate-300 mb-2">
                NOVA formulated the following sequence of authorized actions:
              </p>
              <div className="space-y-1.5 mb-3">
                {activeCommand.actions.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white mr-2">{act.label}</span>
                      <span className="text-slate-400">{act.description}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        act.riskLevel === 'high'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {act.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={handleExecuteActiveCommand}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-900/30"
              >
                <CheckCircle2 className="w-4 h-4" />
                Authorize & Execute
              </button>
              <button
                onClick={() => setActiveCommand(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
