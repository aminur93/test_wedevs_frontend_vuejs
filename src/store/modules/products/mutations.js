export const SET_PRODUCTS = (state, products) => {
   state.products = products;
};

export const ADD_PRODUCTS = (state, products) => {
   state.products.push(products);
};

export const UPDATE_PRODUCTS = (state, data) => {
    state.products.push(data);
};

export const DELETE_PRODUCT_IMAGE = (state, data) => {
    state.products = data;
};

export const DELETE_PRODUCTS = (state, id) => {
  state.products = state.products.filter(item => {
     return item.id !== id;
  })
};