export const UsersAuthModule = {
    state: () => ({
        user: ''
    }),
    getters: {
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
       USER(context, user) {
            context.commit('setUser', user)
        }
    },
    namespaced: true
}