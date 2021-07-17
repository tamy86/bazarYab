import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import AssignmentIcon from '@material-ui/icons/Assignment';
import axios from "axios";
import BusinessAlerts from "./BusinessAlertShow";


const columns = [
    { id: 'id', label: 'شماره', minWidth: 120 },
    { id: 'name',label: 'نام', minWidth: 100 },
    { id: 'family',label: 'نام خانوادگی',minWidth: 110,align: 'right',},
    { id: 'phone',label: 'شماره همراه',minWidth: 110,align: 'right',},
    { id: 'COUNT(businessnewcustomers.id)',label: 'تعداد معرف',minWidth: 170,align: 'right',},];

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginTop:'25px',


    },
    container: {
        maxHeight: 440,
    },
    '& .MuiTableCell-stickyHeader':{

    }
});



const styleBgForm= {
    backgroundColor: '#f0f1f4',
    direction: 'rtl',
    width: '70%',
    height: '100%',
    minWidth:'270px',
    minHeight:'400px',
    fontFamily:'IRANSans',
    paddingTop: '40px',
    paddingBottom:'40px',

};

const headerReportForm={
    backgroundColor:'#001a33',
    width: '100%',
    color:'#fff',
    fontFamily:'IRANSans',
    textAlign:'center',
    fontSize:'20px',

};


function BusinessCustomerReportTable() {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [errormessage,setErrormesasage]=React.useState('');
    const [showerror,setShowerror]=React.useState(false);
    const [rowReport,setRowReport]=React.useState([]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };




    useEffect(()=>{

        axios.defaults.headers.common['Authorization']='Bearer '+ localStorage.getItem('token');

        const getAllInfoTable=async ()=>{
            try{
                const res= await axios.get('/api/business/report');


                setRowReport(res.data);
                          }
            catch (error) {

                setErrormesasage(
                    {
                        msg: error.response.data['message'],
                        key: Math.random(),
                        errortype: error.response.data['message type'],
                    });
                setShowerror(true);
            }

            };
        getAllInfoTable();
    },[setRowReport]);





    return(


        <Container style={styleBgForm}>

            {showerror ?
                <BusinessAlerts key={errormessage.key} errormessage={errormessage.msg} errortype={errormessage.errortype}/>:null
            }

            <div className="card-header" style={headerReportForm}>
                    <AssignmentIcon/>
                فرم گزارش مشتریان

            </div>


            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth,fontFamily:"IRANSans",textAlign:'center',backgroundColor:'#ccdaf0',}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowReport.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} style={{fontFamily:"IRANSans",textAlign:'center'}}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rowReport.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    style={{backgroundColor:'#ccdaf0',}}
                />
            </Paper>

        </Container>
    );

}

export default BusinessCustomerReportTable;