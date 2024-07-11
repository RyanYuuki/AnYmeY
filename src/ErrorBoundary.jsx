/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import  Error from './pages/Error'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return <Error />;
    }
    return this.props.children; 
  }
}

const ErrorRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/error');
  }, [navigate]);

  return null;
};

export default ErrorBoundary;
