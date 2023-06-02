import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "../mui/mui";
import {
  FolderSharedIcon,
  HistoryIcon,
  InboxIcon,
  MailIcon,
} from "../mui/mui-icons";
import Link from "next/link";
const drawerWidth = 240;

export default function ClippedDrawer({ children }) {
  const nav = [
    { label: "Documents", url: "/documents", icon: <FolderSharedIcon /> },
    { label: "Declaration", url: "/declaration", icon: <MailIcon /> },
    { label: "History", url: "/history", icon: <HistoryIcon /> },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {nav.map((text, index) => (
              <Link key={text.label} href={text.url}>
                <ListItem key={text.label} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{text.icon}</ListItemIcon>
                    <ListItemText primary={text.label} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
