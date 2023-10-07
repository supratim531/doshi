import { Visibility } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import MaterialReactTable from "material-react-table";

type Props = {
	columns: any[];
	tableData: any[];
	onView?: any;
};

const ClickableTable = ({ columns, tableData, onView }: Props) => {
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
			initialState={{ density: 'compact' }}
			columns={columns}
			data={tableData}
			editingMode="modal"
			enableColumnOrdering
			enableEditing={
				onView !== undefined ? true : false
			}
			renderRowActions={({ row, table }) => (
				<Box sx={{ display: "flex", gap: "1rem" }}>
					{onView ? (
						<Tooltip arrow placement="left" title="View">
							<IconButton onClick={() => onView(row.original)}>
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
