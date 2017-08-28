<template lang='pug'>
  #app
    app-header
    router-view
</template>

<script>
import { mapActions } from 'vuex';
import AppHeader from '@/components/app-header';


export default {
  components: {
    AppHeader,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      'langList',
      'userGet',
    ]),
  },
  async beforeMount() {
    try {
      await this.userGet();
      await this.langList('basic');
    } catch (err) {
      this.$alert(err);
    }
  },
};
</script>

<style src='@/assets/styles/app.sss' lang='postcss'></style>
