import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when changed', async () => {
  render(<Options optionType="toppings" />);
  const toppingsSubtotal = screen.getByText('Toppings total:', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // check Cherries checkbox and check subtotal
  const CherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(CherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // check M&Ms checkbox and check subtotal
  const MnMsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
  userEvent.clear(MnMsCheckbox);
  userEvent.click(MnMsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  // remove M&Ms and check subtotal
  userEvent.click(MnMsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    // verify that grand total starts at $0.00
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    // update vanilla and check grand total
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    // update vanilla and check grand total
    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('1.50');

    // update vanilla and check grand total
    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '2');
    expect(grandTotal).toHaveTextContent('5.50');

    // remove 1 Vanilla and check grand total
    userEvent.type(vanillaScoop, '1');
    expect(grandTotal).toHaveTextContent('3.50');

    // remove Cherry and check grand total
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
