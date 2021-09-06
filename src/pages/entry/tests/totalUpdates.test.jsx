import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

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

// { name: 'Cherries', imagePath: '/images/cherries.png' },
// { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
// { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
