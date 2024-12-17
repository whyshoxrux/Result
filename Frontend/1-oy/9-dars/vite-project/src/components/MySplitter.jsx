import React from 'react';
import { Skeleton, Splitter  } from 'antd';
import MyFirstProps from './MyFirstProps';
import ForPropsDiv from './ForPropsDiv';

const object = {
    height: '100%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
}
const MySplitter = () => (
  <Splitter
    style={object}
  >
    <Splitter.Panel
        style = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
        <Skeleton active={true}/>
    </Splitter.Panel>
    <Splitter.Panel
        style = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
        <Skeleton active={true}/>
    </Splitter.Panel>
  </Splitter>
);
export default MySplitter;