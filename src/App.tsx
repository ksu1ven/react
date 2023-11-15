import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import SearchPage from './components/SearchPage/SearchPage';
import Details, { loader } from './components/SearchPage/Details';
import ErrorPage from './components/SearchPage/ErrorPage';
import ErrorWithFetch from './components/SearchPage/ErrorWithFetch';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <SearchPage />
          </ErrorBoundary>
        }
      >
        <Route
          index
          element={<Details />}
          loader={loader}
          errorElement={<ErrorWithFetch param="animal" />}
        />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
