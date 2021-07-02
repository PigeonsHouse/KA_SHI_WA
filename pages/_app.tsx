import '../styles/globals.css'
import { AppProps } from "next/app";
import { Provider } from 'react-redux';
import createStore from '../modules/createStore';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={createStore()}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp