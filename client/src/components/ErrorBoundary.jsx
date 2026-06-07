import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.error) {
      const err = this.state.error;
      return (
        <div style={{ padding: 20, color: '#ffa0a0', background: '#2b2b2b', minHeight: '100vh' }}>
          <h2>Application Error</h2>
          <div style={{ whiteSpace: 'pre-wrap' }}>{String(err && err.stack ? err.stack : err)}</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
