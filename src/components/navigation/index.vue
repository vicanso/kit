<template lang='pug'>
  nav(
    :class='$style.navWrapper'
  )
    .font24(
      :class='$style.logo'
    ) KIT 
    el-menu
      el-submenu(
        v-for='item, $index in items'
        :index='"" + $index'
        :key='item.name'
      )
        template(
          slot='title'
        ) {{ basicLangs[item.name] }} 
        el-menu-item(
          v-for='subItem, $subIndex in item.items'
          :index='$index + "-" + $subIndex'
          :key='subItem.name'
          @click.native='go(subItem)'
        ) {{ basicLangs[subItem.name] }}
</template>

<script src='./navigation.js'></script>
<style src='./navigation.sss' lang='postcss' module></style>

