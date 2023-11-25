import React from 'react';
import { useRouter } from 'next/router';
import { updateQueryParams } from '../utils/helpFunctions';

function ErrorWithFetch(props: Record<string, string>) {
  const router = useRouter();

  return (
    <aside className="relative w-1/3 bg-lime-700 text-white p-40">
      <button
        className="absolute top-14 right-14 flex items-center justify-center w-16 h-16 bg-lime-300 text-4xl p-3 rounded-full"
        onClick={() => {
          const newParams = updateQueryParams(router.query, 'details', '');
          router.push(newParams.toString() ? '?' + newParams : '');
        }}
      >
        X
      </button>
      <h2 className="text-3xl">
        {`We can't find this ${props.param}. Problems with server or ${props.param} doesn't exist. Try again`}
      </h2>
    </aside>
  );
}
export default ErrorWithFetch;
