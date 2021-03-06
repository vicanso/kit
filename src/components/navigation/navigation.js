import { mapState } from 'vuex';

export default {
  data() {
    return {
      items: [
        {
          name: 'userManagement',
          items: [
            {
              name: 'user',
              route: 'user',
            },
          ],
        },
        {
          name: 'systemSetting',
          items: [
            {
              name: 'i18n',
              route: 'i18n',
            },
            {
              name: 'setting',
              route: 'setting',
            },
          ],
        },
        {
          name: 'testSetting',
          items: [
            {
              name: 'mock',
              route: 'mock',
            },
          ],
        },
      ],
    };
  },
  methods: {
    go(item) {
      const route = item.route;
      if (!route) {
        return;
      }
      this.$router.push({
        name: route,
      });
    },
  },
  computed: {
    ...mapState({
      userInfo: ({ user }) => user.info,
      basicLangs: ({ lang }) => lang.basic,
    }),
  },
};
