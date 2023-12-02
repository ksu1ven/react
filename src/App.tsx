import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import ErrorPage from './components/ErrorPage';
import MainPage from './components/MainPage/MainPage';
import UncontrolledFormPage from './components/UncontrolledForm Page/UncontrolledFormPage';
import HookFormPage from './components/HookForm Page/HookFormPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />} />
      <Route path="/uncontrolled-form" element={<UncontrolledFormPage />} />
      <Route path="/hook-form" element={<HookFormPage />} />
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
