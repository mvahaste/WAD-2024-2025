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
    addLike(state, id) {
      const post = state.posts.find(post => post.id === id);
      post.likes += 1;
    },
  },
  actions: {
    // Fetch all posts from api
    async fetchPosts({ commit }) {
      try {
        const response = await fetch(
          "https://api.npoint.io/8d4a7dbc01c2b985b5ea",
        );
        const data = await response.json();
        const postsList = Object.values(data);

        commit("setPosts", postsList);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    addLike({ commit }, id) {
      commit("addLike", id);
    },
  },
  modules: {},
});
