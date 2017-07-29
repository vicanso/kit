import {
  mapState,
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
  computed: mapState([
    'userInfo',
  ]),
};
