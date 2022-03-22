import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../pages';
import { makeServer } from '../miragejs/server';

const renderProductList = () => {
  render(<ProductList />);
};

describe('ProductList', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should render ProductList', () => {
    renderProductList();

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  it('should render the ProductCard component 10 times', async () => {
    const product = server.createList('product', 10);
    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(10);
    })
  });
});
