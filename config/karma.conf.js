module.exports = function (config) {

  const configuration = {

    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    client: {
      captureConsole: false
    },
    files: [
      { pattern: './config/spec-bundle.js', watched: false },
    ],
    plugins: [
      require('karma-jasmine'),
      require("karma-coverage"),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-coverage-istanbul-reporter')
    ],

    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },
    webpack: require('./webpack.test.js'),

    webpackMiddleware: {
      logLevel: 'warn',
      stats: {
        chunks: false
      }
    },

    reporters: ['coverage-istanbul', 'progress', 'coverage', 'kjhtml'],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    coverageIstanbulReporter: {

      reports: ['html', 'lcovonly', 'text-summary'],
      dir: './coverage',
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,

      'report-config': {
        html: {
          subdir: 'html'
        }
      },
      thresholds: {
        emitWarning: false,
        global: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100
        },
        each: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100,
          overrides: {
          }
        }
      },
      verbose: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: [
      'Chrome'
    ],
    singleRun: false,
    client: {
      clearContext: false
    },
    concurrency: Infinity
  };

  config.set(configuration);
};
