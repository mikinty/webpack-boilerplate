const React = require('react');
const ReactDOM = require('react-dom');

const SSR = <div onClick={() => alert('hello')}>Hello world</div>;

// render only in browser, export otherwise
if (typeof document === 'undefined') {
  // not in browser
  module.exports = SSR;
} else {
  ReactDOM.render(SSR, document.getElementById('app'));
}