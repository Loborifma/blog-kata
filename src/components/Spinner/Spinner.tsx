import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 56 }} spin />;

const Spinner: React.FC = () => <Spin indicator={antIcon} />;

export default Spinner;
