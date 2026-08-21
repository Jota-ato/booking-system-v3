/**
 * Checks if the current path is active based on the target path.
 * @param currentPath Current pathname
 * @param targetPath Pathname to compare
 * @param exactMatch Wheter we are loking for an exact match or an startwith
 * @returns If the actual path match the target
 */
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
