import { renderHook, act } from '@testing-library/react-hooks';
import { useCartStore } from './';

describe('Cart Store', () => {
    it('should return open equals false as initial state', async () => {
        const { result } = renderHook(() => useCartStore())
        expect(result.current.state.open).toBe(false)
    });
    it('should toggle open state', async () => {
        const { result } = renderHook(() => useCartStore())
        const toggle = result.current.actions.toggle

        act(() => toggle())
        expect(result.current.state.open).toBe(true)

        act(() => toggle())
        expect(result.current.state.open).toBe(false)
    });
});