import {
  mapActions,
} from 'vuex';

import _ from '@/helpers/_';

export default {
  data() {
    return {
      form: {},
    };
  },

  methods: {
    submit: function submit() {
      const data = _.pick(this.form, ['account', 'password']);
      this.userLogin(data).then(() => {
        this.$router.go(-1);
      }).catch((err) => {
        console.error(err);
      });
    },
    ...mapActions([
      'getUserInfo',
      'userLogin',
    ]),
  },
};
