import React, { ReactNode } from "react";
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
  FolderShared as FolderSharedIcon,
  History as HistoryIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
} from "../mui/mui-icons";
import Link from "next/link";
const drawerWidth = 240;

interface ClippedDrawerProps {
  children: React.ReactNode;
}

export default function ClippedDrawer({ children }: ClippedDrawerProps) {
  const nav = [
    { label: "Declaration", url: "/declaration", icon: <MailIcon /> },
    { label: "Documents", url: "/documents", icon: <FolderSharedIcon /> },
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
