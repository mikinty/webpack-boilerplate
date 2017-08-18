module.exports = (config) => {
  const tests = 'tests/*.test.js';

  config.set({
    frameworks: ['mocha'],

    files: [
      {
        pattern: tests,
      },
    ],

    // Preprocess through webpack
    preprocessors: {
      [tests]: ['webpack'],
    },

    singleRun: true,

    browsers: ['PhantomJS'],    
  });
};