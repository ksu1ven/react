import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import SearchPage from './components/SearchPage/SearchPage';
import Details, { loader } from './components/SearchPage/Details';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SearchPage />}>
      <Route index element={<Details />} loader={loader} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
