import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import createPertistedState from "vuex-persistedstate";
import router from "../router/index";
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPertistedState()],
  state: {
    auth: "",
    user:"",
  },
  mutations: {
    auth(state,payload) {
      state.auth = payload;
    },
    user(state,payload) {
      state.user = payload;
    },
    logout(state, payload) {
      state.auth = payload;
    },
    changeUserData(state,payload) {
      state.user.profile = payload;
    },
  },
  actions: {
    async login({commit},{email, password}) {
      const responseLogin = await axios.post(
        "",
        {
          email: email,
          password: password,
        }
      );
      const responseUser = await axios.post(
        "",
        {
          params: {
            email:email,
          },
        }
      );
      commit("auth", responseLogin.data.auth);
      commit("user",responseUser.data.data[0]);
      router.replace("/home");
    },
    logout({commit}) {
      axios
      .post("herokuのURL/api/logout", {
        auth: this.state.auth,
      })
      .then((response) => {
        console.log(response);
        commit("logout", response.data.auth);
        router.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
});
