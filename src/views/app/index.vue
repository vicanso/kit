<template lang='pug'>
  #app
    .wg-center(
      v-if='loading'
      v-loading='loading'
      :element-loading-text='commonLangs.loading'
    )
    div(
      v-else
    )
      navigation
      main-header
      router-view
</template>

<script src='./app.js'></script>

<style src='@/assets/styles/app.sss' lang='postcss'></style>
