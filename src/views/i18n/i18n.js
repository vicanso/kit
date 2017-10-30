import { mapActions, mapState } from 'vuex';
import _ from 'lodash';

export default {
  data() {
    return {
      // 分类列表
      categories: null,
      // 选中的分类
      active: null,
      // i18n 的列表数据
      i18ns: null,
      // 编辑的行号
      editIndex: -1,
      editItem: null,
      editKeysList: 'name en zh'.split(' '),
      // 模式（add:新增）
      mode: '',
      // 表单元素
      form: null,
      formItems: [
        {
          name: 'Category',
          key: 'category',
        },
        {
          name: 'Name',
          key: 'name',
        },
        {
          name: 'English',
          key: 'en',
        },
        {
          name: 'Chinese',
          key: 'zh',
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      'langListOriginal',
      'langListCategory',
      'langUpdate',
      'langAdd',
    ]),
    // 开始添加i18n
    goToAdd() {
      this.form = {
        category: this.active,
      };
      this.mode = 'add';
    },
    // 回到列表模式
    backToList() {
      this.mode = '';
    },
    // 开始编辑
    goToEdit(index) {
      const {
        i18ns,
        editKeysList,
      } = this;
      this.editIndex = index;
      this.editItem = _.pick(i18ns[index], editKeysList);
    },
    // 取消编辑
    cancelEdit() {
      this.editIndex = -1;
      this.editItem = null;
    },
    // 新增加配置
    async save() {
      const close = this.$lockLoading();
      try {
        await this.langAdd(this.form);
        const currentActive = this.active;
        this.active = '';
        this.backToList();
        await this.$next();
        this.active = currentActive;
      } catch (err) {
        this.$alert(err);
      } finally {
        close();
      }
    },
    // 更新数据
    async update() {
      const {
        editIndex,
        editItem,
        i18ns,
        editKeysList,
      } = this;
      const originalItem = i18ns[editIndex];
      const updateData = {};
      _.forEach(editKeysList, (key) => {
        const value = editItem[key];
        if (value !== originalItem[key]) {
          updateData[key] = value;
        }
      });
      const done = () => {
        this.editIndex = -1;
        this.editItem = null;
      };
      if (_.isEmpty(updateData)) {
        done();
        return;
      }
      const close = this.$lockLoading();
      try {
        await this.langUpdate({
          // eslint-disable-next-line
          id: originalItem._id,
          data: updateData,
        });
        _.forEach(updateData, (v, k) => {
          originalItem[k] = v;
        });
        done();
      } catch (err) {
        this.$alert(err);
      } finally {
        close();
      }
    },
  },
  watch: {
    async active(category) {
      if (!category) {
        return;
      }
      const close = this.$lockLoading();
      try {
        this.editIndex = -1;
        const {
          body,
        } = await this.langListOriginal(category);
        this.i18ns = body.items;
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
    }),
  },
  async beforeMount() {
    const close = this.$lockLoading();
    try {
      const {
        body,
      } = await this.langListCategory();
      this.categories = body.items.sort();
      this.active = this.categories[0];
    } catch (err) {
      this.$alert(err);
    } finally {
      close();
    }
  },
};
