import {http, httpFile} from "../../../apiService/http_service";

export const get_all_products = ({commit}) => {
    return http().get('/products').then((response) => {
        commit('SET_PRODUCTS', response.data.products);
    });
};

export const add_products = ({commit}, data) => {
    return httpFile().post('/products/store', data).then((response) => {
        commit('ADD_PRODUCTS', response.data);
    });
};

export const update_product = ({commit}, {id, data}) => {
    return httpFile().post(`/products/update/${id}`, data).then((response) => {
        commit('UPDATE_PRODUCTS', response.data);
    });
};

export const delete_image = ({commit}, id) => {
    return http().post(`/products/delete_image/${id}`).then((response) => {
        commit('DELETE_PRODUCT_IMAGE', response.data.updateProducts);
    });
};

export const delete_product = ({commit}, id) => {
    commit('DELETE_PRODUCTS',id);
    return http().delete(`/products/destroy/${id}`);
};