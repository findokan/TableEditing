import React, { useEffect, useState } from "react";
import { getCarData, getColorList } from "./apiRequests/get.mock.data";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import { cloneDeep, parseInt } from "lodash";
import "./App.css";

function CollapsibleRow(props) {
	const { row, rowIndex, colorList, data, setData } = props;
	const [rowData, setRowData] = useState(row);
	const [open, setOpen] = useState(false);
	const [hasChanged, setHasChanged] = useState(false);

	const handleInStockChange = () => {
		setHasChanged(true);

		let clonedData = cloneDeep(rowData);
		clonedData.inStock = !rowData.inStock;
		setRowData(clonedData);
	};

	const handleHPChange = (e) => {
		setHasChanged(true);

		let clonedData = cloneDeep(rowData);
		clonedData.hp = e.target.value;

		setRowData(clonedData);
	};

	const handleHPBlur = () => {
		let clonedData = cloneDeep(rowData);

		if (parseInt(rowData.hp) > 550) {
			clonedData.hp = 550;
			setRowData(clonedData);
		} else if (parseInt(rowData.hp) < 100) {
			clonedData.hp = 100;
			setRowData(clonedData);
		}
	};

	const handlePriceChange = (e) => {
		setHasChanged(true);

		let clonedData = cloneDeep(rowData);
		clonedData.price = e.target.value;
		setRowData(clonedData);
	};

	const handleCurrencyChange = (e) => {
		setHasChanged(true);

		let clonedData = cloneDeep(rowData);
		clonedData.currency = e.target.value;
		setRowData(clonedData);
	};

	const handleColorChange = (e) => {
		setHasChanged(true);

		let selectedColor = colorList.find((x) => x.hex === e.target.value);
		let clonedData = cloneDeep(rowData);
		clonedData.color = selectedColor;
		setRowData(clonedData);
	};

	const handleSaveClicked = () => {
		let clonedData = cloneDeep(data);
		clonedData[rowIndex] = rowData;
		setData(clonedData);
		setOpen(false);
	};

	const handleCancelClick = () => {
		setHasChanged(false);
		setRowData(row);
		setOpen(false);
	};

	return (
		<>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell component="th" scope="row">
					{row.id}
				</TableCell>
				<TableCell>{row.carId}</TableCell>
				<TableCell>{row.inStock ? "True" : "False"}</TableCell>
				<TableCell>{row.hp}</TableCell>
				<TableCell>{`${row.price} ${row.currency}`}</TableCell>
				<TableCell>
					<Tooltip title={row.color.description}>
						<div
							className="color-circle"
							style={{ backgroundColor: row.color.hex }}
						/>
					</Tooltip>
				</TableCell>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <ClearIcon /> : <EditIcon />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<div style={{ padding: "2% 15%" }}>
							<TableContainer>
								<Table>
									<TableRow>
										<TableCell>Id</TableCell>
										<TableCell>{rowData.id}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Car Id</TableCell>
										<TableCell>{rowData.carId}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>In Stock</TableCell>
										<TableCell>
											<Checkbox
												checked={rowData.inStock}
												onChange={handleInStockChange}
											/>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Horse Power
											<Tooltip
												title={
													"You can set 550 as the maximum value and 100 as the minimum value."
												}
											>
												<InfoIcon style={{ fontSize: "14px" }} />
											</Tooltip>
										</TableCell>
										<TableCell>
											<TextField
												value={rowData.hp}
												size="small"
												type="number"
												onChange={handleHPChange}
												onBlur={handleHPBlur}
											/>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Price</TableCell>
										<TableCell>
											<TextField
												value={rowData.price}
												size="small"
												type="number"
												onChange={handlePriceChange}
											/>
											<Select
												style={{ marginLeft: "10px" }}
												value={rowData.currency}
												label="Currency"
												onChange={handleCurrencyChange}
												size={"small"}
											>
												<MenuItem value={"€"}>€</MenuItem>
												<MenuItem value={"$"}>$</MenuItem>
												<MenuItem value={"₺"}>₺</MenuItem>
											</Select>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Color</TableCell>
										<TableCell>
											<FormControl>
												<RadioGroup
													aria-labelledby="demo-controlled-radio-buttons-group"
													name="controlled-radio-buttons-group"
													value={rowData.color.hex}
													onChange={handleColorChange}
												>
													{colorList.map((color, index) => (
														<div
															style={{
																display: "flex",
																flexDirection: "row",
																alignItems: "center",
															}}
														>
															<Radio value={color.hex} />
															<Tooltip title={color.description}>
																<div
																	className="color-rectangle"
																	style={{ backgroundColor: color.hex }}
																/>
															</Tooltip>
														</div>
													))}
												</RadioGroup>
											</FormControl>
										</TableCell>
									</TableRow>
								</Table>
							</TableContainer>

							{hasChanged ? (
								<div style={{ marginTop: "10px" }}>
									<Button variant="contained" onClick={handleCancelClick}>
										Cancel
									</Button>
									<Button
										variant="contained"
										onClick={handleSaveClicked}
										style={{ marginLeft: "10px" }}
									>
										Save
									</Button>
								</div>
							) : null}
						</div>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

function App() {
	// state that stores if waiting response from api
	const [isLoading, setLoading] = useState(false);

	// car data
	const [data, setData] = useState(null);

	// possible color list
	const [colorList, setColorList] = useState([]);

	// Get car data from mocked api
	useEffect(() => {
		setLoading(true);
		getCarData()
			.then((response) => setData(response.data))
			.finally(() => setLoading(false));
	}, []);

	// Get color list from mocked api
	useEffect(() => {
		getColorList().then((response) => {
			setColorList(response.data);
		});
	}, []);

	return (
		<div className="container">
			{isLoading ? (
				<Box>
					<CircularProgress />
				</Box>
			) : (
				<div className="content-container">
					<TableContainer component={Paper} className="content-container">
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell>Car Id</TableCell>
									<TableCell>In Stock</TableCell>
									<TableCell>HP</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>Color</TableCell>
									<TableCell>Edit</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.map((row, index) => (
									<CollapsibleRow
										key={index}
										row={row}
										rowIndex={index}
										data={data}
										setData={setData}
										colorList={colorList}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			)}
		</div>
	);
}

export default App;
