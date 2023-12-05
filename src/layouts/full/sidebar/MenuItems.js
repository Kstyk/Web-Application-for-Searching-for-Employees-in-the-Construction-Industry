import {
  IconLayoutDashboard, IconLogin, IconUserPlus, IconSearch
} from '@tabler/icons';

import { uniqueId } from 'lodash';

import { useAuth } from '../../../contexts/AuthContext';

var items = [
  {
    navlabel: true,
    subheader: 'xBuild',
  },

  {
    id: uniqueId(),
    title: 'Strona główna',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Szukanie profili',
    icon: IconSearch,
    href: '/profiles',
  },

  {
    navlabel: true,
    subheader: 'Autoryzacja',
  },
  {
    id: uniqueId(),
    title: 'Logowanie',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Rejestracja',
    icon: IconUserPlus,
    href: '/auth/register',
  },
];

const Menuitems = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return items.slice(0, -3);
  } else {
    return items;
  }
};

export default Menuitems;
