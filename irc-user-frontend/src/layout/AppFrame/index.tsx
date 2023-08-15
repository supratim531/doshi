import React from "react";
import DrawerNavigation from "../../component/DrawerNavigation";
import IRCNavbar from "../../component/IRCNavbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles'; 

const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "'Poppins', sans-serif",
      },
    },
  });

const AppFrame = () => {
    return(
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
    )
}

export default AppFrame;