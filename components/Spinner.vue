<template>
  <div class="spinner"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.spinner {
  width: 10px;
  height: 10px;
  border: 3px solid white;
  border-top-color: transparent;
  animation: spinner 600ms linear 0s infinite normal forwards;
  border-radius: 50%;

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  &.thin {
    border-width: 2px;
  }

  &.thick {
    border-width: 5px;
  }
}
</style>
