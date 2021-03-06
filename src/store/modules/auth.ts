import api from '../../mocks/mock-api';
import router from '../../router';

const TOKEN_KEY = 'access_token';

const authToken = localStorage.getItem(TOKEN_KEY);

const authState = {
    loggedIn: !!authToken,
    token: authToken,
    wrongInfo: false
};

const actions = {
    login({ commit, state }, info: { userName: string, password: string, redirect: string }) {
        commit('setWrongInfo', false);

        api.login(info.userName, info.password)
            .then((res) => {
                commit('setLoginState', { loggedIn: true, token: res.token });
                router.push(info.redirect || 'post-list');
            })
            .catch(() => {
                commit('setWrongInfo', true);
            });
    },

    logOut({ commit }) {
        commit('setLoginState', { loggedIn: false, token: null });
        router.push('login');
    }
};

const mutations = {
    setWrongInfo(state, wrongInfo) {
        state.wrongInfo = wrongInfo;
    },

    setLoginState(state, { loggedIn, token }) {
        state.loggedIn = loggedIn;
        state.token = token;

        if (loggedIn) {
            localStorage.setItem(TOKEN_KEY, token);
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
    }
};

export default {
    namespaced: true,
    state: authState,
    actions,
    mutations
};
