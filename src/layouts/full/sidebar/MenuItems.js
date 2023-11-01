import {
  IconLayoutDashboard, IconLogin, IconUserPlus, IconSearch
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
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

export default Menuitems;
