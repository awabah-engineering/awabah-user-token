<template>
  <div class="container">
    <div v-if="isVisible">
      <Toast :toastMsg="msg" />
    </div>
    <div class="logo">
      <img src="https://dashboard.awabahng.com/assets/images/logo.png" />
    </div>
    <div class="form-container">
      <form @submit.prevent="register">
        <Input
          id="fname"
          placeholder="First Name"
          title="First Name"
          v-model.trim="fname"
          error="Enter first name"
          :isClicked="isClicked"
        />
        <Input
          id="lname"
          placeholder="Last Name"
          title="Last Name"
          v-model.trim="lname"
          error="Enter last name"
          :isClicked="isClicked"
        />
        <Input
          id="email"
          type="email"
          placeholder="Email address"
          title="Email"
          v-model.trim="email"
          error="Enter a valid email address"
          :isClicked="isClicked"
        />
        <div class="phone-container">
          <span class="country">
            <img
              src="https://flagcdn.com/w320/ng.png"
              alt="nig"
              width="24"
              height="18"
              class="flad"
            />
            <span class="code">+234</span>
          </span>
          <Input
            id="phone"
            type="number"
            placeholder="Phone number"
            title="Phone"
            v-model.trim="phone"
            error="Enter a phone number"
            :isClicked="isClicked"
            :phone="phoneInput"
          />
        </div>
        <div class="pwd">
          <Input
            id="pwd"
            :type="type"
            placeholder="Password"
            title="Password"
            v-model.trim="password"
            error="Enter a Password"
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
            Sign up <span v-if="isLoading"><Spinner /></span>
          </p>
        </button>
        <div class="option-sec">
          <p>Already have an account? <nuxt-link to="/"> Sign in</nuxt-link></p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      isVisible: false,
      isClicked: false,
      isLoading: false,
      disabled: false,
      msg: "",
      phoneInput: true,
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
    register() {
      this.isClicked = true;

      if (
        this.email == "" ||
        this.password == "" ||
        this.fname == "" ||
        this.lname == "" ||
        this.phone == ""
      ) {
        return;
      }
      this.disabled = true;
      this.isLoading = true;

      const data = {
        firstName: this.fname,
        lastName: this.lname,
        phoneNumber: this.phone,
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("registerUser", data)
        .then((res) => {
          this.isVisible = true;
          this.status = "success";
          this.msg =
            "User Created. Please Check Your Phone For Your Token To Finish Up Registration";
          setTimeout(() => {
            this.isVisible = false;
            this.$router.push("verify");
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
<style lang="scss" scoped>
.logo {
  margin-top: 3%;
}
.phone-container {
  position: relative;
    .country {
      position: absolute;
      z-index: 10;
      align-items: center;
      align-self: baseline;
      background-color: var(--color-f3f3f3);
      border: 1px solid transparent;
      border-radius: 8px 0 0 8px;
      display: flex;
      font-size: 12px;
      gap: 0.4rem;
      height: 50px;
      padding: 0 0.15rem 0 1rem;
    }
}

.pwd {
  position: relative;
  span {
    position: absolute;
    top: 30%;
    right: 0;
    margin-right: 18px;
  }
}
</style>
