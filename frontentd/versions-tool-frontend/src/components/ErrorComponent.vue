<template>
  <h1 class="not-found-text">
    {{ text }}
  </h1>
</template>

<script>
export default {
  name: 'ErrorComponent',
  props: {
    text: {
      default: 'Ooops, something went wrong :(',
      type: String,
    },
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';
.not-found-text {
  margin-top: 150px;
  text-align: center;
  font-size: 56px;
  color: $dangerColor;
}
</style>
