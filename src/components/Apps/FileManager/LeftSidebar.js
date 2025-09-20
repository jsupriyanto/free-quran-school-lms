"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import styles from "@/components/Apps/FileManager/LeftSidebar.module.css";
import { useParams } from "next/navigation";

// Search field style
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 100,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: 0,
  marginBottom: 15,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginRight: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "#757FEF",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "5",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    backgroundColor: "#F5F7FA",
    borderRadius: "30px",
    padding: theme.spacing(1.4, 0, 1.4, 2),
  },
}));

// Storage Status Progress
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#757FEF" : "#308fe8",
  },
}));

const LeftSidebar = () => {
  const pathname = usePathname();
  const { lang } = useParams();

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          p: "25px 20px",
          mb: "15px",
        }}
      >
        <Typography
          as="h1"
          sx={{
            fontSize: 17,
            fontWeight: 500,
            mb: 1,
          }}
        >
          My Drive
        </Typography>

        {/* Search */}
        <Search className="ls-search-form">
          <SearchIconWrapper className="search-btn">
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search here.."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Nav */}
        <ul className={styles.leftNav}>
          <li>
            <Link
              href={`/${lang}/apps/file-manager/`}
              className={
                pathname == `/${lang}/apps/file-manager/` ? "activeFMLink" : ""
              }
            >
              <i className="ri-folder-line"></i> My Drive
            </Link>

            <ul>
              <li>
                <Link
                  href={`/${lang}/apps/file-manager/assets/`}
                  className={
                    pathname == `/${lang}/apps/file-manager/assets/`
                      ? "activeFMLink"
                      : ""
                  }
                >
                  Assets
                </Link>
              </li>

              <li>
                <Link
                  href={`/${lang}/apps/file-manager/projects/`}
                  className={
                    pathname == `/${lang}/apps/file-manager/projects/`
                      ? "activeFMLink"
                      : ""
                  }
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  href={`/${lang}/apps/file-manager/personal/`}
                  className={
                    pathname == `/${lang}/apps/file-manager/personal/`
                      ? "activeFMLink"
                      : ""
                  }
                >
                  Personal
                </Link>
              </li>

              <li>
                <Link
                  href={`/${lang}/apps/file-manager/templates/`}
                  className={
                    pathname == `/${lang}/apps/file-manager/templates/`
                      ? "activeFMLink"
                      : ""
                  }
                >
                  Templates
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              href={`/${lang}/apps/file-manager/documents/`}
              className={
                pathname == `/${lang}/apps/file-manager/documents/`
                  ? "activeFMLink"
                  : ""
              }
            >
              <i className="ri-file-text-line"></i> Documents
            </Link>
          </li>

          <li>
            <Link
              href={`/${lang}/apps/file-manager/media/`}
              className={
                pathname == `/${lang}/apps/file-manager/media/`
                  ? "activeFMLink"
                  : ""
              }
            >
              <i className="ri-image-line"></i> Media
            </Link>
          </li>

          <li>
            <Link
              href={`/${lang}/apps/file-manager/recents/`}
              className={
                pathname == `/${lang}/apps/file-manager/recents/`
                  ? "activeFMLink"
                  : ""
              }
            >
              <i className="ri-time-line"></i> Recents
            </Link>
          </li>

          <li>
            <Link
              href={`/${lang}/apps/file-manager/important/`}
              className={
                pathname == `/${lang}/apps/file-manager/important/`
                  ? "activeFMLink"
                  : ""
              }
            >
              <i className="ri-star-fill"></i> Important
            </Link>
          </li>

          <li>
            <Link
              href={`/${lang}/apps/file-manager/trash/`}
              className={
                pathname == `/${lang}/apps/file-manager/trash/`
                  ? "activeFMLink"
                  : ""
              }
            >
              <i className="ri-delete-bin-line"></i> Trash
            </Link>
          </li>
        </ul>

        {/* Storage status */}
        <Box>
          <Typography fontSize="14px" fontWeight="500" mb="5px">
            Storage Status
          </Typography>

          <BorderLinearProgress variant="determinate" value={60} />

          <Typography fontSize="12px" mt="5px" color="#A9A9C8">
            186.5 GB Used of 120 GB
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default LeftSidebar;
