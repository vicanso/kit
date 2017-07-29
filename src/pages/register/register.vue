<template lang='pug'>
  div
    header
      a.left.tac(href='javascript:;', @click.prevent='$router.go(-1)')
        i.iconfont.icon-back.bold
      .tac Register 
      .right.login.tac
        router-link.block(:to='LOGIN', title='login')
          i.iconfont.icon-account.bold
    form.pure-form(@submit.prevent='submit')
      fieldset
        legend Register your account
        input(type='text', placeholder='Account', v-model='form.account', v-focus='true')
        input(type='text', placeholder='Email', v-model='form.email')
        input(type='password', placeholder='Password', v-model='form.password')
        button.prue-button.pure-button-primary(type='submit') Register
  
</template>

<script src='./register.js'></script>
<style src='./register.styl', lang='stylus', scoped></style>
