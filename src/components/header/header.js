import { mapState, mapActions } from 'vuex';

import globals from '@/helpers/globals';

export default {
  methods: {
    ...mapActions([
      'userLogout',
    ]),
    login() {
      this.$router.push({
        name: 'login',
      });
    },
    register() {
      this.$router.push({
        name: 'register',
      });
    },
    logout() {
      this.userLogout();
    },
    handleLangSelect(lang) {
      const currentLang = globals.get('CONFIG.lang');
      if (currentLang === lang) {
        return;
      }
      const href = `${location.pathname}${location.search}`;
      if (href.indexOf(currentLang) === 1) {
        if (lang === 'en') {
          location.href = href.replace(`/${currentLang}`, '');
        } else {
          location.href = href.replace(currentLang, lang);
        }
      } else {
        location.href = `/${lang}${href}`;
      }
    },
  },
  computed: {
    ...mapState({
      userInfo: ({ user }) => user.info,
      basicLangs: ({ lang }) => lang.basic,
      commonLangs: ({ lang }) => lang.common,
    }),
  },
};
