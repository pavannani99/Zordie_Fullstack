import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { authApi } from '../../lib/api';

interface ClerkAuthProps {
  children: React.ReactNode;
}

export const ClerkAuth: React.FC<ClerkAuthProps> = ({ children }) => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    // Function to authenticate with backend
    const authenticateWithBackend = async () => {
      try {
        if (isSignedIn && user) {
          // Get session token from Clerk
          const token = await getToken();
          
          if (token) {
            // Authenticate with our backend using Clerk token
            await authApi.loginWithClerk(token);
            console.log('Successfully authenticated with backend');
          }
        }
      } catch (error) {
        console.error('Error authenticating with backend:', error);
      }
    };

    if (isLoaded && isSignedIn) {
      authenticateWithBackend();
    } else if (isLoaded && !isSignedIn) {
      // If user is not signed in, clear any stored tokens
      authApi.logout();
    }
  }, [isLoaded, isSignedIn, user, getToken]);

  return <>{children}</>;
};

export default ClerkAuth;
