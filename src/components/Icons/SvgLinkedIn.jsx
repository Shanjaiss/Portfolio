import * as React from 'react';

const SvgLinkedIn = ({ width = '100', height = '100', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    fillRule='evenodd'
    clipRule='evenodd'
    imageRendering='optimizeQuality'
    shapeRendering='geometricPrecision'
    textRendering='geometricPrecision'
    viewBox='0 0 512 509.64'
    {...props}
  >
    <rect width='51' height='50' rx='115.61' ry='115.61'></rect>
    <path
      fill='#fff'
      d='M204.97 197.54h64.69v33.16h.94c9.01-16.16 31.04-33.16 63.89-33.16 68.31 0 80.94 42.51 80.94 97.81v116.92h-67.46l-.01-104.13c0-23.81-.49-54.45-35.08-54.45-35.12 0-40.51 25.91-40.51 52.72v105.86h-67.4zm-38.23-65.09c0 19.36-15.72 35.08-35.08 35.08-19.37 0-35.09-15.72-35.09-35.08 0-19.37 15.72-35.08 35.09-35.08 19.36 0 35.08 15.71 35.08 35.08m-70.17 65.09h70.17v214.73H96.57z'
    ></path>
  </svg>
);

export default SvgLinkedIn;
