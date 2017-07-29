<template lang='pug'>
  header.main-header-wrapper.clearfix
    a.left.tac(href='javascript:;', @click.prevent='$router.go(-1)')
      i.iconfont.icon-back.bold
    .tac {{title}}
    .user.right
      div(v-if='userInfo.status === "loading"')
        | Loading...
      .tac(v-else)
        router-link.block(:to='LOGIN', v-if='userInfo.anonymous')
          i.iconfont.icon-account.bold
        span(v-if='!userInfo.anonymous') {{userInfo.account}}
</template>

<script src="./header.js"></script>
<style src="./header.styl" lang="stylus" scoped></style>
