import produce from 'immer';
import create from 'zustand';

const initialState = {
    open: false,
    products: [],
};

export const useCartStore = create(set => {
    const setState = (fn) => set(produce(fn));

    return ({
        state: { ...initialState },
        actions: {
            toggle() {
                setState(({ state }) => {
                    state.open = !state.open;
                });
            },
            reset() {
                setState((store) => {
                    store.state = initialState
                })
            },
            add(product) {
                setState(({ state }) => {
                    state.open = true
                    if (!state.products.includes(product)) {
                        state.products.push(product)
                    }
                });
            },
        },
    });
})