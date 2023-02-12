import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import gzip from 'rollup-plugin-gzip';

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
    {
      file: './umd/graphql-http.min.js', // gzip plugin will add the .gz extension
      format: 'umd',
      name: 'graphqlHttp',
      plugins: [terser(), gzip()],
    },
  ],
};
