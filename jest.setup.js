/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('@vue/test-utils');
const _ResizeObserver = require('resize-observer-polyfill')

global.ResizeObserver = _ResizeObserver

// process.addListener('unhandledRejection', err => console.error(err))