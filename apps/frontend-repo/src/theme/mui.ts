'use client';

import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small', 
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          height: 40, 
          minHeight: 40,
          padding: '8px 16px',
          fontSize: '0.875rem',
        },
        contained: {
          height: 40,
        },
        outlined: {
          height: 40,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            height: 40,
            '& input': {
              padding: '8px 12px',
            },
          },
          '& .MuiInputLabel-outlined': {
            transform: 'translate(12px, 10px) scale(1)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(12px, -6px) scale(0.75)',
            },
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          height: 40,
          '& .MuiSelect-select': {
            padding: '8px 12px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
          marginTop: 4,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            height: 40,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '16px 0',
        },
      },
    },
  },
});

export default muiTheme;