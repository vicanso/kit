import {
  mapState,
  mapActions,
} from 'vuex';

import {
  LOGIN,
} from '@/constants/url';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      LOGIN,
      status: 'loading',
    };
  },
  mounted() {
    this.getUserInfo().then(() => {
      this.status = 'success';
    }).catch((err) => {
      this.status = 'error';
      console.error(err.message);
    });
  },
  computed: mapState([
    'userInfo',
  ]),
  methods: mapActions([
    'getUserInfo',
  ]),
};
