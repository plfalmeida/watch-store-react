import { screen, render, fireEvent } from '@testing-library/react';
import CartItem from './cart-item';
import userEvent from '@testing-library/user-event'
import { renderHook } from '@testing-library/react-hooks';
import { useCartStore } from '../store/cart';
import {setAutoFreeze} from 'immer';

setAutoFreeze(false);

const product = {
  title: 'Pretty watch',
  price: 22.0,
  image: 'https://picsum.photos/400/400',
};

const renderCartItem = () => {
  render(<CartItem product={product} />);
};

describe('CartItem', () => {
  it('should render CartItem', () => {
    renderCartItem();
    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    renderCartItem();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument();

    const image = screen.getByTestId('image');
    expect(image).toHaveProperty('src', product.image);
    expect(image).toHaveProperty('alt', product.title);
  });

  it('should display 1 as the initial quantity', () => {
    renderCartItem();
    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  it('should increase quantity by 1 when clicking + button', async () => {
    renderCartItem();

    const buttonIncrease = screen.getByTestId('increase');

    await fireEvent.click(buttonIncrease);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it('should decrease quantity by 1 when clicking - button', async () => {
    renderCartItem();

    const buttonDecrease = screen.getByTestId('decrease');
    const buttonIncrease = screen.getByTestId('increase');

    const quantity = screen.getByTestId('quantity');

    await fireEvent.click(buttonIncrease);
    expect(quantity.textContent).toBe('2');

    await fireEvent.click(buttonDecrease);
    expect(quantity.textContent).toBe('1');
  });

  it('should not decrease quantity below 0', async () => {
    renderCartItem();
    const buttonDecrease = screen.getByTestId('decrease');
    const quantity = screen.getByTestId('quantity');

    expect(quantity.textContent).toBe('1');

    await fireEvent.click(buttonDecrease);
    await fireEvent.click(buttonDecrease);

    expect(quantity.textContent).toBe('0');
  });

  it('should call remove()', async () => {
    const result = renderHook(() => useCartStore()).result;
    const spy = jest.spyOn(result.current.actions, 'remove')

    renderCartItem();

    const button = screen.getByRole('button', { name: /remove/i });

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(product);
  })
});
