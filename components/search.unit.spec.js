import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const doSearch = jest.fn();

describe('Search', () => {
  const makeSut = () => {
    render(<Search doSearch={doSearch} />);
  };

  it('should render a form', () => {
    makeSut();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should render a input type equals search', () => {
    makeSut();
    const input = screen.getByRole('searchbox');
    expect(input).toHaveProperty('type', 'search');
  });

  it('should call props.doSearch() when form is submitted', async () => {
    makeSut();
    const form = screen.getByRole('form');
    await fireEvent.submit(form);
    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  it('should call props.doSearch() with user input', async () => {
    makeSut();
    const inputText = 'some text';
    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, inputText);
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledWith(inputText);
  });
});
