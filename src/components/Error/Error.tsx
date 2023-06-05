import { Alert } from 'antd';

const Error = ({ text }: { text: string }) => (
  <Alert
    style={{ textAlign: 'center', fontSize: 18 }}
    message={text}
    type="error"
  />
);

export default Error;
