<template lang='pug'>
  div
    header
      a.left.tac(href='javascript:;', @click.prevent='$router.go(-1)')
        i.iconfont.icon-back.bold
      .tac Login
      .right.register.tac
        router-link.block(:to='REGISTER', title='register')
          i.iconfont.icon-add.bold
    form.pure-form(@submit.prevent='submit')
      fieldset
        legend Login your account
        input(type='text', placeholder='Account', v-model='form.account')
        input(type='password', placeholder='Password', v-model='form.password')
        button.prue-button.pure-button-primary(type='submit') Login
  
</template>

<script src='./login.js'></script>
<style src='./login.styl', lang='stylus', scoped></style>
