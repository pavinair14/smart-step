/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    globals: {
        'ts-jest': {
            diagnostics: false,
            isolatedModules: true,
            tsconfig: {
                jsx: 'react-jsx',
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
                module: 'esnext',
                moduleResolution: 'bundler',
                types: ['vite/client', 'jest', 'node'],
                target: 'ES2022',
            },
        },
    },

    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    // Ensure Jest transforms modern ESM modules correctly
    transformIgnorePatterns: [
        'node_modules/(?!(framer-motion|react-error-boundary|lucide-react|@radix-ui)/)',
    ],

    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/main.tsx',
        '!src/test/**',
    ],

    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '<rootDir>/src/services/__mocks__/',
    ],
};
