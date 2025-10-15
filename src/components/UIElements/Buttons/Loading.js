"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import { Typography, Button } from "@mui/material"; 
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';

const Loading = () => {
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: '10px'
          }}
        >
          Loading
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <Button loading variant="outlined" className="for-dark-border">
            Submit
          </Button>

          <Button loading loadingIndicator="Loading…" variant="outlined" className="for-dark-border whiteColor">
            Fetch data
          </Button>

          <Button
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined" 
            className="for-dark-border"
          >
            Save
          </Button>
        </Stack>
      </Card>
    </>
  );
};

export default Loading;
