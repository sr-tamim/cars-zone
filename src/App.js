import { createTheme, ThemeProvider } from "@mui/material";
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

export const theme = createTheme({
  palette: {
    primary: { main: "#f20000", dark: "#d20000", light: "#ff1a1a" }
  },
  typography: {
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
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Router>
          <Box className="App" sx={{ position: 'relative' }}>
            <Navbar />
            <Box sx={{ position: 'relative' }}>
              <Switch>
                <Route path="/home"><Home /></Route>
                <Route exact path="/cars"><Cars /></Route>
                <Route path="/auth"><Authentication /></Route>
                <Route exact path="/"><Home /></Route>

                <PrivateRoute path="/profile"><UserProfile /></PrivateRoute>
                <PrivateRoute path="/cars/details/:carID"><CarDetails /></PrivateRoute>
                <PrivateRoute path="/dashboard"><Dashboard /></PrivateRoute>

                <Route path="*"><Page404 /></Route>
              </Switch>
            </Box>
          </Box>
        </Router>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
