"use client";

import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import Image from "next/image";

export default function UserAccessDenied() {
  const router = useRouter();

  const handleSignOut = () => {
    authService.signout();
    router.push('/authentication/sign-in');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
        backgroundColor: '#f5f5f5'
      }}
    >
      <Card sx={{ maxWidth: 500, textAlign: 'center', padding: 3 }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Image
              src="/assets/img/logo.png"
              alt="Logo"
              width={150}
              height={50}
            />
          </Box>
          
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Access Restricted
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Your user account does not have permission to access the main application. 
            This system is designed for teachers and administrators only.
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
            If you believe this is an error, please contact your administrator 
            to upgrade your account permissions.
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSignOut}
            sx={{ 
              mt: 2,
              padding: '10px 30px',
              borderRadius: '8px'
            }}
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}