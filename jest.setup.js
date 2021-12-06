/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('@vue/test-utils');

process.addListener('unhandledRejection', err => console.error(err))