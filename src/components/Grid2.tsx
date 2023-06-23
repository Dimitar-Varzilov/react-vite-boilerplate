import { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  disableDefaultContextMenu,
  enableDefaultContextMenu,
} from "../util/contextMenuUtils";
import {
  CellContextMenuEvent,
  ColDef,
  GridOptions,
  RowDoubleClickedEvent,
} from "ag-grid-community";
import GridContextMenu, { ContextMenuProps } from "./GridContextMenu";

export type RowData = {
  make: string;
  model: string;
  price: number;
};

const actionTwoCallback = (a: number | undefined) => {
  if (a) console.log(a - 1000);
};
const Grid2 = () => {
  const agGridWrapper = useRef<HTMLDivElement>(null);
  const gridRef = useRef<AgGridReact>(null);
  const [contextMenuState, setContextMenuState] = useState<RowData | null>(
    null
  );

  const [rowData, setRowData] = useState<RowData[]>([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);

  const columnDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ];

  const gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
    },
  };

  const onCellContextMenu = (y: CellContextMenuEvent) => {
    setContextMenuState(y.node.data as RowData);
  };

  const contexMenuProps: ContextMenuProps = {
    contextMenuState,
    actionTwoCallback,
  };

  return (
    <div
      ref={agGridWrapper}
      className="ag-theme-alpine"
      style={{ height: 400, width: 600 }}
    >
      <GridContextMenu {...contexMenuProps}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          onCellContextMenu={onCellContextMenu}
          // onRowDoubleClicked={print}
        />
      </GridContextMenu>
    </div>
  );
};
export default Grid2;
