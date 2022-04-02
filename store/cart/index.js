import create from 'zustand';

const initialState = {
    open: false,
    products: [],
};

const addProduct = (store, product) => {
    if (store.state.products.includes(product)) {
        return store.state.products;
    }
    return [...store.state.products, product];
}

export const useCartStore = create(set => ({
    state: { ...initialState },
    actions: {
        reset: () => set(({ state }) => ({ state: { ...state, ...initialState } })),
        toggle: () => set(({ state }) => ({ state: { ...state, open: !state.open } })),
        add: (product) => set((store) => ({
            state: {
                open: true,
                products: addProduct(store, product),
            }
        })),
    },
}))