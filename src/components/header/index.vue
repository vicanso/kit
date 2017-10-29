<template lang='pug'>
  header(
    :class='$style.header'
  )
    .pull-right(
      :class='$style.languageSeletor'
    )
      el-dropdown
        span.el-dropdown-link
          | Langs 
          i.el-icon-arrow-down.el-icon--right
        el-dropdown-menu(
          slot='dropdown'
        )
          el-dropdown-item English 
          el-dropdown-item 中文
    .pull-right(
      :class='$style.functions'
    )
      div(
        v-if='!userInfo.account'
      )
        a(
          href='javascript:;'
          @click='login'
          title='login'
        ) 
          i.font18.bold.iconfont.icon-account
        a(
          href='javascript:;'
          @click='register'
          title='register'
        )
          i.font20.bold.iconfont.icon-shape01
      el-dropdown(
        :class='$style.user'
      )
        span.el-dropdown-link
          i.el-icon-setting
          | {{ userInfo.account }}
        el-dropdown-menu(
          slot='dropdown'
        )
          el-dropdown-item(
            @click.native='logout'
          ) logout

</template>

<script src='./header.js'></script>
<style src='./header.sss' lang='postcss' module></style>
