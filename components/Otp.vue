<template>
  <div ref="otpCont">
    <input
      type="password"
      class="digit-box"
      v-for="(el, ind) in digits"
      :key="el + ind"
      v-model="digits[ind]"
      :autofocus="ind === 0"
      maxlength="1"
      @keydown="handleKeyDown($event, ind)"
      :class="[isClicked && digits[ind] === '' ? 'error-border' : '']"
    />
    <small class="has-error" v-if="digits[ind] === '' && isClicked">{{
      error
    }}</small>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const props = defineProps({
  default: String,

  digitCount: {
    type: Number,
    required: true,
  },
  error: {
    type: String,
    default: undefined,
  },
  isClicked: {
    type: Boolean,
    default: false,
  },
});

const digits = reactive([]);

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i);
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null;
  }
}

const otpCont = ref(null);

const emit = defineEmits(["update:otp"]);

const isDigitsFull = function () {
  for (const elem of digits) {
    if (elem == null || elem == undefined) {
      return false;
    }
  }

  return true;
};

const handleKeyDown = function (event, index) {
  if (
    event.key !== "Tab" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[index] = null;
    otpCont.value.children[index].value = "";

    if (index != 0) {
      otpCont.value.children[index - 1].focus();
    }

    return;
  }

  if (new RegExp("^([A-Za-z0-9])$").test(event.key)) {
    digits[index] = event.key;
    otpCont.value.children[index].value = digits[index];

    if (index != props.digitCount - 1) {
      otpCont.value.children[index + 1].focus();
    }

    if (isDigitsFull()) {
      emit("update:otp", digits.join(""));
    }
  }
};
</script>

<style scoped>
.digit-box {
  padding: 0px;
  margin: 0px 2px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgb(243, 243, 243);
  width: 100%;
  height: 65px;
  transition: border-color 200ms ease-out 0s;
  max-width: 70px;
  border-radius: 6px;
  color: rgb(51, 51, 51);
  font-size: 1.8rem;
  font-weight: 600;
  text-transform: none;
}
.digit-box:focus,
.digit-box:focus-visible {
  outline: none;
  border: 1px solid rgb(61, 102, 61) !important;
}

.has-error {
  color: red;
}

.error-border {
  border: 1px solid red;
}
</style>
