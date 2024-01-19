// App.js
import React from 'react';
import { CssBaseline, ThemeProvider, Container, Paper, Typography } from '@mui/material';
import theme from './theme';
import ImageUploader from './components/imageUploader';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} className="paper">
          <ImageUploader />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
