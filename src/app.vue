<template lang='pug'>
  div
    transition(name='router-fade', mode='out-in')
      router-view
</template>

<script>
import {
  mapActions,
} from 'vuex';

export default {
  name: 'app',
  mounted() {
    this.getUserInfo().catch((err) => {
      console.error(err);
    });
  },
  methods: mapActions([
    'getUserInfo',
  ]),
};
</script>

<style src='./styles/global.styl', lang='stylus'></style>
