import create from 'zustand';

const initialState = {
    open: false,
    products: [],
};

export const useCartStore = create(set => ({
    state: { ...initialState },
    actions: {
        reset: () => set(({ state }) => ({ state: { ...state, ...initialState } })),
        toggle: () => set(({ state }) => ({ state: { ...state, open: !state.open } })),
        add: (product) => set(({ state }) => ({
            state: {
                open: true,
                products: [...state.products, product]
            }
        })),
    },
}))