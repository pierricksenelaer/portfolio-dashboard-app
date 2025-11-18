if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const { worker } = require('../mocks');
    worker.start({ onUnhandledRequest: 'bypass' });
  }