<template lang='pug'>
  div
    transition(name='router-fade', mode='out-in')
      router-view
</template>

<script>
export default {
  name: 'app',
};
</script>

<style src="./styles/global.styl", lang="stylus"></style>
