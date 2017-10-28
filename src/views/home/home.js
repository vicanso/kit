import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userInfo : ({ user }) => user.info,
    }),
  },
};
