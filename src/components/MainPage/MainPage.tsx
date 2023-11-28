import { Link } from 'react-router-dom';

export function MainPage() {
  return (
    <header>
      <Link to="/uncontrolled-form">Uncontrolled Form</Link>
      <Link to="/hook-form">Hook Form</Link>
    </header>
  );
}

export default MainPage;
