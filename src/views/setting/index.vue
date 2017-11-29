<template lang='pug'>
  mixin SettingsTable
    el-table(
      :data='settings'
    )
      el-table-column(
        :label='basicLangs.name'
        prop='name'
      )
      el-table-column(
        :label='basicLangs.setting'
        prop='data'
      )
      el-table-column(
        :label='basicLangs.disabled'
        prop='disabled'
      )
      el-table-column(
        :label='basicLangs.description'
        prop='description'
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
    el-button.capitalize.mtop10(
      v-if='userInfo.isAdmin'
      style='width: 100%'
      type='primary'
      @click.native='goToAdd'
    ) {{ basicLangs.add }}
  mixin EditorForm
    el-form(
      :model='form'
      label-width='80px'
    )
      el-form-item(
        :label='basicLangs.name'
      )
        el-input(
          v-model='form.name'
        )
      el-form-item(
        :label='basicLangs.disabled'
      )
        el-radio(
          v-model='form.disabled'
          label='1'
        ) 
          span.uppercase {{ basicLangs.yes }}
        el-radio(
          v-model='form.disabled'
          label='0'
        )
          span.uppercase {{ basicLangs.no }}
      el-form-item(
        :label='basicLangs.setting'
      )
        el-input(
          type='textarea'
          :rows='5'
          v-model='form.data'
        )
      el-form-item(
        :label='basicLangs.description'
      )
        el-input(
          type='textarea'
          :rows='3'
          v-model='form.description'
        )
      el-form-item
        el-button.capitalize(
          type='primary'
          @click.native='submit'
        ) {{ form._id ? basicLangs.update : basicLangs.save }}
        el-button.capitalize(
          @click.native='backToList'
        ) {{ basicLangs.cancel }}
  .wg-content-wrapper
    div(
      :class='$style.settingWrapper'
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
        +SettingsTable
</template>

<script src='./setting.js'></script>
<style src='./setting.sss' lang='postcss' module></style>
