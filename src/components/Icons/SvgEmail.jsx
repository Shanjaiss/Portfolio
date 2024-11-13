import * as React from 'react';

const SvgEmail = ({ width = '80', height = '100', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    xmlSpace='preserve'
    id='Layer_1'
    x='0'
    y='0'
    version='1.1'
    viewBox='0 0 122.88 92.12'
  >
    <path
      fill='#4285f4'
      d='M8.36 92.12H27.9V44.67L0 23.76v60.08c0 4.58 3.78 8.28 8.36 8.28'
    ></path>
    <path
      fill='#34a853'
      d='M94.97 92.12h19.54c4.67 0 8.36-3.78 8.36-8.36v-60l-27.9 20.91z'
    ></path>
    <path
      fill='#fbbc04'
      d='M94.97 8.4v36.27l27.91-20.91V12.58c0-10.37-11.82-16.25-20.11-10.05z'
    ></path>
    <path
      fill='#ea4335'
      d='M27.9 44.67V8.4l33.54 25.17L94.97 8.4v36.27L61.44 69.76z'
    ></path>
    <path
      fill='#c5221f'
      d='M0 12.58v11.18l27.91 20.91V8.4l-7.8-5.87C11.82-3.66 0 2.29 0 12.58'
    ></path>
  </svg>
);

export default SvgEmail;
