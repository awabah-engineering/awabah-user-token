<template>
  <div class="error-msg" :class="[status === 'success' ? 'success' : 'error']">
    <p>{{ toastMsg }}</p>
  </div>
</template>

<script>
export default {
  props: {
    toastMsg: {
      type: String,
      default: undefined,
    },
    status: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
.error-msg {
  width: 100%;
  padding: 10px;
  text-align: center;
  p {
    margin: 0;
    font-size: 13px;
  }
}

.success {
  background: #225439;
  color: white;
}

.error {
  background-color: #ff0000bd;
  color: white;
}
</style>
