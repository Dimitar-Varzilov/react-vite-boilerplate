import React, { useEffect } from "react";

interface IUseOutside {
  containerRef: React.RefObject<HTMLElement>;
  contextMenuRef: React.RefObject<HTMLElement>;
  callback?: () => void;
}

function useOutside({
  containerRef,
  contextMenuRef,
  callback = () => void 0,
}: IUseOutside) {
  /**
   * if clicked on outside of element
   */
  function handleClickOutside(event:Event
  ) {
      event.preventDefault();
      event.stopPropagation();
    if (
      containerRef?.current?.contains(event.target as Node) &&
      !contextMenuRef?.current?.contains(event.target as Node)
    ) {
      callback();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

export default useOutside;
