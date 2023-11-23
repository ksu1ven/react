import { useRouter } from "next/router";

function Error() {
  const router = useRouter();
  return (
    <main className="error-occured min-h-screen grid place-content-center grow">
      <h2 className="text-3xl">Hello, I&apos;m Error! I was catched :&#40;</h2>
      <button
        type="button"
        className="w-fit bg-lime-700 py-3 px-10 mt-10 rounded text-white font-extrabold m-auto"
        onClick={() => {
          router.reload();
        }}
      >
        Try again
      </button>
    </main>
  );
}

export default Error;
