import Style from './header.module.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { HEADER_API_KEY } from '../../utils/api/headers';

interface NetworksProps {
  instagram: string;
  linkedin: string;
  github: string;
}

export default function Header(): JSX.Element {
  const [networks, setNetworks] = useState<NetworksProps>();

  useEffect(() => {
    async function getNetworks() {
      await api.get('/networks/api/v1/', { headers: HEADER_API_KEY })
      .then(r => setNetworks(r.data))
    }

    getNetworks();

  }, [])

  return (
    <header className={Style.C_header}>
      <ul className={Style.C_header__ul}>
        <li><Link target="_blanck" to={`${networks?.instagram}`}>instagram</Link></li>
        <li><Link target="_blanck" to={`${networks?.linkedin}`}>linkedin</Link></li>
        <li><Link target="_blanck" to={`${networks?.github}`}>gitHub</Link></li>
      </ul>
    </header>
  )
}
