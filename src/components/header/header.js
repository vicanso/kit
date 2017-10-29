import { mapState, mapActions } from 'vuex';


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
  },
  computed: {
    ...mapState({
      userInfo: ({ user }) => user.info,
      basicLangs: ({ lang }) => lang.basic,
      commonLangs: ({ lang }) => lang.common,
    }),
  },
};
