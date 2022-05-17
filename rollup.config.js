import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/client.ts',
  plugins: [typescript()],
  output: [
    {
      file: './umd/graphql-http.js',
      format: 'umd',
      name: 'graphqlHttp',
    },
    {
      file: './umd/graphql-http.min.js',
      format: 'umd',
      name: 'graphqlHttp',
      plugins: [terser()],
    },
  ],
};
