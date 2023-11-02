import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import SearchPage from './components/SearchPage/SearchPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SearchPage />}>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
