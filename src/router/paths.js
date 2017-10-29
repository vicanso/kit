import globals from '@/helpers/globals';

const paths = {
  home: '/',
  news: '/news',
  aboutUs: '/about-us',
  login: '/login',
  register: '/register',
  i18n: '/i18n',
};

export default function get(name) {
  const appUrlPrefix = globals.get('CONFIG.appUrlPrefix');
  const lang = globals.get('CONFIG.lang');
  const currentPath = paths[name];
  if (!lang || lang === 'en') {
    return `${appUrlPrefix}${currentPath}`;
  }
  return `${appUrlPrefix}/${lang}${currentPath}`;
}
