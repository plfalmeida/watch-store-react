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
            add(product) {
                setState(({ state }) => {
                    state.open = true
                    if (!state.products.includes(product)) {
                        state.products.push(product)
                    }
                });
            },
            remove(product) {
                setState(({ state }) => {
                    const exists = state.products.includes(product)
                    if (exists) {
                        state.products = state.products.filter(({ id }) => id !== product.id)
                    }
                });
            },
            removeAll() {
                setState(({ state }) => {
                    state.products = []
                });
            },
            reset() {
                setState((store) => {
                    store.state = initialState
                })
            },
        },
    });
})
