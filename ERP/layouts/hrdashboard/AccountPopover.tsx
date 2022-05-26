import { useRef, useState } from "react";
import NextLink from "next/link";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// components
import Iconify from "@components/Iconify";
import MenuPopover from "@components/MenuPopover";
// mock data
import account from "@_mocks_/account";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "mdi:home",
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: "mdi:account",
    linkTo: "/hr/profile",
  },
  {
    label: "Settings",
    icon: "mdi:cog",
    linkTo: "/dashboard/settings",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <NextLink key={option.label} href={option.linkTo} passHref>
            <MenuItem sx={{ typography: "body2", py: 1, px: 2.5 }}>
              <ListItemIcon>
                <Iconify
                  icon={option.icon}
                  sx={{
                    mr: 2,
                    width: 24,
                    height: 24,
                  }}
                />
              </ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
          </NextLink>
        ))}
        <Box sx={{ p: 2, pt: 1.5 }}>
          <NextLink href="/" passHref>
            <Button fullWidth color="inherit" variant="outlined">
              Logout
            </Button>
          </NextLink>
        </Box>
      </MenuPopover>
    </>
  );
}
