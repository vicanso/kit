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
    };
  },
  mounted() {
    this.getUserInfo().catch((err) => {
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
