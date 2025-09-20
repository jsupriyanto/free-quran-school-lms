"use client";

import React from "react";
import { Stack, Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Stack
        sx={{
          backgroundColor: "#fff",
          p: "25px",
          borderRadius: "10px 10px 0 0",
          textAlign: "center",
          mt: "15px"
        }}
        className="footer"
      >
        <Box>
          <Typography>
            Copyright  {' '}
            <strong>Free Quran School</strong> is proudly managed by {' '}
            <Link
              href="https://www.jariyah.us/"
              target="_blank" 
              underline="none"
              rel="noreferrer"
            >
              Jariyah Foundation Inc.
            </Link>
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default Footer;
