<template lang='pug'>
  header.main-header-wrapper.clearfix
    a.back.tac(href='javascript:;', @click.prevent='$router.go(-1)')
      i.el-icon-arrow-left
    .tac {{title}}
    .user
      div(v-if='!userInfo')
        i.el-icon-loading
        | Loading...
      .tac(v-if='userInfo')
        router-link(:to='LOGIN', v-if='userInfo.anonymous') Login
        span(v-if='!userInfo.anonymous') {{userInfo.account}}
</template>

<script src="./index.js"></script>
<style src="./index.styl" lang="stylus"></style>
