import { createTheme, ThemeProvider } from "@mui/material";
import { Box, styled } from "@mui/system";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Common/Navbar/Navbar";
import Cars from "./pages/Cars";
import Home from "./pages/Home";

const theme = createTheme({
  palette: {
    primary: { main: "#f20000", dark: "#d20000", light: "#ff1a1a" }
  }
})

export const PageHeading = styled('div')(({ theme }) => ({
  fontSize: '25px',
  textAlign: 'center',
  fontWeight: 'bold',
  color: theme.palette.primary.dark,
  margin: '30px 0',
  [theme.breakpoints.up('md')]: {
    fontSize: '45px'
  },
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box className="App" sx={{ position: 'relative' }}>
          <Navbar />
          <Box sx={{ position: 'relative' }}>
            <Switch>
              <Route path="/home"><Home /></Route>
              <Route path="/cars"><Cars /></Route>
              <Route exact path="/"><Home /></Route>
            </Switch>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
