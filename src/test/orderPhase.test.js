import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
  // render app
  render(<App />);
  // add ice cream scoops and toppings
  const vanillaScoop = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  const cherryTopping = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  // find and click order button
  // check summary information based on order
  // accept terms and conditions and click button to confirm order
  // confirm order number on confirmation page
  // click new order button on confirmation page
  // check that scoops and toppings subtotals have been reset
  // do we need to await anything to avoid test errors?
});
