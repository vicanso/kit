import { mapState } from 'vuex';

export default {
  data() {
    return {
      items: [
        {
          name: '系统配置',
          items: [
            {
              name: 'i18n',
            },
          ],
        },
        {
          name: '测试配置',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      userInfo: ({ user }) => user.info,
    }),
  },
};
