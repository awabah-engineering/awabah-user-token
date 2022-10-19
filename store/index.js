export const state = () => ({
  users: {},
});

export const mutations = {
  updateUserData: (state, data) => {
    state.users = data;
  },
};

export const actions = {
  async loginUser({ commit }, data) {
    const res = await this.$axios.post(
      "https://api-staging-customer.awabahng.com/api/v1/awabah/auth/login",
      data
    );
    localStorage.setItem("token", res.data.data.token);
  },

  async registerUser({ commit }, data) {
    const res = await this.$axios.post(
      "https://api-staging-customer.awabahng.com/api/v1/awabah/auth/register",
      data
    );
  },

  async getUser({ state, commit }) {
    const res = await this.$axios.get(
      "https://api-staging-customer.awabahng.com/api/v1/awabah/user",
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    commit("updateUserData", res.data.data.user);
    return res.data;
  },

  async verifyToken({ commit}, data) {
    const res = await this.$axios.post(
      "https://api-staging-customer.awabahng.com/api/v1/awabah/verification/phone-number",
      data
    );
    console.log(res);
  }
};
