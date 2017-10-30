<template lang='pug'>
  mixin I18NTabs
    el-tabs(
      v-if='categories'
      v-model='active'
    )
      el-tab-pane(
        v-for='item in categories'
        :key='item'
        :label='item'
        :name='item'
      )
        el-table(
          :data='i18ns'
          stripe=true
        )
          el-table-column(
            :label='basicLangs.name'
          )
            template(
              slot-scope='scope'
            )
              div(
                v-if='scope.$index === editIndex'
              )
                el-input(
                  type='text'
                  v-model='editItem.name'
                )
              span(
                v-else
              ) {{ scope.row.name }}
          el-table-column(
            :label='basicLangs.english'
          )
            template(
              slot-scope='scope'
            )
              div(
                v-if='scope.$index === editIndex'
              )
                el-input(
                  type='text'
                  v-model='editItem.en'
                )
              span(
                v-else
              ) {{ scope.row.en }}
          el-table-column(
            :label='basicLangs.chinese'
          )
            template(
              slot-scope='scope'
            )
              div(
                v-if='scope.$index === editIndex'
              )
                el-input(
                  type='text'
                  v-model='editItem.zh'
                )
              span(
                v-else
              ) {{ scope.row.zh }}
          el-table-column(
            :label='basicLangs.operation'
          )
            template(
              slot-scope='scope'
            )
              div(
                v-if='scope.$index === editIndex'
              )
                a.capitalize(
                  href='javascript:;'
                  @click='update'
                ) {{ basicLangs.update }}
                a.capitalize(
                  href='javascript:;'
                  @click='cancelEdit'
                ) {{ basicLangs.cancel }}
              a.capitalize(
                href='javascript:;'
                v-else
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
        v-for='item in formItems'
        :label='basicLangs[item.name]'
      )
        el-input(
          v-model='form[item.key]'
        )
      el-form-item
        el-button.capitalize(
          type='primary'
          @click.native='save'
        ) {{ basicLangs.save }}
        el-button.capitalize(
          @click.native='backToList'
        ) {{ basicLangs.cancel }}

  .wg-content-wrapper
    div(
      :class='$style.i18nWrapper'
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
        v-else-if='mode === "add"'
        :class='$style.form'
      )
        +AddForm
      div(
        v-else
      )
        +I18NTabs
</template>


<script src='./i18n.js'></script>
<style src='./i18n.sss' lang="postcss" module></style>
