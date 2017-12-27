/**
 * Walk up the tree in search of the specified element
 *
 * @param {HTMLElement | null} node
 * @param {string} attrName
 * @param {string} attrValue
 */
export const findAmongParents = (node: HTMLElement | null, attrName: string, attrValue: string): HTMLElement | null => {
    if (!node) {
        return null;
    } else {
        const val = node.getAttribute(attrName);
        if (val === attrValue) {
            return node;
        } else {
            const parent = node.parentElement;
            if (!parent) {
                return null;
            } else {
                return findAmongParents(parent, attrName, attrValue);
            }
        }
    }
};
