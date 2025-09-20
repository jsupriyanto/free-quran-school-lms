"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import {
  Editor,
  EditorProvider,
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

const CustomStyles = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  // Editor
  const [value, setValue] = useState("Type your message here...");
  function onChange(e) {
    setValue(e.target.value);
  }

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: "15px",
          }}
        >
          Custom Styles
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                First Name
              </Typography>
              <TextField
                autoComplete="first-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                Email Address
              </Typography>
              <TextField
                autoComplete="email-address"
                name="emailAddress"
                fullWidth
                id="emailAddress"
                label="Email Address"
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                Message
              </Typography>

              <EditorProvider>
                <Editor
                  value={value}
                  onChange={onChange}
                  style={{ minHeight: "200px" }}
                  className="rsw-editor"
                >
                  <Toolbar>
                    <BtnUndo />
                    <BtnRedo />
                    <Separator />
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />
                    <BtnClearFormatting />
                    <HtmlButton />
                    <Separator />
                    <BtnStyles />
                  </Toolbar>
                </Editor>
              </EditorProvider>
            </Grid>

            <Grid size={{ xs: 12 }} textAlign="end">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  textTransform: "capitalize",
                  borderRadius: "8px",
                  fontWeight: "500",
                  fontSize: "13px",
                  padding: "12px 20px",
                  color: "#fff !important",
                }}
              >
                <SendIcon
                  sx={{
                    position: "relative",
                    top: "-2px",
                  }}
                  className="mr-5px"
                />{" "}
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default CustomStyles;
