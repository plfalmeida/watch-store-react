import { screen, render } from '@testing-library/react';
import ProductCard from './product-card';

const product = {
  title: 'Pretty watch',
  price: 22.0,
  image: 'image',
};

const renderProductCard = () => {
  render(<ProductCard product={product} />);
};

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
});
