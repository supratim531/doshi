import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IRCNavbar from "../../component/IRCNavbar";
import DrawerNavigation from "../../component/DrawerNavigation";

const theme = createTheme({
	typography: {
		allVariants: {
			fontFamily: "'Roboto', sans-serif",
		},
	},
});

const AppFrame = () => {
	return (
		<ThemeProvider theme={theme}>
			<div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
				data-sidebar-position="fixed" data-header-position="fixed">
				<DrawerNavigation />
				<div className="body-wrapper">
					<IRCNavbar />
					<div className="container-fluid">
						<Outlet />
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default AppFrame;
