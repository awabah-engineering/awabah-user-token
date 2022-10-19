<template>
  <div class="container">
    <div v-if="isVisible">
      <Toast :toastMsg="msg" :status="status" />
    </div>
    <div class="logo">
      <img src="https://dashboard.awabahng.com/assets/images/logo.png" />
    </div>

    <div class="pin-container">
      <h2>Enter verification code</h2>
      <p>A 6-digit code was sent to your phone number</p>
      <Otp
        :digit-count="6"
        @update:otp="handleOTPValue"
        error="Enter a valid email address"
        :isClicked="isClicked"
      ></Otp>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="disabled"
        @click="verify"
      >
        <p>
          Verify Token <span v-if="isLoading"><Spinner /></span>
        </p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otpValue: "",
      isClicked: false,
      isLoading: false,
      disabled: false,
      isVisible: false,
      status: "",
    };
  },
  methods: {
    handleOTPValue(value) {
      this.otpValue = value;
    },

    verify() {
      this.isClicked = true;

      if (this.otpValue === "") {
        return;
      }
      this.disabled = true;
      this.isLoading = true;

      const data = {
        token: this.otpValue,
      };
      this.$store
        .dispatch("verifyToken", data)
        .then((res) => {
          this.isVisible = true;
          this.status = "success";
          this.msg = "Login successful";
          setTimeout(() => {
            this.isVisible = false;
            this.$router.push("/");
          }, 5000);
          this.isLoading = false;
          this.disabled = false;
        })
        .catch((error) => {
          if (error) {
            this.isVisible = true;
            this.status = "error";
            this.msg = error?.response?.data?.message;
            setTimeout(() => (this.isVisible = false), 5000);
            this.isLoading = false;
            this.disabled = false;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.pin-container {
  width: 32%;
  margin: auto;
  background-color: white;
  .btn-primary {
    align-items: center;
    background-color: #3d663d;
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 16px 2rem;
    width: 100%;
    margin-top: 8%;
    &[disabled] {
      background-color: #3d663d4f;
    }
    p {
      margin: 0;
      display: flex;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
