import { screen, render, fireEvent } from '@testing-library/react';
import CartItem from './cart-item';

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
    const [_, button] = screen.getAllByRole('button');
    await fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it('should decrease quantity by 1 when clicking - button', async () => {
    renderCartItem();
    const [decreaseButton, increaseButton] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    await fireEvent.click(increaseButton);
    expect(quantity.textContent).toBe('2');

    await fireEvent.click(decreaseButton);
    expect(quantity.textContent).toBe('1');
  });

  it('should not decrease quantity below 0', async () => {
    renderCartItem();
    const [decreaseButton] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    expect(quantity.textContent).toBe('1');

    await fireEvent.click(decreaseButton);
    await fireEvent.click(decreaseButton);

    expect(quantity.textContent).toBe('0');
  });
});