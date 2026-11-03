import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SkillNodeData {
  name: string;
  category: string;
  level: string;
  score: number;
  color: number;
  pos: [number, number, number];
}

const SKILL_NODES: SkillNodeData[] = [
  { name: 'TypeScript', category: 'Frontend/Core', level: 'Master', score: 94, color: 0x3b82f6, pos: [0, 1.2, 0] },
  { name: 'React 19', category: 'UI Architecture', level: 'Advanced', score: 91, color: 0x06b6d4, pos: [-1.8, 0.4, 0.5] },
  { name: 'Gemini AI', category: 'AI Orchestration', level: 'Expert', score: 96, color: 0x8b5cf6, pos: [1.8, 0.5, -0.4] },
  { name: 'System Design', category: 'Distributed Architecture', level: 'Proficient', score: 82, color: 0x4f46e5, pos: [-1.2, -1.2, 0.3] },
  { name: 'PostgreSQL', category: 'Relational DB', level: 'Advanced', score: 85, color: 0x14b8a6, pos: [1.3, -1.1, 0.4] },
  { name: 'Docker / Cloud', category: 'Infrastructure', level: 'Proficient', score: 79, color: 0xf59e0b, pos: [0, -0.2, -1.5] },
];

export const SkillGalaxyCanvas: React.FC<{
  onSelectSkill?: (skill: SkillNodeData) => void;
}> = ({ onSelectSkill }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<SkillNodeData>(SKILL_NODES[0]);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080b18, 0.15);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      setWebGlSupported(false);
      return;
    }

    // Central Neural Core
    const coreGeo = new THREE.IcosahedronGeometry(0.5, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Outer Orbit Ring
    const ringGeo = new THREE.RingGeometry(2.3, 2.33, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.5;
    scene.add(ringMesh);

    // Floating Skill Spheres
    const nodeMeshes: { mesh: THREE.Mesh; data: SkillNodeData }[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.24, 16, 16);

    SKILL_NODES.forEach((node) => {
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(...node.pos);
      scene.add(mesh);
      nodeMeshes.push({ mesh, data: node });

      // Connecting line to core
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35,
      });
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node.pos)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
    });

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x818cf8, 2, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Particle field
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interaction via Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));
      if (intersects.length > 0) {
        const hit = nodeMeshes.find((n) => n.mesh === intersects[0].object);
        if (hit) {
          setActiveSkill(hit.data);
          onSelectSkill?.(hit.data);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Animation Loop
    let animId: number;
    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) * 0.001;

      coreMesh.rotation.y += delta * 0.4;
      coreMesh.rotation.x += delta * 0.2;
      ringMesh.rotation.z += delta * 0.15;
      particles.rotation.y += delta * 0.05;

      // Subtle float motion on skill nodes
      nodeMeshes.forEach((item, index) => {
        item.mesh.position.y = item.data.pos[1] + Math.sin(elapsed * 1.5 + index) * 0.08;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectSkill]);

  if (!webGlSupported) {
    return (
      <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 p-6 flex flex-col justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Skill Intelligence Matrix</span>
          <h4 className="text-xl font-bold text-white mt-1">Autonomous Neural Skill Lattice</h4>
          <p className="text-xs text-slate-400 mt-2">Displaying real-time verified competency nodes and inter-dependency clusters.</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {SKILL_NODES.map((node) => (
            <button
              key={node.name}
              onClick={() => {
                setActiveSkill(node);
                onSelectSkill?.(node);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeSkill.name === node.name
                  ? 'bg-indigo-600/30 border-indigo-500 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-semibold">{node.name}</div>
              <div className="text-[10px] text-cyan-400 mt-1">{node.level} • {node.score}%</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[420px] rounded-2xl bg-gradient-to-b from-[#0e1428]/80 to-[#080B18]/90 border border-indigo-500/20 overflow-hidden shadow-2xl backdrop-blur-xl group">
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD overlay with active node telemetry */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Interactive 3D Skill Lattice • Click Any Node
        </div>
      </div>

      {/* Active Selected Skill Card (Bottom HUD) */}
      <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-80 p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 backdrop-blur-md shadow-xl flex items-center justify-between pointer-events-auto">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-indigo-400 font-semibold">{activeSkill.category}</div>
          <div className="text-base font-bold text-white flex items-center gap-2">
            {activeSkill.name}
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium">
              {activeSkill.level}
            </span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Verified Readiness: <span className="text-emerald-400 font-semibold">{activeSkill.score}%</span></div>
        </div>
        <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-400/30 flex items-center justify-center font-bold text-cyan-300 text-sm">
          {activeSkill.score}
        </div>
      </div>
    </div>
  );
};
