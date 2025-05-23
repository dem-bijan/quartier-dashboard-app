
/**
 * Base API service to communicate with backend
 */
const API_BASE_URL = 'http://localhost:5000';

/**
 * Generic request function
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }
    
    // For 204 No Content responses
    if (response.status === 204) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
}

/**
 * Auth API Service
 */
export const authAPI = {
  login: (credentials) => request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  logout: () => request('/api/auth/logout', {
    method: 'POST',
  }),
};

/**
 * Residents API Service
 */
export const residentsAPI = {
  getAll: () => request('/api/residents'),
  
  getById: (id) => request(`/api/residents/${id}`),
  
  create: (data) => request('/api/residents', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id, data) => request(`/api/residents/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id) => request(`/api/residents/${id}`, {
    method: 'DELETE',
  }),
};

/**
 * Messages API Service
 */
export const messagesAPI = {
  getAll: () => request('/api/messages'),
  
  getById: (id) => request(`/api/messages/${id}`),
  
  create: (data) => request('/api/messages', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

/**
 * Repairs API Service
 */
export const repairsAPI = {
  getAll: () => request('/api/repairs'),
  
  getById: (id) => request(`/api/repairs/${id}`),
  
  create: (data) => request('/api/repairs', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id, data) => request(`/api/repairs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id) => request(`/api/repairs/${id}`, {
    method: 'DELETE',
  }),
};

/**
 * Invoices API Service
 */
export const invoicesAPI = {
  getAll: () => request('/api/invoices'),
  
  getById: (id) => request(`/api/invoices/${id}`),
  
  create: (data) => request('/api/invoices', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id, data) => request(`/api/invoices/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

/**
 * Staff API Service
 */
export const staffAPI = {
  getAll: () => request('/api/staff'),
  
  getById: (id) => request(`/api/staff/${id}`),
  
  create: (data) => request('/api/staff', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id, data) => request(`/api/staff/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id) => request(`/api/staff/${id}`, {
    method: 'DELETE',
  }),
};

/**
 * Meetings API Service
 */
export const meetingsAPI = {
  getAll: () => request('/api/meetings'),
  
  getById: (id) => request(`/api/meetings/${id}`),
  
  create: (data) => request('/api/meetings', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id, data) => request(`/api/meetings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id) => request(`/api/meetings/${id}`, {
    method: 'DELETE',
  }),
};
