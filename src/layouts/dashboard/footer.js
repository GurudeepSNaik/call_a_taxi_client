import React from "react";
import { alpha } from "@mui/material/styles";
import { Avatar, Box, IconButton, Stack, SvgIcon, useMediaQuery } from "@mui/material";
const SIDE_NAV_WIDTH = 280;
const FOOTER_HEIGHT = 20;
const Footer = () => {
  return (
    <div>
      <>
        <Box
          component="header"
          sx={{
            backdropFilter: "blur(6px)",
            backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
            position: "sticky",
            zIndex: (theme) => theme.zIndex.appBar,
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              minHeight: FOOTER_HEIGHT,
              px: 2,
            }}
          >
            <Stack alignItems="center" direction="row" spacing={2}>
              <span>&copy; 2023 CALL A TAXI.</span>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={1}>
              <span>Powered by</span>
              <a href="https://sanshtech.ca/" target="_blank" rel="noopener noreferrer">
                Sansh Tech
              </a>
            </Stack>
          </Stack>
        </Box>
      </>
    </div>
  );
};

export default Footer;
