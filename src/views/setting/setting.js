import _ from 'lodash';
import { mapState, mapActions } from 'vuex';

const modifiKeys = [
  'name',
  'disabled',
  'data',
  'description',
];

function convertToView(item) {
  if (item.data) {
    item.data = JSON.stringify(item.data);
  }
  if (item.disabled) {
    item.disabled = '1';
  } else {
    item.disabled = '0';
  }
  return item;
}

export default {
  data() {
    return {
      mode: '',
      settings: null,
      form: {},
      editIndex: -1,
    };
  },
  methods: {
    ...mapActions([
      'settingList',
      'settingUpdate',
      'settingAdd',
    ]),
    goToEdit(index) {
      const modifyItem = this.settings[index];
      this.form = _.pick(modifyItem, [
        '_id',
      ].concat(modifiKeys));
      this.editIndex = index;
      this.mode = 'form';
    },
    // 进入添加模式
    goToAdd() {
      this.form = {};
      this.mode = 'form';
    },
    // 回到列表模式
    backToList() {
      this.mode = '';
    },
    async submit() {
      const {
        form,
        settings,
        editIndex,
      } = this;
      const originalItem = settings[editIndex];
      const close = this.$lockLoading();
      try {
        const submitData = {};
        _.forEach(modifiKeys, (key) => {
          if (!originalItem || originalItem[key] !== form[key]) {
            submitData[key] = form[key];
          }
        });
        if (submitData.data) {
          submitData.data = JSON.parse(submitData.data);
        }
        if (submitData.disabled) {
          if (submitData.disabled === '1') {
            submitData.disabled = true;
          } else {
            submitData.disabled = false;
          }
        }
        if (!_.isEmpty(submitData)) {
          // eslint-disable-next-line
          const id = form._id;
          if (id) {
            await this.settingUpdate({
              id,
              data: submitData,
            });
            _.extend(originalItem, convertToView(submitData));
          } else {
            const {
              body,
            } = await this.settingAdd(submitData);
            this.settings.push(convertToView(body));
          }
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
    if (!this.userInfo.isAdmin) {
      return;
    }
    const close = this.$lockLoading();
    try {
      const {
        body,
      } = await this.settingList();
      _.forEach(body.items, convertToView);
      this.settings = body.items;
    } catch (err) {
      this.$alert(err);
    } finally {
      close();
    }
  },
};
