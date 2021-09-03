import SummaryForm from "../SummaryForm";
import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

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
  userEvent.click(termsCheckbox)
  expect(checkoutBtn).toBeEnabled();
  userEvent.click(termsCheckbox)
  expect(checkoutBtn).toBeDisabled()
})

test('popover responds to hover', async() => {
  render(<SummaryForm/>)
  //popover starts hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
  expect(nullPopover).not.toBeInTheDocument()
  //popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  userEvent.hover(termsAndConditions)

  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument() //recommended EXPECT statement even though popover will through error if not found
  
  //popover disappears when we mouse out
  userEvent.unhover(termsAndConditions)
  await waitForElementToBeRemoved(() => 
    screen.queryByText(/no ice cream will actually be delivered/i)
  )
})