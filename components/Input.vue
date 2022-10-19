<template>
  <div class="form-control-group">
    <label for="uname" class="form-label">{{ label }}</label>
    <div class="input">
      <input
        class="form-control"
        :class="[
          isClicked && value === '' ? 'error-border' : '',
          phone ? 'phone-width' : '',
        ]"
        :value="value"
        @input="updateValue($event.target.value)"
        :width="width"
        v-bind="$attrs"
      />
    </div>
    <small class="has-error" v-if="value === '' && isClicked">{{
      error
    }}</small>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    error: {
      type: String,
      default: undefined,
    },
    isClicked: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: undefined,
    },
  },

  data() {
    return {
      hasError: false,
    };
  },

  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control-group {
  position: relative;
  .input {
    position: relative;
    width: 100%;
  }
  .form-label {
    color: black;
    font-family: avertaSemiBold, sans-serif;
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 4px;
  }
  .form-control {
    background-color: whitesmoke;
    border: 1px solid transparent;
    border-radius: 8px;
    display: block;
    outline: none;
    padding: 1rem 1.4rem;
    transition: border-color 0.2s ease-out;
    width: -webkit-fill-available;
    &:focus {
      border: 1px solid #3d663d;
    }
  }
  .has-error {
    color: red;
  }
  .error-border {
    border: 1px solid red;
  }

  .phone-width{
    padding-left: 80px;
  }
}
</style>
