import { Visibility } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip } from "@mui/material";
import MaterialReactTable from "material-react-table";

type Props = {
	columns: any[];
	tableData: any[];
	onClick?: any;
};

const ClickableTable = ({ columns, tableData, onClick }: Props) => {
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
			data={tableData}
			editingMode="modal"
			enableColumnOrdering
			enableEditing={
				onClick !== undefined ? true : false
			}
			renderRowActions={({ row, table }) => (
				<Box sx={{ display: "flex", gap: "1rem" }}>
					{onClick ? (
						<Tooltip arrow placement="left" title="View">
							<IconButton onClick={() => onClick(row.original)}>
								<Visibility />
							</IconButton>
						</Tooltip>
					) : null}
				</Box>
			)}
		/>
	);
};

export default ClickableTable;
