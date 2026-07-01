/**
 * Studly API Service
 * All API calls go through here.
 */

const API_BASE = '/api';

function getHeaders(token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

async function request(endpoint, options = {}) {
  const { method = 'GET', body, token } = options;
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers: getHeaders(token),
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  } catch (err) {
    throw err;
  }
}

// ─── Auth ───
export const authApi = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  signup: (data) => request('/auth/signup', { method: 'POST', body: data }),
  forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: { email } }),
};

// ─── Progress ───
export const progressApi = {
  stats: (token) => request('/progress/stats', { token }),
  game: (token) => request('/progress/game', { token }),
  subjects: (token) => request('/progress/subjects', { token }),
  topics: (token) => request('/progress/topics', { token }),
};

// ─── Study ───
export const studyApi = {
  start: (topicId, token) => request('/study/start', { method: 'POST', body: { topicId }, token }),
  nextStep: (sessionId, token) => request(`/study/${sessionId}/next`, { token }),
  completeStep: (sessionId, body, token) => request(`/study/${sessionId}/complete`, { method: 'POST', body, token }),
};

// ─── Quiz ───
export const quizApi = {
  get: (sessionId, token) => request(`/quiz/${sessionId}`, { token }),
  submit: (data, token) => request('/quiz/submit', { method: 'POST', body: data, token }),
};

// ─── Notes ───
export const notesApi = {
  getAll: (token) => request('/notes', { token }),
  getProvided: (token) => request('/notes/provided', { token }),
};

// ─── Planner ───
export const plannerApi = {
  generate: (availableTime, token) => request('/planner', { method: 'POST', body: { availableTime }, token }),
  today: (token) => request('/planner/today', { token }),
};

// ─── Chat ───
export const chatApi = {
  ask: (message, token) => request('/chat/ask', { method: 'POST', body: { message }, token }),
};

// ─── Notifications ───
export const notifApi = {
  getAll: (token) => request('/notifications?limit=20', { token }),
  markRead: (id, token) => request(`/notifications/${id}/read`, { method: 'PATCH', token }),
  markAllRead: (token) => request('/notifications/all/read', { method: 'PATCH', token }),
  clearAll: (token) => request('/notifications/all', { method: 'DELETE', token }),
};

// ─── Focus ───
export const focusApi = {
  start: (data, token) => request('/focus/start', { method: 'POST', body: data, token }),
  complete: (id, data, token) => request(`/focus/${id}/complete`, { method: 'POST', body: data, token }),
  abandon: (id, data, token) => request(`/focus/${id}/abandon`, { method: 'POST', body: data, token }),
  violation: (id, token) => request(`/focus/${id}/violation`, { method: 'POST', token }),
};

// ─── Videos ───
export const videoApi = {
  getAll: (token) => request('/videos', { token }),
};

// ─── Leaderboard ───
export const leaderboardApi = {
  get: (token) => request('/leaderboard?limit=20', { token }),
};

// ─── Syllabus ───
export const syllabusApi = {
  get: (subject, topic, token) => request(`/syllabus/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}`, { token }),
};

// ─── Community ───
export const communityApi = {
  getAll: (token) => request('/chat', { token }),
  send: (message, token) => request('/chat', { method: 'POST', body: { message }, token }),
  like: (id, token) => request(`/chat/${id}/like`, { method: 'POST', token }),
  reply: (id, message, token) => request(`/chat/${id}/reply`, { method: 'POST', body: { message }, token }),
  delete: (id, token) => request(`/chat/${id}`, { method: 'DELETE', token }),
};
