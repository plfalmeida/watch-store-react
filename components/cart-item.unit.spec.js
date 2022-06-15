import { screen, render, fireEvent } from '@testing-library/react';
import CartItem from './cart-item';
import userEvent from '@testing-library/user-event'
import { renderHook } from '@testing-library/react-hooks';
import { useCartStore } from '../store/cart';
import { setAutoFreeze } from 'immer';

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
  let result;

  beforeEach(() => {
    result = renderHook(() => useCartStore()).result;
  })

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

  it('should call increase when clicking + button', async () => {
    const spy = jest.spyOn(result.current.actions, 'increase');
    renderCartItem();

    const buttonIncrease = screen.getByTestId('increase');

    await userEvent.click(buttonIncrease);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });

  it('should call decrease when clicking - button', async () => {
    const spy = jest.spyOn(result.current.actions, 'decrease');
    renderCartItem();

    const buttonDecrease = screen.getByTestId('decrease');

    await userEvent.click(buttonDecrease);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
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
