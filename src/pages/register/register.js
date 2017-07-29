import {
  mapActions,
} from 'vuex';

import _ from '@/helpers/_';
import {
  LOGIN,
} from '@/constants/url';

export default {
  data() {
    return {
      LOGIN,
      form: {},
    };
  },

  methods: {
    submit: function submit() {
      const data = _.pick(this.form, ['account', 'password', 'email']);
      this.userRegister(data).then(() => {
        this.$router.go(-2);
      }).catch((err) => {
        console.error(err);
      });
    },
    ...mapActions([
      'userRegister',
    ]),
  },
};
