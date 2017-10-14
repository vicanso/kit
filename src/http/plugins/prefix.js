import globals from '@/helpers/globals';

export default function prefix(req) {
  const apiPrefix = globals.get('CONFIG.apiPrefix');
  if (!apiPrefix) {
    return;
  }
  if (req.url.charAt(0) === '/') {
    req.url = `${apiPrefix}${req.url}`;
  }
}
