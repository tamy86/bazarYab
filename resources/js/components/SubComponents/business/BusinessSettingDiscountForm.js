import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import PersonIcon from '@material-ui/icons/Person';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PaymentIcon from '@material-ui/icons/Payment';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import BusinessAlerts from "./BusinessAlertShow";
import IconButton from "@material-ui/core/IconButton/IconButton";


import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
// import SearchIcon from "@material-ui/core/SvgIcon/SvgIcon";
// import SearchIcon from '@material-ui/icons/Search';
// import SaveIcon from '@material-ui/icons/Save';




const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormLabel-root": {
            fontFamily:"IRANSans",
        },
        "& .MuiInputLabel-formControl":{
            right:0,
            left:'auto',
            direction:'rtl',
        },


    },

}));

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
const headerSettingForm={
    backgroundColor:'#001a33',
    width: '100%',
    color:'#fff',
    fontFamily:'IRANSans',
    textAlign:'center',
    fontSize:'20px',

};
const styleButton={
    borderRadius: 3,
    color: 'black',
    height: 48,
    padding: '0 15px',
    fontFamily:'IRANSans',
    marginRight:'20px',
    width:'50%',
    marginTop: '15px',
};
const spaceBetwenButton={
    paddingTop:'40px',
    textAlign:'center',
};
const selectStyle={
width:'70%',
    direction: 'rtl',
    fontFamily:'IRANSans',

};
const textDialog={
    fontFamily:'IRANSans',
    direction:'rtl',

};

