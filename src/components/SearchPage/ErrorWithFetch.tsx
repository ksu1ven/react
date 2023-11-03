function ErrorWithFetch(props: Record<string, string>) {
  return (
    <aside className=" w-1/3 bg-lime-700 text-white p-40  ">
      <h2 className="text-3xl">
        {`We can't find this ${props.param}. Problems with server or ${props.param} doesn't exist. Try again`}
      </h2>
    </aside>
  );
}
export default ErrorWithFetch;
