import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../redux/store/store';
import ErrorBoundary from '../components/ErrorBoundary';

function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
