import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import { Grid, Link } from '@mui/material';
import logo from './images/download (1).jpg'

import { useNavigate } from 'react-router-dom';

const pages = [
	{
		name: "Home",
		link: "/"
	},
	{
		name: "About Us",
		link: "/about"
	},
	{
		name: "Contact Us",
		link: "/contact"
	}
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavComponent() {

	const navigation = useNavigate();

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
		<nav className="z-50 top-0 sticky bg-white border-gray-200 shadow-sm">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-[60px]">
				<a
					href="/"
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<img src={logo} className="h-10" alt="" />
				</a>
				<button
					data-collapse-toggle="navbar-default"
					type="button"
					className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
					aria-controls="navbar-default"
					aria-expanded="false"
				>
					<span className="sr-only">Open main menu</span>
					<svg
						className="w-5 h-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 17 14"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg>
				</button>
				<div className="hidden w-full md:block md:w-auto" id="navbar-default">
					<ul className="font-medium flex rounded-lg flex-row space-x-3">
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
								aria-current="page"
							>
								Home
							</a>
						</li>
						<li>
							<a
								href="#about"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#team"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>
								Our Team
							</a>
						</li>
						<li>
							<a
								href="#pricing"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>
								Pricing
							</a>
						</li>
						<li>
							<Button onClick={() => navigation('register')} variant='outlined'>Register</Button>
						</li>
						<li>
							<Button onClick={() => navigation('login')} variant='contained'>Login</Button>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		// <AppBar position="sticky"
		//     variant='lightTheme'
		//     sx={{ backgroundColor: 'white',boxShadow:'0px 5px 15px 0px rgba(138,138,138,0.3)'}}
		// >
		//     <Container maxWidth="xl">
		//         <Toolbar disableGutters>
		//             <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >

		//                 <img src={logo} alt="" height={40} style={{ margin: '5px' }} />
		//             </Box>

		//             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
		//                 <IconButton
		//                     size="large"
		//                     aria-label="account of current user"
		//                     aria-controls="menu-appbar"
		//                     aria-haspopup="true"
		//                     onClick={handleOpenNavMenu}
		//                     color="black"
		//                 >
		//                     <MenuIcon />
		//                 </IconButton>
		//                 <Menu
		//                     id="menu-appbar"
		//                     anchorEl={anchorElNav}
		//                     anchorOrigin={{
		//                         vertical: 'bottom',
		//                         horizontal: 'left',
		//                     }}
		//                     keepMounted
		//                     transformOrigin={{
		//                         vertical: 'top',
		//                         horizontal: 'left',
		//                     }}
		//                     open={Boolean(anchorElNav)}
		//                     onClose={handleCloseNavMenu}
		//                     sx={{
		//                         display: { xs: 'block', md: 'none' },
		//                     }}
		//                 >
		//                     {pages.map((page) => (
		//                         <MenuItem key={page.name} onClick={handleCloseNavMenu}>
		//                             <Button sx={{
		//                                 color: 'secondary.dark',
		//                                 ":hover": {
		//                                     color: 'secondary.dark',
		//                                     bgcolor: "primary.light",

		//                                 }
		//                             }} textAlign="center" href={page.link}>{page.name}</Button>
		//                         </MenuItem>
		//                     ))}
		//                 </Menu>
		//             </Box>
		//             <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, flexGrow: 1 }} >

		//                 <img src={logo} alt="" height={40} />
		//             </Box>

		//             <Grid container spacing={2} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'row', mr: 3, justifyContent: 'end' }}>

		//                 {pages.map((page) => (
		//                     <Grid item >
		//                         <Button
		//                             key={page.name}
		//                             onClick={handleCloseNavMenu}
		//                             href={page.link}
		//                             sx={{color:'black'}}

		//                         >
		//                             {page.name}
		//                         </Button>
		//                     </Grid>
		//                 ))}
		//                 <Grid item>
		//                     <Button 
		//                       onClick = {() => navigation('register')}
		//                       variant='outlined' >Register</Button>
		//                 </Grid>
		//                 <Grid item>

		//                     <Button 
		//                       onClick = {() => navigation('login')}
		//                       variant='contained' >Login</Button>
		//                 </Grid>
		//                     </Grid>

		//                 <Box sx={{ flexGrow: 0 }}>

		//                     <Menu
		//                         sx={{ mt: '45px' }}
		//                         id="menu-appbar"
		//                         anchorEl={anchorElUser}
		//                         anchorOrigin={{
		//                             vertical: 'top',
		//                             horizontal: 'right',
		//                         }}
		//                         keepMounted
		//                         transformOrigin={{
		//                             vertical: 'top',
		//                             horizontal: 'right',
		//                         }}
		//                         open={Boolean(anchorElUser)}
		//                         onClose={handleCloseUserMenu}
		//                     >
		//                         {settings.map((setting) => (
		//                             <MenuItem key={setting} onClick={handleCloseUserMenu}>
		//                                 <Typography textAlign="center">{setting}</Typography>
		//                             </MenuItem>
		//                         ))}
		//                     </Menu>
		//                 </Box>

		//         </Toolbar>
		//     </Container>
		// </AppBar>
	);
}
export default NavComponent;
