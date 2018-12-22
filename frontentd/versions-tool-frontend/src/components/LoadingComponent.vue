<template>
  <div></div>
</template>

<script>
export default {
  name: 'LoadingComponent',
  data() {
    return {
      loading: null,
    };
  },
  props: {
    text: {
      default: 'Please wait. Loading...',
      type: String,
    },
  },
  created() {
    this.loading = this.$loading({
      target: 'main.el-main',
      lock: true,
      text: this.text,
    });
  },
  beforeDestroy() {
    this.loading.close();
  },
};
</script>
