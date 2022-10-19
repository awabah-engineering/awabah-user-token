<template>
  <div class="container">
    <div v-if="isVisible">
      <Toast :toastMsg="msg" :status="status" />
    </div>
    <div class="logo">
      <img src="https://dashboard.awabahng.com/assets/images/logo.png" />
    </div>
    <form @submit.prevent="login">
      <Input
        id="fname"
        placeholder="Enter email address"
        label="Email Address"
        type="email"
        v-model.trim="email"
        error="Enter a valid email address"
        :isClicked="isClicked"
      />
      <div class="pwd">
        <Input
          id="pwd"
          label="Password"
          placeholder="Enter password"
          :type="type"
          error="Password is required"
          v-model.trim="password"
          :isClicked="isClicked"
        />

        <span class="icon is-small is-right" @click="toggleShow">
          <i
            class="fas"
            :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"
          ></i>
        </span>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="disabled">
        <p>
          Sign in <span v-if="isLoading"><Spinner /></span>
        </p>
      </button>
      <div class="option-sec">
        <p>New Here?<nuxt-link to="/signup"> Sign up for Awabah</nuxt-link></p>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isClicked: false,
      isLoading: false,
      disabled: false,
      isVisible: false,
      status: "",
      msg: "",
      showPassword: true,
      type: "password",
    };
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
  },
  methods: {
    login() {
      this.isClicked = true;

      if (this.email == "" || this.password == "") {
        return;
      }
      this.disabled = true;
      this.isLoading = true;

      const data = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("loginUser", data)
        .then((res) => {
          this.isVisible = true;
          this.status = "success";
          this.msg = "Login successful";
          setTimeout(() => {
            this.isVisible = false;
            this.$router.push("dashboard");
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
    toggleShow() {
      if (this.type == "password") {
        this.type = "text";
        this.showPassword = false;
      } else {
        this.type = "password";
        this.showPassword = true;
      }
    },
  },
};
</script>
<style lang="scss">
.container {
  background-color: white;
  .logo {
    text-align: center;
    margin: 10% auto 2%;
    img {
      max-width: 200px;
    }
  }
  form {
    display: grid;
    gap: 1.714rem;
    width: 30%;
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
    .option-sec {
      text-align: center;
      font-size: 14px;
      a {
        text-decoration: none;
        color: #3d663d;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .pwd {
    position: relative;
    span {
      position: absolute;
      top: 50%;
      right: 0;
      margin-right: 18px;
    }
  }
}
</style>
