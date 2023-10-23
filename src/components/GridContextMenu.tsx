import React, {
  EventHandler,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dropdown, Menu, MenuRef } from "antd";
import { RowData } from "./Grid2";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

export type ContextMenuProps = {
  contextMenuState: RowData | null;
  children?: ReactNode;
  actionTwoCallback: (a: number | undefined) => void;
};

const actionOneCallback = (a: number | undefined) => {
  if (a) console.log(a + 1000);
};

const GridContextMenu: React.FC<ContextMenuProps> = ({
  contextMenuState: state,
  actionTwoCallback,
  children,
}) => {
  const menuRef = useRef<MenuRef>(null);
  console.log("GridContextMenu", state);
  const [items, setItems] = useState<MenuItemType[]>([
    {
      key: 1,
      onClick: () => actionOneCallback(state?.price),
      disabled: !state?.price,
      label: "Increase with 1000",
    },
    {
      key: 2,
      onClick: () => actionTwoCallback(state?.price),
      disabled: !state,
      label: "Decrease with 1000",
    },
  ]);
  // useEffect(() => {
  //   console.log(state);
  // }, [state]);
  return (
    <Dropdown menu={{ items }} trigger={["contextMenu"]}>
      <div style={{ width: "100%", height: "100%" }}>{children}</div>
    </Dropdown>
  );
};

export default GridContextMenu;
