import {
  REGISTER,
} from '@/constants/url';

export default {
  data() {
    return {
      form: {},
      REGISTER,
    };
  },
  methods: {
    submit: function submit() {
      console.dir(this.form);
    },
  },
};
