export default {
  name: 'image-view',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // 如果为true则加载img
      startToLoading: false,
    };
  },
  mounted() {
    const io = new IntersectionObserver((entries) => {
      const target = entries[0];
      // 在元素可见时加载图标，并做diconnect
      if (target.isIntersecting) {
        this.startToLoading = true;
        io.disconnect();
      }
    });
    io.observe(this.$el);
  },
};
