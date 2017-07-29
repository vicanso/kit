<template lang='pug'>
  div
    main-header(title='Home')
    div(style='margin:30px')
      h3 filters
      p {{1000.123 | number}}
      p {{1000.123 | number(2)}}
      p {{'abc' | capitalize}}
</template>
<script>
import MainHeader from '@/components/header/header.vue';

export default {
  data() {
    return {};
  },
  components: {
    MainHeader,
  },
};
</script>
