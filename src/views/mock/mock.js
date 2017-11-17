import { mapActions, mapState } from 'vuex';
import _ from 'lodash';

const MOCK_KEYS = 'account url status disabled response description'.split(' ');

function convertToView(item) {
  if (item.disabled) {
    item.disabled = '1';
  } else {
    item.disabled = '0';
  }
  if (item.response) {
    item.response = JSON.stringify(item.response);
  }
}

function convertToAPI(item) {
  if (_.isUndefined(item.disabled)) {
    return;
  }
  if (item.disabled === '1') {
    item.disabled = true;
  } else {
    item.disabled = false;
  }
}

export default {
  data() {
    return {
      mocks: null,
      mode: '',
      form: null,
      editIndex: -1,
    };
  },
  methods: {
    ...mapActions([
      'mockList',
      'mockAdd',
      'mockUpdate',
    ]),
    // 进入添加模式
    goToAdd() {
      this.form = {};
      this.mode = 'form';
    },
    // 进入编辑模式
    goToEdit(index) {
      this.form = _.pick(this.mocks[index], ['_id'].concat(MOCK_KEYS));
      this.editIndex = index;
      this.mode = 'form';
    },
    // 返回列表页
    backToList() {
      this.mode = '';
    },
    // 添加或更新mock
    async submit() {
      const {
        form,
        mocks,
        editIndex,
      } = this;
      const close = this.$lockLoading();
      // 添加记录
      const add = async (data) => {
        convertToAPI(data);
        const {
          body,
        } = await this.mockAdd(data);
        convertToView(body);
        mocks.push(body);
      };
      // 更新记录
      const update = async (id, data) => {
        const originalItem = mocks[editIndex];
        const updateData = {};
        _.forEach(MOCK_KEYS, (key) => {
          const value = data[key];
          if (value !== originalItem[key]) {
            updateData[key] = value;
          }
        });
        if (_.isEmpty(updateData)) {
          return;
        }
        if (updateData.response) {
          updateData.response = JSON.parse(updateData.response);
        }
        // 更新前将参数做转换
        convertToAPI(updateData);
        await this.mockUpdate({
          id,
          data: updateData,
        });
        convertToView(updateData);
        // eslint-disable-next-line
        const found = _.find(mocks, item => item._id === id);
        _.forEach(updateData, (v, k) => {
          found[k] = v;
        });
      };
      try {
        // eslint-disable-next-line
        const id = form._id;
        if (!id) {
          await add(form);
        } else {
          await update(id, _.omit(form, ['_id']));
        }
        this.mode = '';
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
    const close = this.$lockLoading();
    try {
      const {
        body,
      } = await this.mockList();
      const items = body.items;
      _.forEach(items, convertToView);
      this.mocks = items;
    } catch (err) {
      this.$alert(err);
    } finally {
      close();
    }
  },
};
