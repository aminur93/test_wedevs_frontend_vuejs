import {http} from "../apiService/http_service";

export const login = ({dispatch}, data) => {

    return http().post('/auth/signin', data)
        .then(response => {
            dispatch('attempt', response.data.token);
            dispatch('setToken', response.data.token);
        });
};

export const attempt = ({commit, state}, token) => {
    if (token){
        commit('SET_TOKEN', token);
    }

    if (!state.token) {
        return
    }

    try {
        return http().get('/auth/me')
            .then(response => {
                commit('SET_USER', response.data);
            });
    }catch (e) {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
    }
};

export const setToken = (_, token) => {
    localStorage.setItem('token', token);
};

export const logout = ({commit}) => {

    return http().get('/auth/signout')
        .then(response => {

            console.log(response.data.message);

            commit('SET_TOKEN', null);
            commit('SET_USER', null);

            localStorage.removeItem('token');
        });
};