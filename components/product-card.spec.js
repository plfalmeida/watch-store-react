import { screen, render, fireEvent } from '@testing-library/react';
import ProductCard from './product-card';

const product = {
  title: 'Pretty watch',
  price: 22.0,
  image: 'image',
};

const renderProductCard = () => {
  render(<ProductCard product={product} addToCart={addToCart} />);
};

const addToCart = jest.fn();

describe('ProductCard', () => {
  it('should render ProductCard', () => {
    renderProductCard();
    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    renderProductCard();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.price)).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.image,
    });
  });

  it('should call props.addToCart() when button gets clicked', async () => {
    renderProductCard();
    const button = screen.getByRole('button');

    await fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
