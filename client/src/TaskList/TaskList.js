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
import { useGetTaskListsQuery, useGetTaskListWithIDQuery, useGetTasksQuery} from "../state/tasksApiSlice"
import { useSelector } from "react-redux";
import { selectAuthToken } from "../state/authSlice";


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
          {row.title}
        </TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.tasks.length}</TableCell>
        <TableCell align="right">{row.createdAt}</TableCell>
        <TableCell align="right">{row.updatedAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Task List Details (Total score: 24)
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>iD</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Score</TableCell>
                  </TableRow>
                </TableHead>
                {<TableBody>
                  {row.tasks.map((Row) => (
                    <TableRow key={Row.id}>
                      <TableCell component="th" scope="row">
                        {Row.id}
                      </TableCell>
                      <TableCell>{Row.notes}</TableCell>
                      <TableCell align="right">{Row.points}</TableCell>
                    </TableRow>
                  ))}
                  </TableBody>}
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
  const {data} = useGetTaskListsQuery();
  console.log(data);
  return data ?(
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>List name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Number of tasks</TableCell>
            <TableCell align="right">Date created</TableCell>
            <TableCell align="right">Date modified</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} />
          )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  ) : "loading";
}
