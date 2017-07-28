<template lang='pug'>
  div
    header
      a.back(href='javascript:;', @click.prevent='$router.go(-1)')
        i.el-icon-arrow-left
      .tac Login
      router-link.register.tar(:to='REGISTER') Reg
    el-form.login-wrapper(ref='form', :model='form', label-width='75px')
      el-form-item(label='account')
        el-input(v-model='form.name')
      el-form-item(label='password')
        el-input(v-model='form.password', type='password')
      el-form-item(label=' ')
        el-button.submit(type='primary', @click.prevent='submit') Submit
</template>

<script src="./index.js"></script>
<style src="./index.styl" lang="stylus" scoped></style>

