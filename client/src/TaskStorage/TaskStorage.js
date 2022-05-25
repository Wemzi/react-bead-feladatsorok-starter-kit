import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  useGetTaskListsQuery,
  useGetTaskListWithIDQuery,
  useGetTasksQuery,
} from "../state/tasksApiSlice";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../state/authSlice";
import { Button } from "@mui/material";

function createData(
  id,
  title,
  status,
  description,
  taskNumber,
  createdAt,
  updatedAt
) {
  return {
    id,
    title,
    status,
    description,
    taskNumber,
    createdAt,
    updatedAt,
    tasks: [
      {
        id: 1,
        notes: "hardest task ever",
        points: 13,
      },
      {
        id: 2,
        notes: "ez pz lemon squeazy",
        points: 241412,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const {edited} = props;
  const {handleEdit} =props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title} {edited ? "(Selected)" : ""}
        </TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell><Button key={row.id} variant="contained" onClick={handleEdit}>Edit</Button></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Task Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Creation Date</TableCell>
                    <TableCell>Modification date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={row.id}>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>{row.updatedAt}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(1, "Frozen yoghurt", "published", "normal tasklist", 4),
  createData(2, "Ice cream sandwich", "published", "normal tasklist", 4),
  createData(3, "Eclair", "published", "normal tasklist", 4),
  createData(4, "Cupcake", "published", "normal tasklist", 4),
  createData(5, "Gingerbread", "published", "normal tasklist", 4),
];

export default function TaskList() {
  const [editedTaskID, SetEditedTaskID] = React.useState(-1);
  const [skip, SetSkip] = React.useState(0);
  const [limit, SetLimit] = React.useState(10);
  const { data } = useGetTasksQuery(skip, limit);
  const handleNext = () => {
    SetSkip(skip + limit);
  };
  const handlePrev = () => {
    SetSkip(skip - limit);
  };
  const handleEdit = (e) => 
  {
    SetEditedTaskID(e.target.id)
    console.log(editedTaskID)
  }

  console.log(data);
  return data ? (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell>Task name</TableCell>
            <TableCell align="right">Description</TableCell>

            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} edited={editedTaskID===row.id} editHandler={handleEdit}/>
          ))}
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="center">
        <Button onClick={handlePrev} variant="contained">
          Prev
        </Button>
        <Box width=""></Box>
        <Button onClick={handleNext} variant="contained" align="right">
          Next
        </Button>
      </Box>
    </TableContainer>
  ) : (
    "loading"
  );
}
