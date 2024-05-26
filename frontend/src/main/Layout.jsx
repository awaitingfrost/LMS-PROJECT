
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuBook from '@material-ui/icons/MenuBook';
import Receipt from '@material-ui/icons/Receipt';
import AddBox from '@material-ui/icons/AddBox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import History from '@material-ui/icons/History';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import Group from '@material-ui/icons/Group';
import GroupAddTwoTone from '@material-ui/icons/GroupAddTwoTone';
import ViewList from '@material-ui/icons/ViewList';
import ExitToAppSharp from '@material-ui/icons/ExitToAppSharp';




const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: "#002A44",
  color: 'white',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#002A44",
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },

});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#002A44",
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    backgroundColor: "#002A44",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const { user } = useContext(AuthContext);

  const memberSidebarMenu = [
    {
      label: "Dashboard",
      href: "/member",
      icon: <DashboardIcon />
    },
    {
      label: "Profile",
      href: "/member/profile",
      icon: <AccountCircle />
    },
    {
      label: "Issued",
      href: "/member/issued",
      icon: <LibraryBooksIcon />
    },
    {
      label: "Reserved",
      href: "/member/reserved",
      icon: <MenuBook />
    },
    {
      label: "History",
      href: "/member/history",
      icon: <History />
    },
  ]

  const adminSidebarMenu = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <DashboardIcon />
    },
    {
      label: "Books",
      icon: <LibraryBooksIcon />,
      items: [
        {
          label: "All Books",
          href: "allbooks",
          icon: <LibraryBooksIcon />
        },
        {
          label: "Add Books",
          href: "addbook",
          icon: <MenuBook />
        }
      ]
    },
    {
      label: "Transactions",
      icon: <Receipt />,
      items: [
        {
          label: "All Transactions",
          href: "alltransactions",
          icon: <Receipt />
        },
        {
          label: "Add Transactions",
          href: "addtransaction",
          icon: <AddBox />
        }
      ]
    },
    {
      label: "Member",
      icon: <Group />,
      items: [
        {
          label: "All Members",
          href: "allmembers",
          icon: <Group />
        },
        {
          label: "Add Member",
          href: "addmember",
          icon: <GroupAddTwoTone />
        },
        {
          label: "Get Member Details",
          href: "getmember",
          icon: <ViewList />
        }
      ]
    },
  ];


  const menuItems = user?.isAdmin ? adminSidebarMenu : memberSidebarMenu;

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate('/')
      window.location.reload()
    }, 1000)
  }

  const location = useLocation();
  const activeNav = location.pathname.replace('/admin/', '');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginRight: "65px",
            }}
          >
            Library Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              marginRight: "65px",
            }}
          >
            LMS
          </Typography>
          <IconButton onClick={handleDrawerClose} sx={{ background: "white", ":hover": { background: "white" } }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon color='white' /> : <ChevronLeftIcon color='white' />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems?.map((eachItem, index) => (
            eachItem.items ? (
              <Accordion key={index} sx={{ backgroundColor: '#002A44', color: 'white' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >

                  <ListItemIcon sx={index === 1 ? {
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    ml: open ? 0 : 7,
                    justifyContent: 'center',
                    color: "white"
                  } : index === 2 ? {
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    ml: open ? 0 : 12,
                    justifyContent: 'center',
                    color: "white"
                  } : {
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    ml: open ? 0 : 8,
                    justifyContent: 'center',
                    color: "white"
                  }}>
                    {eachItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={eachItem.label} sx={{ opacity: open ? 1 : 0 }} />
                </AccordionSummary>
                <AccordionDetails>
                  {eachItem.items.map((subItem, subIndex) => (
                    <Link key={subIndex} to={`${subItem.href}`} style={{ textDecoration: 'none', color: 'white' }}>
                      <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                              color: "white"
                            }}
                          >
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText primary={subItem.label} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </AccordionDetails>
              </Accordion>
            ) : (
              <Link key={index} to={`${eachItem.href}`} style={{ textDecoration: 'none', color: 'white' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: "white"
                      }}
                    >
                      {eachItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={eachItem.label} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          ))}
        </List>

        <ListItem onClick={logout} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: "white"
              }}
            >
              {<ExitToAppSharp />}

            </ListItemIcon>
            <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box >
  );
}


