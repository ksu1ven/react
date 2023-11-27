import { Link } from 'react-router-dom';

export function MainPage() {
  return (
    <div>
      Main
      <Link to="/uncontrolled-form">Uncontrolled Form</Link>
      <Link to="/hook-form">Hook Form</Link>
    </div>
  );
}

export default MainPage;
