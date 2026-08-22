/**
 * Gets a user's initials from their full name.
 * @param name Full name of the user
 * @returns Max of two initials of the user
 */
export const getUserInitials = (name: string): string => {
  const names = name.split(" ");
  const initials = names
    .map((n, idx) => (n[idx] ? n[idx].toUpperCase() : ""))
    .join("");
  return initials.length > 2 ? initials.slice(0, 2) : initials;
};
