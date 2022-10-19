<template>
  <div>
    <section class="topbar">
      <div class="topbar-header">
        <div class="logo">
          <img
            src="https://dashboard.awabahng.com/assets/images/logo.png"
            alt="Awabah Logo"
          />
        </div>
      </div>
      <div class="username">
        <div class="username-container">
          <p>{{ user?.firstName || "" }} {{ user?.lastName || "" }}</p>
          <div class="username-btn" @click="showLogout">
            <button>
              {{ user?.firstName?.[0] || "" }} {{ user?.lastName?.[0] || "" }}
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="iconify iconify--akar-icons"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              style="color: rgb(153, 153, 153)"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m4 9l8 8l8-8"
              ></path>
            </svg>
          </div>
        </div>
        <ul v-if="logout" class="logout-list">
          <li @click="logOut">Logout</li>
        </ul>
      </div>
    </section>

    <section class="nav">
      <ul>
        <li>Credentials</li>
      </ul>
    </section>

    <section class="token-sec">
      <h2>API Key</h2>
      <div class="input-copy">
        <Input
          label="User Token"
          type="text"
          v-model="token"
          v-on:focus="$event.target.select()"
          ref="clone"
          readonly
        />
        <div class="copy" @click="copy">
          <button>Copy</button>
          <span v-if="toolTip" class="tooltiptext">{{ toolTipText }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      token: "",
      toolTip: false,
      toolTipText: "Copied!",
      logout: false,
    };
  },
  mounted() {
    this.getUserDetails();
    this.userToken();
  },

  methods: {
    getUserDetails() {
      return this.$store.dispatch("getUser").then((res) => {
        this.user = res.data.user;
      });
    },
    userToken() {
      if (process.server ? "" : !!localStorage.getItem("token")) {
        this.token = localStorage.getItem("token");
        console.log("Token: " + this.token);
      }
    },
    showLogout() {
      this.logout = !this.logout;
    },
    showTool() {
      this.toolTip = true;
      setTimeout(() => (this.toolTip = false), 3000);
    },
    copy() {
      this.showTool();
      try {
        navigator.clipboard.writeText(this.token);
      } catch (e) {
        throw e;
      }
    },
    logOut() {
      localStorage.removeItem("token");
      window.location.href = "/";
    },
  },
};
</script>

<style lang="scss" scoped>
.topbar {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .topbar-header {
    .logo {
      img {
        width: 100px;
        padding-left: 20px;
      }
    }
  }
  .username {
    margin-left: auto;
    &-container {
      display: flex;
      align-items: center;
      .username-btn {
        border-radius: 8px;
        cursor: pointer;
        padding: 0.4rem 0.6rem;
        align-items: center;
        display: flex;
        &:hover {
          background-color: #eff2ef;
        }
      }
      p {
        text-align: end;
        font-weight: bold;
        text-transform: capitalize;
        margin-right: 15px;
      }
      button {
        border-radius: 50%;
        align-items: center;
        background-color: #3d663d;
        border-radius: 1000px;
        color: #fff;
        display: flex;
        font-weight: 500;
        height: 30px;
        justify-content: center;
        margin-right: 0.4rem;
        width: 30px;
        border: 0;
        font-size: 10px;
      }
    }
    .logout-list {
      margin: 0;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 4px 15px rgb(0 0 0 / 6%);
      list-style: none;
      min-width: 170px;
      position: absolute;
      right: 0;
      top: 7%;
      width: max-content;
      z-index: 10;
      padding: 0;
      li {
        list-style: none;
        color: #808080;
        font-size: 14px;
        padding: 10px;
        cursor: pointer;
      }
    }
  }
}

.nav {
  border-bottom: 1px solid #e5e5e5;
  ul {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    padding-left: 20px;
    color: green;
    margin-bottom: 0;
    li {
      list-style: none;
    }
  }
}

.token-sec {
  width: 30%;
  border-radius: 4px;
  background: white;
  box-shadow: 3px 3px 3px 2px grey;
  height: 250px;
  margin: 10% auto;
  padding: 3%;
  .input-copy {
    .copy {
      position: relative;
      button {
        align-items: center;
        background-color: #3d663d;
        border: none;
        border-radius: 8px;
        color: var(--text-color);
        cursor: pointer;
        display: flex;
        justify-content: center;
        padding: 16px 2rem;
        width: 20%;
        color: white;
        margin: 20px auto;
      }
      .tooltiptext {
        color: black;
        position: absolute;
        z-index: 1;
        font-size: 14px;
        top: 8%;
        right: 28%;
      }
    }
  }
}
</style>
