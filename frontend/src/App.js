import './App.css';
import Portal from './Portal';

import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#c53030',
        contrastText: '#fff',
      },
      primary: {
        main: '#4fb9a7',
        contrastText: '#fff',
      },
    },
  });

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Router>
          <Portal />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
