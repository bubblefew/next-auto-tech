import type { AppProps } from 'next/app'
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import * as React from "react";
import { getSession } from '@/store/slices/userSlice';
import { createTheme, ThemeProvider } from '@mui/material';
import { blue } from '@mui/material/colors'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


function MyApp({ Component, pageProps }: AppProps) {
  const drawerWidth = 240
  const theme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'url("/static/img/background_menu.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            width: drawerWidth
          }
        }
      },
    },
    typography: {
      fontFamily: "Roboto",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700
    },
    spacing: 8,
    palette: {
      primary: process.env.NEXT_PUBLIC_IS_PRODUCTION == "0" ? blue : blue,
      background: {
        default: "#FFF"
      }
    }
  })
  React.useEffect(() => {
    store.dispatch(getSession())
  })
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider >


  )
}

export default MyApp
