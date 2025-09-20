"use client";

import React, { useState } from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
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

const EditorArea = () => {
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
          Editor
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
      </Card>
    </>
  );
};

export default EditorArea;
