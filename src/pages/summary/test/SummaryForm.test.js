import SummaryForm from "../SummaryForm";
import { screen, render, fireEvent } from "@testing-library/react";

test('Initial conditions', () => {
  render(<SummaryForm/>)
  const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
  expect(checkbox).not.toBeChecked();

  const  confirmButton = screen.getByRole('button', {name: /confirm order/i})
  expect(confirmButton).toBeDisabled()
})

test('Checkbox enables button on first click and disables on second click', () => {
  render(<SummaryForm/>)
  const termsCheckbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
  const checkoutBtn = screen.getByRole('button', {name: /confirm order/i})
  fireEvent.click(termsCheckbox)
  expect(checkoutBtn).toBeEnabled();
  fireEvent.click(termsCheckbox)
  expect(checkoutBtn).toBeDisabled()
})
