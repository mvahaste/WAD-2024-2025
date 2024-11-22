import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [],
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await fetch(
          "https://api.npoint.io/8a752e6d7ecbd9311040",
        );
        const data = await response.json();
        const postsList = Object.values(data);

        commit("setPosts", postsList);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
  },
  modules: {},
});
