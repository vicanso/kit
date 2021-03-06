import { mapState, mapActions } from 'vuex';
import _ from 'lodash';

import {
  formatDate,
} from '@/helpers/utils';

export default {
  data() {
    return {
      users: null,
      mode: '',
      form: {},
      defaultRoles: [
        'admin',
        'tester',
      ],
    };
  },
  methods: {
    ...mapActions([
      'userList',
      'userIsAdmin',
    ]),
    // 进入编辑模式
    goToEdit(index) {
      const modifyRoles = {};
      const {
        userInfo,
        defaultRoles,
      } = this;
      const modifyItem = this.users[index];
      _.forEach(defaultRoles, (role) => {
        let disabled = false;
        if (role === 'admin' && !_.includes(userInfo.roles, 'su')) {
          disabled = true;
        }
        modifyRoles[role] = {
          disabled,
          checked: _.includes(modifyItem.roles, role),
        };
      });
      this.form = _.extend({
        modifyRoles,
      }, _.pick(this.users[index], [
        '_id',
        'account',
        'roles',
      ]));
      this.editIndex = index;
      this.mode = 'form';
    },
    // 回到列表模式
    backToList() {
      this.mode = '';
    },
    async submit() {
      const {
        form,
        users,
        editIndex,
      } = this;
      const roles = [];
      const orginalItem = users[editIndex];
      _.forEach(form.modifyRoles, (item, name) => {
        if (item.checked) {
          roles.push(name);
        }
      });
      const done = () => {
        this.mode = '';
      };
      if (orginalItem.roles.sort().join('') === roles.sort().join('')) {
        done();
        return;
      }
      const close = this.$lockLoading();
      try {
        await this.userUpdateRoles({
          // eslint-disable-next-line
          id: form._id,
          roles,
        });
        orginalItem.roles = roles;
        done();
      } catch (err) {
        this.$alert(err);
      } finally {
        close();
      }
    },
  },
  computed: {
    ...mapState({
      userInfo: ({ user }) => user.info,
      basicLangs: ({ lang }) => lang.basic,
      userLangs: ({ lang }) => lang.user,
    }),
  },
  async beforeMount() {
    if (!this.userInfo.isAdmin) {
      return;
    }
    const close = this.$lockLoading();
    try {
      const {
        body,
      } = await this.userList();
      const users = body.items;
      _.forEach(users, (item) => {
        item.lastLoginedAt = formatDate(item.lastLoginedAt);
      });
      this.users = users;
    } catch (err) {
      this.$alert(err);
    } finally {
      close();
    }
  },
};
