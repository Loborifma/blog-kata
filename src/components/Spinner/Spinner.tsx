import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './Spinner.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 56 }} spin />;

const Spinner: React.FC = () => (
  <div className="spinner">
    <Spin indicator={antIcon} />
  </div>
);

export default Spinner;
