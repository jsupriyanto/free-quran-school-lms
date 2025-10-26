"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";
import styles from "@/components/Email/LeftSidebar.module.css";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useParams } from "next/navigation";
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

// Compose Modal
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
// End Compose Modal

const LeftSidebar = () => {
  const pathname = usePathname();

  // Compose modal
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Handle form submission here
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  };
  // End Compose Modal

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
          p: "25px 20px",
          mb: "15px",
        }}
      >
        <Button
          onClick={handleClickOpen}
          variant="contained"
          fullWidth
          sx={{
            textTransform: "capitalize",
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "14px",
            padding: "12px 20px",
            mb: "30px",
            color: "#fff !important",
          }}
        >
          Compose
        </Button>

        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "13px",
            color: "#A9A9C8",
            mb: "10px",
          }}
        >
          mailbox
        </Typography>

        {/* Nav */}
        <ul className={styles.leftNav}>
          <li>
            <Link
              href={`/email/inbox/`}
              className={
                pathname == `/email/inbox/` ? styles.active : ""
              }
            >
              <span>
                <i className="ri-mail-line"></i> Inbox
              </span>
              <Badge
                badgeContent={4}
                color="primary"
                sx={{
                  position: "relative",
                  top: "15px",
                }}
                className="float-right right-10px for-dark-text-white"
              ></Badge>
            </Link>
          </li>

          <li>
            <Link
              href={`/#`}
              className={pathname == `/#` ? styles.FormDataactive : ""}
            >
              <i className="ri-star-fill"></i> Important
            </Link>
          </li>

          <li>
            <Link href="#" className={pathname == "#" ? styles.active : ""}>
              <i className="ri-time-line"></i> Snooozed
            </Link>
          </li>

          <li>
            <Link href="#" className={pathname == "#" ? styles.active : ""}>
              <i className="ri-file-text-line"></i> Draft
              <Badge
                badgeContent={4}
                color="info"
                sx={{
                  position: "relative",
                  top: "15px",
                }}
                className="float-right right-10px for-dark-text-white"
              ></Badge>
            </Link>
          </li>

          <li>
            <Link href="#" className={pathname == "#" ? styles.active : ""}>
              <i className="ri-send-plane-2-line"></i> Sent Mail
            </Link>
          </li>

          <li>
            <Link href="#" className={pathname == "#" ? styles.active : ""}>
              <i className="ri-error-warning-line"></i> Spam
              <Badge
                badgeContent={4}
                color="danger"
                sx={{
                  position: "relative",
                  top: "15px",
                  color: "#fff",
                }}
                className="float-right right-10px for-dark-text-white"
              ></Badge>
            </Link>
          </li>

          <li>
            <Link href="#" className={pathname == "#" ? styles.active : ""}>
              <i className="ri-delete-bin-line"></i> Trash
            </Link>
          </li>
        </ul>

        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "13px",
            color: "#A9A9C8",
            mb: "10px",
          }}
        >
          labels
        </Typography>

        {/* Nav */}
        <ul className={styles.leftNav}>
          <li>
            <Link href="#" className={pathname == "#" ? styles.active : ""}>
              <span>
                <i className="ri-price-tag-3-line"></i> Personal
              </span>
            </Link>
          </li>

          <li>
            <Link href="#" className={pathname == "#" ? styles.active : ""}>
              <i className="ri-price-tag-3-line"></i> Company
            </Link>
          </li>

          <li>
            <Link href="#" className={pathname == "#" ? styles.active : ""}>
              <i className="ri-price-tag-3-line"></i> Wallet Balance
            </Link>
          </li>

          <li>
            <Link href="#" className={pathname == "#" ? styles.active : ""}>
              <i className="ri-price-tag-3-line"></i> Friends
            </Link>
          </li>

          <li>
            <Link href="#" className={pathname == "#" ? styles.active : ""}>
              <i className="ri-price-tag-3-line"></i> Family
            </Link>
          </li>
        </ul>
      </Card>

      {/* Compose Modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#EDEFF5",
              borderRadius: "8px",
              padding: "15px 20px",
            }}
            className="bg-black"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              New Message
            </Typography>

            <IconButton
              aria-label="remove"
              size="small"
              onClick={handleClose}
              className="modal-close"
            >
              <ClearIcon />
            </IconButton>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Box
              sx={{
                background: "#fff",
                padding: "30px 20px",
                borderRadius: "8px",
              }}
              className="dark-BG-101010"
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <TextField
                    autoComplete="to"
                    name="to"
                    required
                    fullWidth
                    id="to"
                    label="To"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <TextField
                    autoComplete="subject"
                    name="subject"
                    required
                    fullWidth
                    id="subject"
                    label="Subject"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
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
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </BootstrapDialog>
    </>
  );
};

export default LeftSidebar;
