import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip } from "@mui/material";
import MaterialReactTable from "material-react-table";

type Props = {
  columns: any[];
  tableData: any[];
  onEdit?: any;
  onDelete?: any;
};

const TableComponent = ({ columns, tableData, onEdit, onDelete }: Props) => {
  return (
    <MaterialReactTable
      displayColumnDefOptions={{
        "mrt-row-actions": {
          muiTableHeadCellProps: {
            align: "left",
          },
          size: 100,
        },
      }}
      columns={columns}
      initialState={{ density: 'compact' }}
      data={tableData}
      editingMode="modal"
      enableColumnOrdering
      enableEditing={
        onEdit !== undefined || onDelete !== undefined ? true : false
      }
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {onEdit ? (
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => onEdit(row.original)}>
                <Edit />
              </IconButton>
            </Tooltip>
          ) : null}

          {onDelete ? (
            <Tooltip arrow placement="left" title="Delete">
              <IconButton onClick={() => onDelete(row.original)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </Box>
      )}
      positionActionsColumn="last"
    />
  );
};

export default TableComponent;
