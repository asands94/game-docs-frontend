import Spinner from 'react-bootstrap/Spinner';

export const LoadingScreen = () => (
  <div className="container-sm" style={{ textAlign: 'center' }}>
    <Spinner role="status" animation="border" />
  </div>
)
