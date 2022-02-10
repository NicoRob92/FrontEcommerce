import style from "./_Compras.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getOrdersUsers } from "../../ducks/actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/system";


const Compras = () => {
  const dispatch = useDispatch();
  const orderUser = useSelector((state) => state.orderUser.orderUsers);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  console.log(orderUser);

  useEffect(() => {
    dispatch(getOrdersUsers(userId, token));
  }, []);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


  return (
    <div className={style.container}>
      <Box sx={{ width: '90%', height: '90%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
        <h1>Mis Compras</h1>
        <Box sx={{ width: '90%', height: '90%' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="rig">Id</TableCell>
                  <TableCell >Producto</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Costo</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderUser.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default Compras;


{/* <div className={`container-fluid p-4 ${style.containerTitle}`}>
<h1>Mis Compras</h1>
</div>
<div className={`container col ${style.containerBought}`}>
<div className="row">
  <h5 className={`col-12 col-sm-1 ${style.camp}`}>
    <span className="badge bg-secondary">id:</span>1
  </h5>
  <h5 className={`col-12 col-sm-2 ${style.camp}`}>
    <span className="badge bg-secondary">Producto:</span> Teclado
  </h5>
  <h5 className={`col-12 col-sm-2 ${style.camp}`}>
    <span className="badge bg-secondary">Cantidad:</span> 6
  </h5>
  <h5 className={`col-12 col-sm-2 ${style.camp}`}>
    <span className="badge bg-secondary">Costo/U:</span> $400/U
  </h5>
  <h5 className={`col-12 col-sm-2 ${style.camp}`}>
    <span className="badge bg-secondary">Total:</span> $1200
  </h5>
  <h5 className={`col-12 col-sm-2 ${style.camp}`}>
    <span className="badge bg-secondary">Status:</span> Pending
  </h5>
  <Link className={`col-12 col-sm-1 ${style.camp}`} to="#">
    ver orden{" "}
  </Link>
</div>
</div> */}