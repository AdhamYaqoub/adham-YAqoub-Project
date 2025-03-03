import { handleSubmit } from "../src/client/js/formHandler";

test("The input must be processed correctly.", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: true }),
    })
  );

  const mockEvent = { preventDefault: jest.fn() };
  const inputField = document.createElement("input");
  inputField.id = "inputText";
  inputField.value = "https://example.com";
  document.body.appendChild(inputField);

  await handleSubmit(mockEvent);
  expect(fetch).toHaveBeenCalledWith("/api/analyze", expect.anything());
});