function BusinessSettingDiscountForm(){

    const classes = useStyles();
    const [loading,setLoading]=React.useState(true);

    const[customerNo1,setCustomerNo1]=React.useState();
    const[customerNo2,setCustomerNo2]=React.useState();
    const[customerNo3,setCustomerNo3]=React.useState();
    const [listcustomerNo, setListcustomerNo]=React.useState([]);

    const[percent1,setPercent1]=React.useState();
    const[percent2,setPercent2]=React.useState();
    const[percent3,setPercent3]=React.useState();
    const [listPercent, setListPercent]=React.useState([]);

    const[month1,setMonth1]=React.useState();
    const[month2,setMonth2]=React.useState();
    const[month3,setMonth3]=React.useState();
    const [listMonth, setListMonth]=React.useState([]);

    const[error,setError]=React.useState();
    const [errormessage,setErrormesasage]=React.useState('');
    const [showerror,setShowerror]=React.useState(false);


    const [openDialog,setOpenDialog]=React.useState(false);

    const handleDialogClose = () => {
        setOpenDialog(false);
    };




    useEffect(()=> {

        axios.defaults.headers.common['Authorization']='Bearer '+ localStorage.getItem('token');

        const getListNoCustomer=async ()=>{
            /*header config in app.js file so for all header need to check auth going and to check */
            /*baseUrl config in app.js for all url*/
            try{
                const  res=  await axios.get('/api/business/listnocustomer');

                setListcustomerNo(res.data);

            }
            catch(error){
                setError(error.response.status);
                setErrormesasage(
                    {
                        msg: error.response.data['message'],
                        key: Math.random(),
                        errortype: error.response.data['message type'],
                    });
                setShowerror(true);
            }
        };
        getListNoCustomer();
    },[setListcustomerNo]);



    useEffect(()=> {

        axios.defaults.headers.common['Authorization']='Bearer '+ localStorage.getItem('token');

        const getListPercent=async ()=>{
            /*header config in app.js file so for all header need to check auth going and to check */
            /*baseUrl config in app.js for all url*/
            try{
                const  res=  await axios.get('/api/business/listpercents');

                setListPercent(res.data);

            }
            catch(error){
                setError(error.response.status);
                setErrormesasage(
                    {
                        msg: error.response.data['message'],
                        key: Math.random(),
                        errortype: error.response.data['message type'],
                    });
                setShowerror(true);
            }
        };
        getListPercent();
    },[setListPercent]);




    useEffect(()=> {

        axios.defaults.headers.common['Authorization']='Bearer '+ localStorage.getItem('token');

        const getListMonths=async ()=>{
            /*header config in app.js file so for all header need to check auth going and to check */
            /*baseUrl config in app.js for all url*/
            try{
                const  res=  await axios.get('/api/business/listmonths');

                setListMonth(res.data);

            }
            catch(error){
                setError(error.response.status);
                setErrormesasage(
                    {
                        msg: error.response.data['message'],
                        key: Math.random(),
                        errortype: error.response.data['message type'],
                    });
                setShowerror(true);
            }
        };
        getListMonths();
    },[setListMonth]);


    const handelChangeCustomerNoRow1 = (event) => {
        setCustomerNo1(event.target.value);
    };
    const handelChangeCustomerNoRow2 = (event) => {
        setCustomerNo2(event.target.value);
    };
    const handelChangeCustomerNoRow3 = (event) => {
        setCustomerNo3(event.target.value);
    };

    const handelChangePercentRow1 = (event) => {
        setPercent1(event.target.value);
    };
    const handelChangePercentRow2 = (event) => {
        setPercent2(event.target.value);
    };
    const handelChangePercentRow3 = (event) => {
        setPercent3(event.target.value);
    };

    const handelChangeMonthRow1 = (event) => {
        setMonth1(event.target.value);
    };
    const handelChangeMonthRow2 = (event) => {
        setMonth2(event.target.value);
    };
    const handelChangeMonthRow3 = (event) => {
        setMonth3(event.target.value);
    };


    function saveSettingRow1() {

        // const charFarsi = /^[-]|[۰۱۲۳۴۵۶۷۸۹]|[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/;

        // const resultCharFarsiName = businssName.match(charFarsi);
        // const resultCharFarsiAddress = businssAddress.match(charFarsi);


            axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

            axios.put('/api/business/savesettingrow1', {
                'customerNo1': customerNo1,
                'percentNo1': percent1,
                'monthNo1': month1,
            }).then((res) => {
                if ((res.data['Success'] === 1) || (res.status === 200)) {
                    setErrormesasage(
                        {
                            msg: res.data['message'],
                            key: Math.random(),
                            errortype: res.data['message_type'],
                        });

                    setShowerror(true);
                }
            }).catch((error) => {
                setErrormesasage(
                    {
                        msg: error.response.data['message'],
                        key: Math.random(),
                        errortype: error.response.data['message_type'],
                    });
                setShowerror(true);


            });


        // }
    }

    function saveSettingRow2() {



        axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

        axios.put('/api/business/savesettingrow2', {
            'customerNo2': customerNo2,
            'percentNo2': percent2,
            'monthNo2': month2,
        }).then((res) => {
            if ((res.data['Success'] === 1) || (res.status === 200)) {
                setErrormesasage(
                    {
                        msg: res.data['message'],
                        key: Math.random(),
                        errortype: res.data['message_type'],
                    });

                setShowerror(true);
            }
        }).catch((error) => {
            setErrormesasage(
                {
                    msg: error.response.data['message'],
                    key: Math.random(),
                    errortype: error.response.data['message_type'],
                });
            setShowerror(true);


        });


        // }
    }


    function saveSettingRow3() {



        axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

        axios.put('/api/business/savesettingrow3', {
            'customerNo3': customerNo3,
            'percentNo3': percent3,
            'monthNo3': month3,
        }).then((res) => {
            if ((res.data['Success'] === 1) || (res.status === 200)) {
                setErrormesasage(
                    {
                        msg: res.data['message'],
                        key: Math.random(),
                        errortype: res.data['message_type'],
                    });

                setShowerror(true);
            }
        }).catch((error) => {
            setErrormesasage(
                {
                    msg: error.response.data['message'],
                    key: Math.random(),
                    errortype: error.response.data['message_type'],
                });
            setShowerror(true);


        });


        // }
    }



    function submitFinalForm(){
                   setOpenDialog(true);
                    setDisableForm(false);
                    setShowPresentedInfo(true);
    }


    const finalSubmitSettingForm = () => {

        axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

        axios.patch('/api/business/submitfinalform', {
        }).then((res) => {
            if ((res.data['Success'] === 1) || (res.status === 200)) {
                setErrormesasage(
                    {
                        msg: res.data['message'],
                        key: Math.random(),
                        errortype: res.data['message_type'],
                    });

                setShowerror(true);
                setOpenDialog(false);
            }
        }).catch((error) => {
            setErrormesasage(
                {
                    msg: error.response.data['message'],
                    key: Math.random(),
                    errortype: error.response.data['message_type'],
                });
            setShowerror(true);


        });



    };



    if((error===401)||(error===400)||(error===500)||(error===408)||(error===402)) {
        localStorage.removeItem('token');
        window.location = `/business/login`;
    }
    else

        if(localStorage.getItem('token'))
        {


        return (
            <Container style={styleBgForm} xs="6">

                {showerror ?
                    <BusinessAlerts key={errormessage.key} errormessage={errormessage.msg}
                                    errortype={errormessage.errortype}/> : null
                }




                <Dialog open={openDialog} onClose={handleDialogClose} style={textDialog} >

                    <DialogTitle style={{'backgroundColor':'#E67E22'}}>
                        <h3 style={textDialog}>پیام مهم از سمت سیستم</h3>
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText style={textDialog}>
                            <h4 style={{'color':'#E67E22'}}>
                                دقت نمایید !
                                <br/>
                                در صورت تایید فرم تخفیف ها ردیف های تنظیم شده توسط شما در این فرم در سیستم
                                 ثبت خواهد شد و دیگر قادر به ویرایش و یا تغییر آن ردیف ها نخواهید بود</h4>


                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button autoFocus onClick={handleDialogClose} color="primary">
                            <h3 style={textDialog}>انصراف</h3>
                        </Button>
                        <Button autoFocus onClick={finalSubmitSettingForm} color="primary">
                            <h3 style={textDialog}>تایید</h3>
                        </Button>
                    </DialogActions>

                </Dialog>







                <div className="card-header" style={headerSettingForm}>
                    <SettingsIcon/>
                    فرم تنظیم تخفیف ها

                </div>

                <div>
                    <h3>
                        نحوه تنظیم فرم:
                    </h3>
                    <br/>
                    <p>
                        <SpeakerNotesIcon/> این فرم برای تنظیم درصد تخفیف با توجه به تعداد مشتری معرفی شده
                        در مدت زمان معین میباشد. که کاربر صاحب کسب کار
                        میتواند با پر کردن 3 فیلد مشخص نماید که مشتری با معرفی چند خریدار
                        در چه مدت زمانی دارای چه مقدار تخفیف باشد.
                        به عنوان مثال: میتوانید مشخص نمایید
                        مشتری پس از معرفی چه تعداد مشتری(تعداد مشتری معرفی شده) میتواند چند درصد تخفیف
                        (در قسمت درصد تخفیف برای مشتری) و در چه مدت زمانی (در قسمت تعداد ماه قابل استفاده از تخفیف)
                        از تخفیف فروشکاه یا صاحب کسب و کار استفاده نماید.
                        هر صاحب کسب و کار میتواند 3 سطر در رابطه با تخفیفات را به صورت
                        صعودی تنظیم نماید. به عنوان مثال : یک مشتری(خریدار) میتواند با
                        توجه به تعداد مشتری معرفی شده تنظیم شده در سطر اول زمانی که تعداد افراد معرف شده توسط مشتری
                        بیشتر
                        از آن تعداد شد به مدت زمان تعیین شده از آن تخفیف استفاده نماید.
                        حال این مقدار و ارقام میبتواند در سطر های
                        بعدی صعودی باشد که مشتری (خریدار) با معرفی افراد بیشتر از درصد تخفیف بیشتر
                        در مدت زمان بیشتری استفاده نماید.
                    </p>
                    <p style={{fontWeight: 'bold'}}><InfoIcon/> لازم به ذکر میباشد این فرم فقط یکبار توسط صاحب کسب و کار
                        قابل تنظیم میباشد. </p>
                </div>
                <form>
                    <Grid style={{marginTop: '50px'}} className={classes.root} container spacing={24}>

                        <Grid style={{textAlign: 'right', float: 'right'}} item xs>
                            <InputLabel id="customerNo"><PersonIcon/>تعداد مشتری معرفی شده</InputLabel>

                            <Select
                                labelId="customerNo"
                                id='customerNo'
                                value={customerNo1}
                                style={selectStyle}
                                onChange={handelChangeCustomerNoRow1}

                            >
                                {listcustomerNo.map(list => {

                                    return (
                                        <MenuItem key={list.id} value={list.no_customer}>{list.no_customer} نفر </MenuItem>
                                    )


                                })}


                            </Select>
                        </Grid>

                        <Grid style={{textAlign: 'right', float: 'right'}} item xs>
                            <InputLabel id="customerpercent"><PaymentIcon/>درصد تخفیف برای مشتری</InputLabel>

                            <Select
                                labelId="customerpercent"
                                id='customerpercent'
                                value={percent1}
                                style={selectStyle}
                                onChange={handelChangePercentRow1}
                            >
                                {listPercent.map(list => {

                                    return (
                                        <MenuItem key={list.id} value={list.percent}>{list.percent} درصد </MenuItem>
                                    )


                                })}


                            </Select>
                        </Grid>


                        <Grid style={{textAlign: 'right', float: 'right'}} item xs>
                            <InputLabel id="customermonth1"><DateRangeIcon/>تعداد ماه قابل استفاده از تخفیف</InputLabel>

                            <Select
                                labelId="customermonth1"
                                id='customermonth1'
                                value={month1}
                                style={selectStyle}
                                onChange={handelChangeMonthRow1}
                            >
                                {listMonth.map(list => {

                                    return (
                                        <MenuItem key={list.id} value={list.month}>{list.month} ماه </MenuItem>
                                    )


                                })}


                            </Select>
                        </Grid>
                        <div>
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                style={{backgroundColor:"#e6e6e6",bottom:'5px'}}
                                onClick={()=>{saveSettingRow1();}}
                            >
                                <SaveIcon />
                            </IconButton>
                        </div>
                    </Grid>


                    <Divider style={{marginTop: '20px'}}/>


                    <Grid style={{marginTop: '50px'}} className={classes.root} container spacing={24}>

                        <Grid style={{textAlign: 'right', float: 'right'}} item xs>
                            <InputLabel id="customerNo"><PersonIcon/>تعداد مشتری معرفی شده</InputLabel>

                            <Select
                                labelId="customerNo"
                                id='customerNo'
                                value={customerNo2}
                                style={selectStyle}
                                onChange={handelChangeCustomerNoRow2}

                            >
                                {listcustomerNo.map(list => {

                                    return (
                                        <MenuItem key={list.id} value={list.no_customer}>{list.no_customer} نفر </MenuItem>
                                    )


                                })}


                            </Select>
                        </Grid>

                        <Grid style={{textAlign: 'right', float: 'right'}} item xs>
                            <InputLabel id="customerpercent"><PaymentIcon/>درصد تخفیف برای مشتری</InputLabel>

                            <Select
                                labelId="customerpercent"
                                id='customerpercent'
                                value={percent2}
                                style={selectStyle}
                                onChange={handelChangePercentRow2}

                            >
                                {listPercent.map(list => {

                                    return (
                                        <MenuItem key={list.id} value={list.percent}>{list.percent} درصد </MenuItem>
                                    )


                                })}


                            </Select>


                        </Grid>


                        <Grid style={{textAlign: 'right', float: 'right'}} item xs>
                            <InputLabel id="customermonth1"><DateRangeIcon/>تعداد ماه قابل استفاده از تخفیف</InputLabel>

                            <Select
                                labelId="customermonth1"
                                id='customermonth1'
                                value={month2}
                                style={selectStyle}
                                onChange={handelChangeMonthRow2}

                            >
                                {listMonth.map(list => {

                                    return (
                                        <MenuItem key={list.id} value={list.month}>{list.month} ماه </MenuItem>
                                    )


                                })}


                            </Select>
                        </Grid>

                        <div>
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                style={{backgroundColor:"#e6e6e6",bottom:'5px'}}
                                onClick={()=>{saveSettingRow2();}}
                            >
                                <SaveIcon />
                            </IconButton>
                        </div>
                    </Grid>


                    <Divider style={{marginTop: '20px'}}/>


                    <Grid style={{marginTop: '50px'}} className={classes.root} container spacing={24}>

                        <Grid style={{textAlign: 'right', float: 'right'}} item xs>
                            <InputLabel id="customerNo"> <PersonIcon/>تعداد مشتری معرفی شده</InputLabel>

                            <Select
                                labelId="customerNo"
                                id='customerNo'
                                value={customerNo3}
                                style={selectStyle}
                                onChange={handelChangeCustomerNoRow3}

                            >
                                {listcustomerNo.map(list => {

                                    return (
                                        <MenuItem key={list.id} value={list.no_customer}>{list.no_customer} نفر </MenuItem>
                                    )


                                })}


                            </Select>
                        </Grid>

                        <Grid style={{textAlign: 'right', float: 'right'}} item xs>
                            <InputLabel id="customerpercent"> <PaymentIcon/>درصد تخفیف برای مشتری</InputLabel>

                            <Select
                                labelId="customerpercent"
                                id='customerpercent'
                                value={percent3}
                                style={selectStyle}
                                onChange={handelChangePercentRow3}

                            >
                                {listPercent.map(list => {

                                    return (
                                        <MenuItem key={list.id} value={list.percent}>{list.percent} درصد </MenuItem>
                                    )


                                })}


                            </Select>
                        </Grid>


                        <Grid style={{textAlign: 'right', float: 'right'}} item xs>
                            <InputLabel id="customermonth1"> <DateRangeIcon/>تعداد ماه قابل استفاده از
                                تخفیف</InputLabel>

                            <Select
                                labelId="customermonth1"
                                id='customermonth1'
                                value={month3}
                                style={selectStyle}
                                onChange={handelChangeMonthRow3}

                            >
                                {listMonth.map(list => {

                                    return (
                                        <MenuItem key={list.id} value={list.month}>{list.month} ماه </MenuItem>
                                    )


                                })}


                            </Select>
                        </Grid>
                        <div>
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                style={{backgroundColor:"#e6e6e6",bottom:'5px'}}
                                onClick={()=>{saveSettingRow3();}}
                            >
                                <SaveIcon />
                            </IconButton>
                        </div>
                    </Grid>


                    <div style={spaceBetwenButton}>

                        <Button variant="outlined" color="primary" style={styleButton}  onClick={()=>{submitFinalForm();}}>
                            <SaveIcon/>
                            نهایی سازی فرم
                        </Button>

                        <Button variant="outlined" color="primary" style={styleButton}>
                            <CancelIcon/>
                            کنسل فرم
                        </Button>
                    </div>
                </form>
            </Container>
        );
    }else{
            localStorage.removeItem('token');
            window.location = `/business/login`;
    }

}

export default BusinessSettingDiscountForm;


