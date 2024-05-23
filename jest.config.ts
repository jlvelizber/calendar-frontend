import type { Config } from "jest";

const config: Config = {
  verbose: true,
  setupFiles: ["./jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [],

  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  // moduleNameMapper: {
  //     '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
  // },
};

export default config;
