export function allowOnlyNumbers(event: KeyboardEvent) {
  const input = event.target as HTMLInputElement;
  const key = event.key;

  const isValid =
    /[0-9]/.test(key) ||
    (key === "." && !input.value.includes(".")) ||
    ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(key);

  if (!isValid) {
    event.preventDefault();
  }
}
