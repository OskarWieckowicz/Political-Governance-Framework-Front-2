"use client";
import React, { ReactNode } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "../mui/mui";
import {
  FolderShared as FolderSharedIcon,
  History as HistoryIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
} from "../mui/mui-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
const drawerWidth = 240;
import styles from "./drawer.module.css";
interface ClippedDrawerProps {
  children: React.ReactNode;
}

export default function ClippedDrawer({ children }: ClippedDrawerProps) {
  const pathName = usePathname();
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
            {nav.map((text) => (
              <Link key={text.label} href={text.url}>
                <ListItem
                  key={text.label}
                  disablePadding
                  className={pathName === text.url ? styles.active : ""}
                >
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
