import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const doSearch = jest.fn();

describe('Search', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  const renderSearch = () => {
    render(<Search doSearch={doSearch} />);
  };

  it('should render a form', () => {
    renderSearch();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should render a input type equals search', () => {
    renderSearch();
    const input = screen.getByRole('searchbox');
    expect(input).toHaveProperty('type', 'search');
  });

  it('should call props.doSearch() when form is submitted', async () => {
    renderSearch();
    const form = screen.getByRole('form');
    await fireEvent.submit(form);
    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  it('should call props.doSearch() with user input', async () => {
    renderSearch();
    const inputText = 'some text';
    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, inputText);
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledWith(inputText);
  });

  it('should call doSearch when search input is cleared', async () => {
    renderSearch();
    const inputText = 'some text';
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, inputText);
    await userEvent.clear(input)

    expect(doSearch).toHaveBeenCalledTimes(1);
    expect(doSearch).toHaveBeenCalledWith('');
  });
});
