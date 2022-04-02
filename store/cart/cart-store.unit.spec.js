import { renderHook, act } from '@testing-library/react-hooks';
import { useCartStore } from './';
import { makeServer } from '../../miragejs/server';

describe('Cart Store', () => {
    let server;
    let result;

    beforeEach(() => {
        server = makeServer({ environment: 'test' })
        result = renderHook(() => useCartStore()).result
    })

    afterEach(() => {
        server.shutdown();
        act(() => { result.current.actions.reset() })
    })

    it('should return open equals false as initial state', async () => {
        expect(result.current.state.open).toBe(false)
    });

    it('should return an empty array for products on initial state', () => {
        expect(Array.isArray(result.current.state.products)).toBe(true)
        expect(result.current.state.products).toHaveLength(0)
    });

    it('should add products to state', () => {
        const products = server.createList('product', 2)
        const add = result.current.actions.add

        products.forEach(product => {
            act(() => add(product))
        })

        expect(result.current.state.products).toHaveLength(2)
    });

    it('should toggle open state', async () => {
        expect(result.current.state.open).toBe(false)
        expect(result.current.state.products).toHaveLength(0)
        const toggle = result.current.actions.toggle

        act(() => toggle())
        expect(result.current.state.open).toBe(true)

        act(() => toggle())
        expect(result.current.state.open).toBe(false)
        expect(result.current.state.products).toHaveLength(0)
    });
});