import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import * as React from "react";
import { getSession } from '@/store/slices/userSlice';
function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    store.dispatch(getSession())
  })
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
