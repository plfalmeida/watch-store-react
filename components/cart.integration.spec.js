import { render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import Cart from './cart';
import { useCartStore } from '../store/cart';
import { makeServer } from '../miragejs/server';

describe('Cart', () => {
    let server;
    let result;
    let add;
    let toggle;
    let spy;

    beforeEach(() => {
        server = makeServer({ environment: 'test' })
        result = renderHook(() => useCartStore()).result
        add = result.current.actions.add
        toggle = result.current.actions.toggle
        spy = jest.spyOn(result.current.actions, 'toggle')
    })

    afterEach(() => {
        server.shutdown();
        act(() => { result.current.actions.reset() })
        jest.clearAllMocks();
    })

    it('should add css class "hidden" in the component', () => {
        render(<Cart />)
        expect(screen.getByTestId('cart')).toHaveClass('hidden');
    });

    it('should not add css class "hidden" in the component', () => {
        act(() => toggle())
        render(<Cart />)
        expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
    });

    it('should call store.toggle twice', () => {
        render(<Cart />)
        const button = screen.getByTestId('close-button')

        act(() => {
            userEvent.click(button)
            userEvent.click(button)
        })

        expect(spy).toHaveBeenCalledTimes(2)
    });

    it('should display 2 products cards', () => {
        const products = server.createList('product', 2)

        products.forEach(product => {
            act(() => add(product))
        })

        render(<Cart />)
        expect(screen.getAllByTestId('cart-item')).toHaveLength(2)
    })
});