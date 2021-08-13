module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['tests'],
  coverageDirectory: './coverage',
  collectCoverageFrom: ['**/*.(t|j)s'],
};
