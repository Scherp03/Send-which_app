module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',  // Transform JavaScript files using babel-jest
    },
    testEnvironment: 'node', // Specify the test environment (Node.js in this case)
    
    "preset": "@shelf/jest-mongodb" // According to https://jestjs.io/docs/mongodb
};