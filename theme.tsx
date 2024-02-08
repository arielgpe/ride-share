'use client';

import { createTheme } from '@mui/material/styles';


declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    tertiary?: true;
    quaternary?: true;
  }
}

// To add more colors, add them here first.
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    bg: Palette['primary'];
    white: Palette['primary'];
  }

  interface PaletteOptions {
    bg: Palette['primary'];
    white: Palette['primary'];
  }
}

export default createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1300,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      light: "#D40753",
      main: "#B70648",
      dark: "#860435"
    },
    white: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#FFFFFF'
    },
    bg: {
      main: '#FBFDFF',
      light: '#FBFDFF',
      dark: '#FBFDFF',
      contrastText: '#FBFDFF'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
    ].join(','),
  },
  components: {
    MuiSelect: {},
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',

        }
      }
    },
    MuiTypography: {
      defaultProps: {
        fontFamily: [
          'Inter',
          'Roboto',
          '"Helvetica Neue"',
        ].join(','),
      },
      styleOverrides: {
        root: {
          color: '#000',
          fontFamily: [
            'Inter',
            'Roboto',
            '"Helvetica Neue"',
          ].join(','),
        }
      }
    },
    MuiDrawer: {
      defaultProps: {
        variant: 'permanent',
        anchor: 'left'
      },
    },
    MuiGrid2: {
      defaultProps: {
        // all grids under this theme will apply
        // negative margin on the top and left sides.
        disableEqualOverflow: true,
      },
    }
  }
});
