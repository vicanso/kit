<template>
  <header>
    Header
    <div v-if="!userInfo">Loading...</div>
    <div v-if="userInfo">
      <a href="" v-if="userInfo.anonymous">Login</a>
      <span v-if="!userInfo.anonymous">{userInfo.account}</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </header>
</template>

<script>

import {
  mapState,
  mapActions,
} from 'vuex';

export default {
  data() {
    return {
      form: {},
    };
  },
  mounted() {
    this.getUserInfo();
  },
  computed: mapState([
    'userInfo',
  ]),
  methods: mapActions([
    'getUserInfo',
  ]),
};
</script>
