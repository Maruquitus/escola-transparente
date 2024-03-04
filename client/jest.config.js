module.exports = {
    preset: 'ts-jest',
    testEnvironmentOptions: {
      url: "http://localhost:3001"
    },
    testEnvironment: 'node', // Assuming you're running tests in a browser-like environment
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
  };
  