import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from '@mui/material';
import logo from './download (1).jpg'
const pages = [
  {
    name: "Contact Us",
    link: "/contact"
  },
  {
    name: "About Us",
    link: "/about"
  },
  {
    name: "Home",
    link: "/"
  }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    return (
        <AppBar position="sticky"
            sx={{backgroundColor:'#ffffff', height: 60,}}
        >
        
            <Container maxWidth="xl" sx={{height: 60,}}>
                <Toolbar disableGutters sx={{height: 60,}}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
                        <img src={logo} alt="" height={35} style={{margin:'5px'}} />
                    </Box>  

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            >
                        
                            <MenuIcon />
                        </IconButton>
                        
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                          {pages.map((page) => (
                            <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                              <Button sx={{
                                color: 'secondary.dark',
                                ":hover": {
                                  color: 'secondary.dark',
                                  bgcolor: "primary.light",

                                }
                              }} textAlign="center" href={page.link}>{page.name}</Button>
                            </MenuItem>
                          ))}
                        </Menu>
                    </Box>
                    
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1,flexGrow: 1}} >
                        <img src={logo} alt=""  height={40} />
                    </Box>
          
                    <Grid sx={{flexGrow: 1,justifyContent: 'end'}} spacing={1} container>
                        <Grid item>
                            <Button 
                                variant="outlined"
                                href="register">
                                <Typography>Register</Typography>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button 
                                variant="contained"
                                href="login">
                                <Typography>Login</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Box sx={{ flexGrow: 0 }}>

                        <Menu
                          sx={{ mt: '45px' }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                          {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                              <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                          ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;