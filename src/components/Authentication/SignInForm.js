"use client";

import React, { useState } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "@/components/Authentication/Authentication.module.css";
import Image from "next/image";
import authService from "@/services/auth.service";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormLoading(true);
    const data = new FormData(event.currentTarget);
    
    authService.signin(data.get("email"), data.get("password"))
      .then(response => {
        router.push('/');
      })
      .catch(error => {
        alert("Login failed: " + (error.response?.data?.message || error.message));
      })
      .finally(() => {
        setIsFormLoading(false);
      });
  };

  // use next-auth for authentication with google
  const handleSignIn = async (provider) => {
    if (isOAuthLoading) return; // Prevent multiple clicks
    authService.setThirdPartySignInProgress(true);
    setIsOAuthLoading(true);
    try {
      const result = await signIn(provider, { redirect: false });
      
      if (result?.error) {
        authService.setThirdPartySignInProgress(false);
        alert("OAuth Sign-in failed: " + result.error);
      } else if (result?.ok) {
        authService.setThirdPartySignInProgress(false);
        // Let the AuthProvider handle the redirect
        // Don't call setIsOAuthLoading(false) here as the page will redirect
      }
    } catch (error) {
      authService.setThirdPartySignInProgress(false);
      alert("OAuth Sign-in failed: " + (error.response?.data?.message || error.message));
      setIsOAuthLoading(false);
    }
  };

  return (
    <>
      <div className="authenticationBox">
        <Box
          component="main"
          sx={{
            maxWidth: "510px",
            ml: "auto",
            mr: "auto",
            padding: "50px 0 100px",
          }}
        >
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <Box>
              <Typography as="h1" fontSize="28px" fontWeight="700" mb="5px">
                Sign In{" "}
                <Image
                  src="/images/free-quran-school.jpg"
                  alt="free quran school"
                  className={styles.favicon}
                  width={120}
                  height={120}
                />
              </Typography>

              <Typography fontSize="15px" mb="30px">
                Already have an account?{" "}
                <Link
                  href="/authentication/sign-up"
                  className="primaryColor text-decoration-none"
                >
                  Sign up
                </Link>
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: "30px",
                }}
              >
                <Link href="#" className={styles.googleBtn} onClick={() => handleSignIn("google")}>
                  <Image src="/images/google-icon.png" width={20} height={20} alt="Google icon" />
                  {isOAuthLoading ? "Signing in..." : "Sign in with Google"}
                </Link>

                <Link href="#" className={styles.fbBtn} onClick={() => handleSignIn("facebook")}>
                  <Image src="/images/fb-icon.png" width={20} height={20} alt="Facebook icon" />
                  {isOAuthLoading ? "Signing in..." : "Sign in with Facebook"}
                </Link>
              </Box>

              <div className={styles.or}>
                <span>or</span>
              </div>

              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Box
                  sx={{
                    background: "#fff",
                    padding: "30px 20px",
                    borderRadius: "10px",
                    mb: "20px",
                  }}
                  className="bg-black"
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        Email
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        InputProps={{
                          style: { borderRadius: 8 },
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        Password
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        InputProps={{
                          style: { borderRadius: 8 },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Grid container alignItems="center" spacing={2}>
                  <Grid size={{ xs: 6, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Remember me."
                    />
                  </Grid>

                  <Grid size={{ xs: 6, sm: 6 }} textAlign="end">
                    <Link
                      href="/authentication/forgot-password"
                      className="primaryColor text-decoration-none"
                    >
                      Forgot your password?
                    </Link>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isFormLoading || isOAuthLoading}
                  sx={{
                    mt: 2,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "12px 10px",
                    color: "#fff !important",
                  }}
                >
                  {isFormLoading ? "Signing In..." : "Sign In"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default SignInForm;
