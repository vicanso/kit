import { mapActions, mapState } from 'vuex';
import MainHeader from '@/components/header';
import Navigation from '@/components/navigation';

export default {
  components: {
    MainHeader,
    Navigation,
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    ...mapActions([
      'langList',
      'userGet',
    ]),
  },
  computed: {
    ...mapState({
      commonLangs: state => state.lang.common,
    }),
  },
  async beforeMount() {
    try {
      await this.userGet();
      await this.langList(['basic', 'user']);
      this.loading = false;
    } catch (err) {
      this.$alert(err);
    }
  },
};
