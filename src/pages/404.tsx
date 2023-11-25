import React from 'react';
import Link from 'next/link';

function ErrorPage() {
  return (
    <main className="error-occured min-h-screen grid place-content-center grow">
      <h2 className="text-5xl">Page not found :&#40;</h2>
      <Link
        className="w-fit bg-lime-700 py-3 px-10 mt-10 rounded text-white font-extrabold m-auto"
        href="/"
      >
        Back Home
      </Link>
    </main>
  );
}
export default ErrorPage;
