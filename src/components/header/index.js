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
    this.getUserInfo();
  },
  computed: mapState([
    'userInfo',
  ]),
  methods: mapActions([
    'getUserInfo',
  ]),
};
