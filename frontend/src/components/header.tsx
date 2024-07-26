import { Divider } from '@mantine/core';
import VialLogo from '../assets/vial-logo.svg';

function Header() {
  return (
    <div>
      <img src={VialLogo} alt="Vial Logo" style={{ display: 'block', margin: '0 auto', padding: 10 }} />
      <Divider my="md" />
    </div>
  );
}

export default Header;
