<template lang='pug'>
  header.main-header-wrapper.clearfix
    a.back.tac(href='javascript:;', @click.prevent='$router.go(-1)')
      i.iconfont.icon-back.bold
    .tac {{title}}
    .user
      div(v-if='status === "loading"')
        | Loading...
      .tac(v-else)
        router-link(:to='LOGIN', v-if='userInfo.anonymous') Login
        span(v-if='!userInfo.anonymous') {{userInfo.account}}
</template>

<script src="./header.js"></script>
<style src="./header.styl" lang="stylus" scoped></style>
