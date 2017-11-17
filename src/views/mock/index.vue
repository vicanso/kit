<template lang='pug'>
  mixin MocksTable
    el-table(
      :data='mocks'
    )
      el-table-column(
        :label='userLangs.account'
        prop='account'
      )
      el-table-column(
        :label='basicLangs.url'
        prop='url'
      )
      el-table-column(
        :label='basicLangs.status'
        prop='status'
      )
      el-table-column(
        :label='basicLangs.disabled'
        prop='disabled'
      )
      el-table-column(
        :label='basicLangs.response'
        prop='response'
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
      style='width: 100%'
      type='primary'
      @click.native='goToAdd'
    ) {{ basicLangs.add }}
  mixin AddForm
    el-form(
      :model='form'
      label-width='80px'
    )
      el-form-item(
        :label='userLangs.account'
      )
        el-input(
          v-model='form.account'
        )
      el-form-item(
        :label='basicLangs.url'
      )
        el-input(
          v-model='form.url'
        )
      el-form-item(
        :label='basicLangs.status'
      )
        el-input(
          type='number'
          v-model='form.status'
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
        :label='basicLangs.response'
      )
        el-input(
          type='textarea'
          :row='5'
          v-model='form.response'
        )
      el-form-item(
        :label='basicLangs.description'
      )
        el-input(
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
      :class='$style.mockWrapper'
    )
      el-alert(
        :title='basicLangs.loginFirst'
        type='info'
        center
        show-icon
        closable=false
        v-if='!userInfo.account'
      )
      div(
        v-else-if='mode == "form"'
        :class='$style.form'
      )
        +AddForm
      div(
        v-else
      )
        +MocksTable
</template>

<script src='./mock.js'></script>
<style src='./mock.sss' lang='postcss' module></style>