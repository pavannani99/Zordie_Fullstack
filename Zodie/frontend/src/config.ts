// API configuration
export const API_URL = 'http://localhost:8000';
export const API_BASE_URL = `${API_URL}/api/v1`;

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/login/access-token`,
  REFRESH_TOKEN: `${API_BASE_URL}/login/refresh-token`,
  CLERK_AUTH: `${API_BASE_URL}/login/clerk-auth`,
  TEST_TOKEN: `${API_BASE_URL}/login/test-token`,
  
  // Users
  USERS: `${API_BASE_URL}/users`,
  USER_ME: `${API_BASE_URL}/users/me`,
  
  // Profile
  PROFILE: `${API_BASE_URL}/profile`,
  PROFILE_ME: `${API_BASE_URL}/profile/me`,
  
  // Jobs
  JOBS: `${API_BASE_URL}/jobs`,
  JOBS_SEARCH: `${API_BASE_URL}/jobs/search`,
  MY_JOBS: `${API_BASE_URL}/jobs/my-jobs`,
  
  // Applications
  APPLICATIONS: `${API_BASE_URL}/applications`,
  MY_APPLICATIONS: `${API_BASE_URL}/applications/my-applications`,
};

// Clerk configuration
export const CLERK_PUBLISHABLE_KEY = 'pk_test_Y2xlcmsuem9kaWUuZGV2JA'; // Replace with your actual Clerk publishable key
