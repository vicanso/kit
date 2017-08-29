<template lang='pug'>
  div(
    :class='$style.slideWrapper'
  )
    h1.tac Thanks for downloading the best PDF Editor for your Mac!
    el-carousel(
      type='card'
    )
      el-carousel-item(
        :class='$style.slide'
        v-for='item in items'
        :key='item'
      )
        img(:src='item')
</template>


<script src='./home.js'></script>
<style src='@/assets/styles/home.sss' lang="postcss" module></style>