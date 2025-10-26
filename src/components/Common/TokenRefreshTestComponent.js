"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import authService from '@/services/auth.service';

export default function TokenRefreshTestComponent() {
  const { data: session, status } = useSession();
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [...prev, { message, type, timestamp }]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const testCurrentUser = async () => {
    try {
      const user = authService.getCurrentUser();
      if (user) {
        addTestResult(`Current user found: ${user.email || 'No email'}`, 'success');
        addTestResult(`Token type: ${user.oauthProvider ? `OAuth (${user.oauthProvider})` : 'Regular JWT'}`, 'info');
        addTestResult(`Has refresh token: ${!!user.refreshToken || !!user.oauthRefreshToken}`, 'info');
        
        if (user.accessToken) {
          const isExpiring = authService.isTokenExpiringSoon(user.accessToken, 5);
          addTestResult(`Token expiring soon (5min): ${isExpiring}`, isExpiring ? 'warning' : 'success');
        }
      } else {
        addTestResult('No current user found', 'error');
      }
    } catch (error) {
      addTestResult(`Error getting current user: ${error.message}`, 'error');
    }
  };

  const testTokenRefresh = async () => {
    setIsLoading(true);
    try {
      addTestResult('Attempting token refresh...', 'info');
      const refreshedUser = await authService.refreshToken();
      addTestResult('Token refresh successful!', 'success');
      addTestResult(`New token length: ${refreshedUser.accessToken?.length || 0}`, 'info');
    } catch (error) {
      addTestResult(`Token refresh failed: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const testEnsureValidToken = async () => {
    setIsLoading(true);
    try {
      addTestResult('Ensuring valid token...', 'info');
      const user = await authService.ensureValidToken();
      addTestResult('Valid token ensured!', 'success');
      addTestResult(`User email: ${user.email || 'No email'}`, 'info');
    } catch (error) {
      addTestResult(`Ensure valid token failed: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const testApiCall = async () => {
    setIsLoading(true);
    try {
      addTestResult('Making test API call...', 'info');
      // Import http service to test with interceptors
      const { default: http } = await import('@/services/http-common');
      const response = await http.get('/test-endpoint-that-might-not-exist');
      addTestResult('API call successful (unexpected!)', 'success');
    } catch (error) {
      if (error.response?.status === 401) {
        addTestResult('Got 401 - token refresh should have been attempted', 'warning');
      } else if (error.response?.status === 404) {
        addTestResult('Got 404 - endpoint not found (expected), but auth worked', 'info');
      } else {
        addTestResult(`API call failed: ${error.message}`, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const simulateExpiredToken = () => {
    try {
      const user = authService.getCurrentUser();
      if (user && user.accessToken) {
        // Decode JWT and modify expiry
        const parts = user.accessToken.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          payload.exp = Math.floor(Date.now() / 1000) - 3600; // Expired 1 hour ago
          
          const modifiedToken = parts[0] + '.' + btoa(JSON.stringify(payload)) + '.' + parts[2];
          const modifiedUser = { ...user, accessToken: modifiedToken };
          
          localStorage.setItem('user', JSON.stringify(modifiedUser));
          addTestResult('Token artificially expired for testing', 'warning');
        } else {
          addTestResult('Could not parse JWT token', 'error');
        }
      } else {
        addTestResult('No user or token to expire', 'error');
      }
    } catch (error) {
      addTestResult(`Error simulating expired token: ${error.message}`, 'error');
    }
  };

  const getResultColor = (type) => {
    switch (type) {
      case 'success': return 'green';
      case 'error': return 'red';
      case 'warning': return 'orange';
      default: return 'black';
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Token Refresh Testing Component
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Session Info:</Typography>
          <Typography>Status: {status}</Typography>
          <Typography>Email: {session?.user?.email || 'None'}</Typography>
          <Typography>Provider: {session?.user?.oauthProvider || 'None'}</Typography>
          <Typography>Has Access Token: {!!session?.user?.accessToken}</Typography>
          {session?.error && (
            <Typography color="error">Session Error: {session.error}</Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          <Button 
            variant="outlined" 
            onClick={testCurrentUser}
            disabled={isLoading}
          >
            Test Current User
          </Button>
          <Button 
            variant="outlined" 
            onClick={testTokenRefresh}
            disabled={isLoading}
          >
            Test Token Refresh
          </Button>
          <Button 
            variant="outlined" 
            onClick={testEnsureValidToken}
            disabled={isLoading}
          >
            Test Ensure Valid Token
          </Button>
          <Button 
            variant="outlined" 
            onClick={testApiCall}
            disabled={isLoading}
          >
            Test API Call
          </Button>
          <Button 
            variant="outlined" 
            onClick={simulateExpiredToken}
            disabled={isLoading}
            color="warning"
          >
            Simulate Expired Token
          </Button>
          <Button 
            variant="outlined" 
            onClick={clearResults}
            disabled={isLoading}
          >
            Clear Results
          </Button>
        </Box>

        <Box sx={{ maxHeight: 400, overflow: 'auto', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>Test Results:</Typography>
          {testResults.length === 0 ? (
            <Typography color="text.secondary">No test results yet. Click a test button above.</Typography>
          ) : (
            testResults.map((result, index) => (
              <Typography 
                key={index} 
                sx={{ 
                  color: getResultColor(result.type),
                  fontFamily: 'monospace',
                  fontSize: '0.9em',
                  mb: 0.5
                }}
              >
                [{result.timestamp}] {result.message}
              </Typography>
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
}