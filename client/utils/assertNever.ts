export const errorMessage = 'Action type is not defined';

/**
 * @param {never} val
 * @throws {ActionTypeFalsy}
 *
 * With TS2 if swith in a reducer has not exhausted action.type option completely
 * a call to this function would be highlighted with red.
 * Also verifies that action.type was provided
 */
export function assertNever(val: never): void {
  if (!val) {
    const err = new Error(errorMessage);
    throw err;
  }
}
