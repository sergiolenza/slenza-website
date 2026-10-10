const config = {
  plugins: [
    'next/dist/compiled/postcss-flexbugs-fixes',
    [
      'next/dist/compiled/postcss-preset-env',
      {
        browsers: ['chrome 111', 'edge 111', 'firefox 111', 'safari 16.4'],
        stage: 3,
        features: {
          'custom-media-queries': {
            importFrom: ['./src/shared/ui/styles/breakpoints.css'],
          },
          'custom-properties': false,
        },
      },
    ],
  ],
};

export default config;
