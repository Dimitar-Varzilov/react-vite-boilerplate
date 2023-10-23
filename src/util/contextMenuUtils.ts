const disableDefaultContextMenu = (htmlElement: HTMLElement | null) => {
    if (!htmlElement || htmlElement === null) return
    htmlElement.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
};
const enableDefaultContextMenu = (htmlElement?: HTMLElement | null) => {
    if (!htmlElement || htmlElement === null) return
    htmlElement.removeEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
};
const checkIfContextMenuIsDisabled = (htmlElement: HTMLElement | null) => {
    if (!htmlElement || htmlElement === null) return
    return htmlElement.hasAttribute("contextmenu");
};
export { disableDefaultContextMenu, enableDefaultContextMenu }