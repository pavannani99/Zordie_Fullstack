import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config';

// Types
export interface User {
  id: number;
  email: string;
  full_name?: string;
  is_active: boolean;
  is_superuser: boolean;
  clerk_id?: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary_min?: number;
  salary_max?: number;
  status: string;
  job_type: string;
  experience_level: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface JobApplication {
  id: number;
  job_id: number;
  user_id: number;
  cover_letter?: string;
  resume_url?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await api.post(API_ENDPOINTS.LOGIN, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.user_id,
        email: response.data.email,
        full_name: response.data.full_name
      }));
    }
    
    return response.data;
  },
  
  loginWithClerk: async (clerkToken: string) => {
    const response = await api.post(API_ENDPOINTS.CLERK_AUTH, { clerk_token: clerkToken });
    
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.user_id,
        email: response.data.email,
        full_name: response.data.full_name
      }));
    }
    
    return response.data;
  },
  
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;
    
    try {
      const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN, { refresh_token: refreshToken });
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // If refresh token is invalid, logout the user
      authApi.logout();
      return null;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },
  
  register: async (userData: { email: string; password: string; full_name?: string }) => {
    return await api.post(API_ENDPOINTS.USERS, userData);
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get(API_ENDPOINTS.USER_ME);
    return response.data;
  },
};

// Jobs API
export const jobsApi = {
  getJobs: async (skip = 0, limit = 20): Promise<Job[]> => {
    const response = await api.get(`${API_ENDPOINTS.JOBS}?skip=${skip}&limit=${limit}`);
    return response.data;
  },
  
  getJob: async (id: number): Promise<Job> => {
    const response = await api.get(`${API_ENDPOINTS.JOBS}/${id}`);
    return response.data;
  },
  
  createJob: async (jobData: Omit<Job, 'id' | 'created_at' | 'updated_at' | 'user_id'>): Promise<Job> => {
    const response = await api.post(API_ENDPOINTS.JOBS, jobData);
    return response.data;
  },
  
  updateJob: async (id: number, jobData: Partial<Job>): Promise<Job> => {
    const response = await api.put(`${API_ENDPOINTS.JOBS}/${id}`, jobData);
    return response.data;
  },
  
  deleteJob: async (id: number): Promise<Job> => {
    const response = await api.delete(`${API_ENDPOINTS.JOBS}/${id}`);
    return response.data;
  },
  
  searchJobs: async (query: string, skip = 0, limit = 20): Promise<Job[]> => {
    const response = await api.get(`${API_ENDPOINTS.JOBS_SEARCH}?query=${query}&skip=${skip}&limit=${limit}`);
    return response.data;
  },
  
  getMyJobs: async (skip = 0, limit = 20): Promise<Job[]> => {
    const response = await api.get(`${API_ENDPOINTS.MY_JOBS}?skip=${skip}&limit=${limit}`);
    return response.data;
  },
};

// Applications API
export const applicationsApi = {
  getMyApplications: async (skip = 0, limit = 20): Promise<JobApplication[]> => {
    const response = await api.get(`${API_ENDPOINTS.MY_APPLICATIONS}?skip=${skip}&limit=${limit}`);
    return response.data;
  },
  
  getApplicationsForJob: async (jobId: number, skip = 0, limit = 20): Promise<JobApplication[]> => {
    const response = await api.get(`${API_ENDPOINTS.APPLICATIONS}/job/${jobId}?skip=${skip}&limit=${limit}`);
    return response.data;
  },
  
  getApplication: async (id: number): Promise<JobApplication> => {
    const response = await api.get(`${API_ENDPOINTS.APPLICATIONS}/${id}`);
    return response.data;
  },
  
  createApplication: async (applicationData: { job_id: number, cover_letter?: string, resume_url?: string }): Promise<JobApplication> => {
    const response = await api.post(API_ENDPOINTS.APPLICATIONS, applicationData);
    return response.data;
  },
  
  updateApplication: async (id: number, applicationData: Partial<JobApplication>): Promise<JobApplication> => {
    const response = await api.put(`${API_ENDPOINTS.APPLICATIONS}/${id}`, applicationData);
    return response.data;
  },
  
  deleteApplication: async (id: number): Promise<JobApplication> => {
    const response = await api.delete(`${API_ENDPOINTS.APPLICATIONS}/${id}`);
    return response.data;
  },
};

export default api;
