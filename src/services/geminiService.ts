/**
 * Gemini AI Client Service
 * Calls server-side proxy endpoints to execute AI tasks safely with @google/genai
 */

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export async function askGemini(params: {
  prompt: string;
  model?: string;
  systemInstruction?: string;
  responseMimeType?: string;
}): Promise<string> {
  const res = await fetch('/api/gemini/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: params.prompt,
      model: params.model || 'gemini-3.8-flash',
      systemInstruction: params.systemInstruction,
      responseMimeType: params.responseMimeType,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to generate response from Gemini API');
  }
  return data.text;
}

export async function chatWithGemini(params: {
  message: string;
  history: ChatMessage[];
  model?: string;
  systemInstruction?: string;
}): Promise<string> {
  const res = await fetch('/api/gemini/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: params.message,
      history: params.history,
      model: params.model || 'gemini-3.8-flash',
      systemInstruction: params.systemInstruction,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to complete chat turn with Gemini');
  }
  return data.text;
}

export async function generateCareerImage(params: {
  prompt: string;
  imageSize?: '1K' | '2K' | '4K';
  aspectRatio?: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
  model?: string;
}): Promise<{ imageUrl: string; textInfo?: string }> {
  const res = await fetch('/api/gemini/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: params.prompt,
      imageSize: params.imageSize || '1K',
      aspectRatio: params.aspectRatio || '1:1',
      model: params.model || 'gemini-3-pro-image',
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to generate image via Gemini');
  }
  return {
    imageUrl: data.imageUrl,
    textInfo: data.textInfo,
  };
}

import { AgentRole } from '../types/agents';

export async function deliberateAgentTask(params: {
  agentRole: AgentRole;
  taskDescription: string;
  projectContext?: string;
}): Promise<string> {
  const res = await fetch('/api/agent/deliberate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Agent deliberation failed');
  }
  return data.assessment;
}
