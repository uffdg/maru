import { Link } from 'react-router-dom';
import maruLogo from '../../assets/maru logo.svg';

const SiteLogo = () => (
  <Link to="/" aria-label="Maru Fiorillo portfolio home">
    <img src={maruLogo} alt="Maru Fiorillo" style={{ height: '32px', width: 'auto' }} />
  </Link>
);

export default SiteLogo;
