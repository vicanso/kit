<template lang='pug'>
  div(:class='$style.userInfo')
    span(:class='$style.greeting')
      | Welcome!
    span(:class='$style.username' v-if="userInfo")
      | {{ userInfo.anonymous ? 'anonymous' : userInfo.account }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      loading  : ({ user }) => user.loading,
      userInfo : ({ user }) => user.info,
      error    : ({ user }) => user.error,
    }),
  },
  async beforeMount() {
    if (this.error) {
      this.$message({
        showClose: true,
        message  : this.error.message,
        type     : 'error',
      });
    }
  },
};
</script>

<style lang="postcss" module>
.greeting
  margin-right: 10px
</style>
