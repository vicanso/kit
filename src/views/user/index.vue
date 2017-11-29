<template lang='pug'>
  mixin UsersTable
    el-table(
      :data='users'
    )
      el-table-column(
        :label='userLangs.account'
        prop='account'
      )
      el-table-column(
        :label='userLangs.email'
        prop='email'
      )
      el-table-column(
        :label='userLangs.roles'
        prop='roles'
      )
      el-table-column(
        :label='userLangs.lastLoginedAt'
        prop='lastLoginedAt'
      )
      el-table-column(
        :label='basicLangs.operation'
      )
        template(
          slot-scope='scope'
        )
          a.capitalize(
            href='javascript:;'
            @click='goToEdit(scope.$index)'
          ) {{ basicLangs.edit }}
  mixin EditorForm
    el-form(
      :model='form'
      label-width='80px'
    )
      el-form-item(
        :label='userLangs.account'
      )
        el-input(
          disabled
          v-model='form.account'
        )
      el-form-item(
        :label='userLangs.roles'
      )
        el-checkbox(
          v-for='role in defaultRoles'
          :key='role'
          :disabled='form.modifyRoles[role].disabled'
          v-model='form.modifyRoles[role].checked'
        ) {{ role }}
      el-form-item
        el-button.capitalize(
          type='primary'
          @click.native='submit'
        ) {{ basicLangs.update }}
        el-button.capitalize(
          @click.native='backToList'
        ) {{ basicLangs.cancel }}
  .wg-content-wrapper
    div(
      :class='$style.userWrapper'
    )
      el-alert(
        :title='basicLangs.loginFirst'
        type='info'
        center
        show-icon
        closable=false
        v-if='!userInfo.account'
      )
      el-alert(
        :title='userLangs.notAllowAcess'
        type='info'
        center
        show-icon
        closable=false
        v-else-if='!userInfo.isAdmin'
      )
      div(
        v-else-if='mode == "form"'
        :class='$style.form'
      )
        +EditorForm
      div(
        v-else
      )
        +UsersTable
</template>

<script src='./user.js'></script>
<style src='./user.sss' lang='postcss' module></style>