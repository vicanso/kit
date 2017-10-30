import { mapState } from 'vuex';

export default {
  data() {
    return {
      items: [
        {
          name: 'systemSetting',
          items: [
            {
              name: 'i18n',
              route: 'i18n',
            },
          ],
        },
        {
          name: 'testSetting',
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
