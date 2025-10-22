export const formatNumber = (value) => {
  if (value === "Error") return "Error";

  // If the user is in the middle of typing a decimal (e.g. "1.")
  // preserve the trailing dot so it appears immediately in the UI.
  if (typeof value === "string" && /^-?\d+\.$/.test(value)) {
    return value;
  }

  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  return Number(value).toString();
};

export const formatExpression = (previousValue, operator) => {
  // If there's neither a previous value nor an operator, nothing to show
  if (
    (previousValue === null ||
      previousValue === undefined ||
      previousValue === "") &&
    !operator
  )
    return "";

  // Show zero correctly (0 is falsy, so avoid `||` short-circuit)
  const prevStr =
    previousValue === null ||
    previousValue === undefined ||
    previousValue === ""
      ? ""
      : formatNumber(String(previousValue));

  return `${prevStr} ${operator || ""}`.trim();
};
