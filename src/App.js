import { Backdrop, createTheme, ThemeProvider } from "@mui/material";
import { Box, styled } from "@mui/system";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Common/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthContextProvider from "./contexts/AuthContext";
import Authentication from "./pages/Authentication";
import Cars from "./pages/Cars";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import CarDetails from "./pages/CarDetails";
import Page404 from "./pages/404";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Common/Footer/Footer";
import Contact from "./pages/Contact";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";
import useFirebase from "./hooks/useFirebase";
import LoadingSpinner from "./components/Common/LoadingSpinner/LoadingSpinner";

// customize mui theme
export const theme = createTheme({
  palette: {
    primary: { main: "#f10000", dark: "#d20000", light: "#ff1a1a" }
  },
  typography: {
    fontFamily: ['Arvo', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', 'sans-serif'].join(','),
    h1: {
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
      '@media (min-width:900px)': {
        fontSize: '4.5rem',
      },
      '@media (min-width:1400px)': {
        fontSize: '5.5rem',
      }
    },
    h4: {
      fontSize: '1.3rem',
      '@media (min-width:600px)': {
        fontSize: '1.8rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.5rem',
      }
    }
  }
})

// custom styled component
export const PageHeading = styled('div')(({ theme }) => ({
  fontSize: '25px',
  textAlign: 'center',
  fontWeight: 'bold',
  margin: '30px 0',
  [theme.breakpoints.up('md')]: {
    fontSize: '50px'
  },
}));

function App() {
  const firebaseFunctions = useFirebase()

  return (
    // customized theme provider
    <ThemeProvider theme={theme}>
      <Backdrop sx={{
        zIndex: 9999, backgroundColor: 'white'
      }} open={firebaseFunctions.loadingUserOnReload}
        transitionDuration={{ appear: 0, enter: 0, exit: 1000 }}>
        <LoadingSpinner />
      </Backdrop>
      <AuthContextProvider firebaseFunctions={firebaseFunctions}> {/* authentication context provider */}
        <Router>
          <Box className="App" sx={{ position: 'relative' }}>
            <Navbar />   {/* navigation bar */}
            <Box sx={{ position: 'relative' }}>
              <Switch>
                {/* routes */}
                <Route exact path="/"><Home /></Route>
                <Route exact path="/cars"><Cars /></Route>

                {/* authentication routes */}
                <Route exact path="/auth"><Authentication /></Route>
                <Route path="/auth/signup"><Authentication><SignUp /></Authentication></Route>
                <Route path="/auth/login"><Authentication><Login /></Authentication></Route>

                {/* private routes */}
                <PrivateRoute path="/profile"><UserProfile /></PrivateRoute>
                <PrivateRoute path="/cars/details/:carID"><CarDetails /></PrivateRoute>
                <PrivateRoute path="/dashboard"><Dashboard /></PrivateRoute>
                <PrivateRoute path="/contact"><Contact /></PrivateRoute>

                {/* not found page */}
                <Route path="*"><Page404 /></Route>
              </Switch>
            </Box>
            <Footer />
          </Box>
        </Router>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
