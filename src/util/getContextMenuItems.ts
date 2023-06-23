import { GridApi, MenuItemDef, ExportParams, ProcessHeaderForExportParams, ProcessRowGroupForExportParams, CellContextMenuEvent } from "ag-grid-community";

const contextMenuFromCell = (params: CellContextMenuEvent) => {
    const { api } = params;
    contextMenuActions(api);
};

function contextMenuActions(gridApi: GridApi): (string | MenuItemDef)[] {
    if (!gridApi) return [{
        // custom item
        name: 'No Context To Show',
        disabled: true,
    },
    ];
    return [
        'copy',
        'copyWithHeaders',
        {
            name: 'Copy selected row',
            action: () => onCopyRow(gridApi),
            icon: '<span class="ag-icon ag-icon-copy" unselectable="on" role="presentation"></span>',
            // disabled: !isRowSelected(gridApi)
        },
        {
            // custom item
            name: 'Always Disabled',
            disabled: true,
            tooltip:
                'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
        },
        {
            name: 'Copy selected row with Headers',
            action: () => onCopyRow(gridApi, true),
            icon: '<span class="ag-icon ag-icon-copy" unselectable="on" role="presentation"></span>',
            // disabled: !isRowSelected(gridApi)
        },
        'separator',
        {
            name: 'Export',
            subMenu: [
                {
                    name: 'CSV Export',
                    action: () => onExportDataAsCsv(gridApi),
                    icon: '<span class="ag-icon ag-icon-csv" unselectable="on" role="presentation"></span>',
                },
                {
                    name: 'Excel Export',
                    action: () => onExportDataAsExcel(gridApi),
                    icon: '<span class="ag-icon ag-icon-excel" unselectable="on" role="presentation"></span>',
                },
            ],
            icon: '<span class="ag-icon ag-icon-save" unselectable="on" role="presentation"></span>',
        },
    ];
}

const exportParams: ExportParams<any> = {
    processRowGroupCallback: rowGroupCallback,
    processHeaderCallback: headerCallback,
};

function onCopyRow(gridApi: GridApi, includeHeaders = false): void {
    gridApi.copySelectedRowsToClipboard({ includeHeaders });
}

function onExportDataAsCsv(gridApi: GridApi): void {
    gridApi.exportDataAsCsv(exportParams);
}

function onExportDataAsExcel(gridApi: GridApi): void {
    gridApi.exportDataAsExcel(exportParams);
}

function headerCallback(params: ProcessHeaderForExportParams): string {
    return params.column.getColDef().headerName?.toUpperCase() || '';
}

function rowGroupCallback(params: ProcessRowGroupForExportParams): string {
    const node = params.node;
    return node.key?.toUpperCase() || '';
}

// function isRowSelected(gridApi: GridApi): boolean {
//     return gridApi.getSelectedRows().length !== 0;
// }

export { contextMenuFromCell as customContextMenu, contextMenuActions as contextMenuActions }