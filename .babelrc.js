module.exports = {
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    'stage-2',
    'react',
  ],
  ignore: ['node_modules', 'build'],
};
