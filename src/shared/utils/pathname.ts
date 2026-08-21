export const isActivePath = (
  currentPath: string,
  targetPath: string,
  exactMatch: boolean = false,
): boolean => {
  if (exactMatch) {
    return currentPath === targetPath;
  }
  return currentPath.startsWith(targetPath);
};
