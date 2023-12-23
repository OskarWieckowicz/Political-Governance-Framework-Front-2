"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Collapse,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import styles from "./navbar.module.css";
import {
  AccountBalance as AccountBalanceIcon,
  ExpandLess,
  ExpandMore,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  StarBorder,
} from "../mui/mui-icons";
import PaymentIcon from "@mui/icons-material/Payment";
import SavingsIcon from "@mui/icons-material/Savings";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const drawerWidth = 240;
import {
  FolderShared as FolderSharedIcon,
  History as HistoryIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
} from "../mui/mui-icons";
interface Props {
  children: ReactNode;
}

const pages = [
  {
    label: "Tax Return",
    icon: <AttachMoneyIcon />,
    nested: [
      { label: "Declaration", link: "/declaration", icon: <MailIcon /> },
      { label: "Documents", link: "/documents", icon: <FolderSharedIcon /> },
      { label: "History", link: "/history", icon: <HistoryIcon /> },
    ],
  },
  {
    label: "Tax Beneficiaries",
    link: "/tax-beneficiaries",
    icon: <SavingsIcon />,
  },
  { label: "Payment", link: "/payment", icon: <PaymentIcon /> },
];

export default function Navbar(props: Props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [openNestedNav, setOpenNestedNav] = useState(false);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }
  }, [session]);

  const router = useRouter();
  const pathName = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePageNav = (url: string) => {
    router.push(url);
    handleDrawerToggle();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNestedNavClick = () => {
    setOpenNestedNav(!openNestedNav);
  };

  const drawer = (
    <div>
      <Link href="/">
        <Toolbar>
          <AccountBalanceIcon sx={{ mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            PGF
          </Typography>
        </Toolbar>
      </Link>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.label} disablePadding sx={{ display: "block" }}>
            {page.nested ? (
              <>
                <ListItemButton
                  onClick={handleNestedNavClick}
                  selected={pathName === page.link}
                >
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.label} />
                  {openNestedNav ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openNestedNav} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {page.nested.map((nestedPage) => (
                      <ListItemButton
                        sx={{ pl: 4 }}
                        key={nestedPage.label}
                        onClick={(e) => handlePageNav(nestedPage.link)}
                        selected={pathName === nestedPage.link}
                      >
                        <ListItemIcon>{nestedPage.icon}</ListItemIcon>
                        <ListItemText primary={nestedPage.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItemButton onClick={(e) => handlePageNav(page.link)}>
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.label} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{ justifyContent: { xs: "space-between", sm: "flex-end" } }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Tooltip title="Open settings">
              <Button
                variant="contained"
                onClick={handleOpenUserMenu}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {session?.user?.email || "email"}
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                className={pathName === "/profile" ? styles.active2 : ""}
              >
                <Link href="/profile">
                  <Typography textAlign="center">Profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
              <MenuItem onClick={() => signOut()}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: 3,
          paddingLeft: { sm: 3, sx: 0 },
          paddingRight: { sm: 3, sx: 0 },
          width: { sm: `calc(100% - ${drawerWidth}px)`, xs: "100%" },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
