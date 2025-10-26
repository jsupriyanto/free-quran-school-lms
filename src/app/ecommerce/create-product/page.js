"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PageTitle from "@/components/Common/PageTitle";
import Image from "next/image";
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

export default function Page() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Handle form submission here
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  };

  // Select dropdown
  const [categorySelect, setCategorySelect] = React.useState("");
  const handleChange = (event) => {
    setCategorySelect(event.target.value);
  };

  // Editor
  const [value, setValue] = useState("Type your message here...");
  function onChange(e) {
    setValue(e.target.value);
  }

  return (
    <>
      <PageTitle
        pageTitle="Create Product"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            background: "#fff",
            padding: "30px 20px",
            borderRadius: "8px",
            mb: "15px",
          }}
          className="bg-black"
        >
          <Typography as="h4" fontWeight="500" fontSize="18px" mb="10px">
            Create Product
          </Typography>

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
                Product Name
              </Typography>
              <TextField
                autoComplete="product-name"
                name="productName"
                required
                fullWidth
                id="productName"
                label="Product Name"
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
                Short Description
              </Typography>
              <TextField
                autoComplete="short-description"
                name="Short Description"
                required
                fullWidth
                id="Short Description"
                label="Short Description"
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
                Category
              </Typography>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categorySelect}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Laptop</MenuItem>
                  <MenuItem value={20}>Camera</MenuItem>
                  <MenuItem value={30}>Smart Watch</MenuItem>
                  <MenuItem value={30}>iPhone</MenuItem>
                </Select>
              </FormControl>
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
                Price
              </Typography>
              <TextField
                autoComplete="price"
                name="price"
                required
                fullWidth
                id="price"
                label="$0"
                type="number"
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
                Discount Price
              </Typography>
              <TextField
                autoComplete="discount-price"
                name="DiscountPrice"
                required
                fullWidth
                id="DiscountPrice"
                label="$0"
                type="number"
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
                Stock
              </Typography>
              <TextField
                autoComplete="stock"
                name="stock"
                required
                fullWidth
                id="stock"
                label="5"
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
                Product Description
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

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                Meta Title
              </Typography>
              <TextField
                autoComplete="meta-title"
                name="metaTitle"
                required
                fullWidth
                id="metaTitle"
                label="Meta Title"
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
                Meta Keywords
              </Typography>
              <TextField
                autoComplete="meta-keywords"
                name="metaKeywords"
                required
                fullWidth
                id="metaKeywords"
                label="Meta Keywords"
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
                Meta Description
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

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                Product Image
              </Typography>
              <TextField
                autoComplete="product-image"
                name="productImage"
                required
                fullWidth
                id="productImage"
                type="file"
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />

              <Box
                sx={{
                  mt: "15px",
                }}
              >
                <Image
                  src="/images/product1.png"
                  alt="product"
                  width={55}
                  height={55}
                  className="mr-10px"
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }} textAlign="end">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "8px",
                  fontWeight: "500",
                  fontSize: "13px",
                  padding: "12px 20px",
                  color: "#fff !important",
                }}
              >
                <AddIcon
                  sx={{
                    position: "relative",
                    top: "-2px",
                  }}
                  className="mr-5px"
                />{" "}
                Create Product
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
