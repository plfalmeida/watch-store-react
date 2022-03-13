import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';

const doSearch = jest.fn();

describe('Search', () => {
  const makeSut = () => {
    render(<Search doSearch={doSearch} />);
  };

  it('should render a form', () => {
    makeSut();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should call props.doSearch() when form is submitted', async () => {
    makeSut();
    const form = screen.getByRole('form');
    await fireEvent.submit(form);
    expect(doSearch).toHaveBeenCalledTimes(1);
  });
});
