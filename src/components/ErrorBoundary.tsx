import React from 'react';
import { ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-occured min-h-screen grid place-content-center">
          <h2 className="text-3xl">Hello, I'm Error! I was catched :&#40;</h2>
          <button
            type="button"
            className="w-fit bg-lime-700 py-3 px-10 mt-10 rounded text-white font-extrabold m-auto"
            onClick={() => {
              this.setState({ hasError: false });
            }}
          >
            Try again
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
