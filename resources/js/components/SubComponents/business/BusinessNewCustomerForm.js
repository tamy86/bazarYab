import React, {useEffect} from 'react';
import Container  from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import BusinessAlerts from "./BusinessAlertShow";



import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from  '@material-ui/core/DialogContentText';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(0),
            width: '100%',
            marginTop:'40px',
            direction: 'rtl',

        },
        "& .MuiFormLabel-root": {
            fontFamily:'IRANSans',
        },
        "& .MuiInputLabel-formControl":{
            right:0,
            left:'auto',
        },

    },
}));

const styleBgForm= {
    backgroundColor: '#f0f1f4',
    direction: 'ltr',
    width: '70%',
    height: '100%',
    minWidth:'270px',
    minHeight:'400px',
    fontFamily:'IRANSans',
    paddingTop: '40px',
    paddingBottom:'40px',

};
const headerLoginForm={
    backgroundColor:'#001a33',
    width: '100%',
    color:'#fff',
    fontFamily:'IRANSans',
    textAlign:'center',
    fontSize:'20px',

};
const formLogin={
    textAlign:'center',
};
const mobileIconStyle={
    position:'absolute',
    float:'right',
    paddingLeft:'5px',
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
};
const textDialog={
    fontFamily:'IRANSans',
    direction:'rtl',

};

function BusinessNewCustomerForm(){

    const [disableForm,setDisableForm]=React.useState(true);
    const [presentedPhone,setPresentedPhone]=React.useState();
    const [presentedId,setPresentedId]=React.useState();
    const [error,setError]=React.useState();
    const [showerror,setShowerror]=React.useState(false);
    const [errormessage,setErrormesasage]=React.useState('');

    const [customerPhone,setCustomerPhone]=React.useState('');
    const [customerName,setCustomerName]=React.useState('');
    const [customerFamily,setCustomerFamily]=React.useState('');

    const [searchMessage,setSearchMessage]=React.useState('');
    const [openDialog,setOpenDialog]=React.useState(false);

    const [presentedName,setPresentedName]=React.useState('');
    const [presentedFamily,setPresentedFamily]=React.useState('');
    const [showPresentedInfo,setShowPresentedInfo]=React.useState(false);
    const [colorPresentedMsg,setColorPresentedMsg]=React.useState('');

    const classes = useStyles();


    const handleDialogClose = () => {
        setOpenDialog(false);
    };


    function searchPresentedPhone(){
        const mobile = /^(09)(12|19|35|36|37|38|39|32|21|22|31|34|13|14|18|17|16|15|11|10|20|90|91|92|93|94|01|02|03|04|05|30|33|)\d{7}$/g;
        const result = presentedPhone.match(mobile);

        if((result)&&(presentedPhone !== ''))
        {
            axios.post('/api/business/searchpresented',
                {
                    'phone':presentedPhone,

                }).then((res)=>{


                    if((res.status===200)&&(res.data['Success']===1))
                    {


                        setPresentedId(res.data['presented_id']);
                        setSearchMessage(res.data['message']);

                        setPresentedName(res.data['presented_name']);
                        setPresentedFamily(res.data['presented_family']);

                        setOpenDialog(true);
                        setDisableForm(false);
                        setShowPresentedInfo(true);
                        setColorPresentedMsg('#2ECC71');


                    }else
                        if((res.status===200)&&(res.data['Success']===2))
                        {
                            setPresentedId(res.data['presented_id']);
                            setSearchMessage(res.data['message']);

                            setPresentedName('');
                            setPresentedFamily('');

                            setOpenDialog(true);
                            setDisableForm(false);
                            setShowPresentedInfo(false);
                            setColorPresentedMsg('#F63600');
                        }
            }).catch((error)=>{
                setError(error.response.status);
                setErrormesasage({
                    msg: error.response.data['message'],
                    key: Math.random(),
                    errortype:error.response.data['message_type'],
                });
                setShowerror(true);

            });

        }else{
            setErrormesasage(
                {
                    msg: 'شماره همراه صحیح نمی باشد',
                    key: Math.random(),
                    errortype: 'warning'
                });

            setShowerror(true);

        }
    }



function saveNewCustomerForm(){
    const mobile = /^(09)(12|19|35|36|37|38|39|32|21|22|31|34|13|14|18|17|16|15|11|10|20|90|91|92|93|94|01|02|03|04|05|30|33|)\d{7}$/g;
    const charFarsi=/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/;

    const result = customerPhone.match(mobile);
    const resultCharFarsiName = customerName.match(charFarsi);
    const resultCharFarsiFamily = customerFamily.match(charFarsi);

    
    
if((!result)&&(!resultCharFarsiName)&&(!resultCharFarsiFamily))
{
    setErrormesasage(
        {
            msg: 'شماره همراه، نام یا نام خانوادگی صحیح نمیباشد. (نام و نام خانوادگی باید فارسی باشد)',
            key: Math.random(),
            errortype: 'warning'
        });

    setShowerror(true);

}else

    if((!result)){
        setErrormesasage(
            {
                msg: 'شماره همراه صحیح نمیباشد',
                key: Math.random(),
                errortype: 'warning'
            });

        setShowerror(true);

}else
    if(!resultCharFarsiName)
    {
        setErrormesasage(
            {
                msg: ' نام صحیح نمیباشد. (نام و نام خانوادگی باید فارسی باشد)',
                key: Math.random(),
                errortype: 'warning'
            });

        setShowerror(true);

    }else
        if(!resultCharFarsiFamily){

            setErrormesasage(
                {
                    msg: 'نام خانوادگی صحیح نمیباشد. (نام و نام خانوادگی باید فارسی باشد)',
                    key: Math.random(),
                    errortype: 'warning'
                });

            setShowerror(true);

        }else{

                axios.post('/api/business/newcustomer', {
                    'customerphone': customerPhone,
                    'customername': customerName,
                    'customerfamily': customerFamily,
                    'presentedid': presentedId,
                    'presentedphone': presentedPhone,
                }).then((res) => {

                    if ((res.data['Success'] === 1)||(res.status===200))
                    {
                        setErrormesasage(
                            {
                                msg: res.data['message'],
                                key: Math.random(),
                                errortype: res.data['message_type'],
                            });

                        setShowerror(true);
                        }

                }).catch ((error) =>{
                setErrormesasage(
                    {
                        msg: error.response.data['message'],
                        key: Math.random(),
                        errortype: error.response.data['message_type'],
                    });
                setShowerror(true);

            });
           
           
        }

}



    return(
        <Container  style={styleBgForm}>

            {showerror ?
                <BusinessAlerts key={errormessage.key} errormessage={errormessage.msg} errortype={errormessage.errortype}/>:null
            }


            <Dialog open={openDialog} onClose={handleDialogClose} style={textDialog} >

                <DialogTitle style={{'backgroundColor':colorPresentedMsg}}>
                    <h6 style={textDialog}>مشخصات شماره همراه وارد شده</h6>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText style={textDialog}>
                        <h4 style={{'color':colorPresentedMsg}}> {searchMessage}</h4>
                        {showPresentedInfo ?
                            <div>
                            نام معرف:
                            <h4>{presentedName}</h4>
                            نام خانوادگی معرف:
                            <h4>{presentedFamily}</h4>
                            </div>:null
                        }
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={handleDialogClose} color="primary">
                        <h3 style={textDialog}>بستن</h3>
                    </Button>
                </DialogActions>

            </Dialog>

            <div style={{fontFamily:'IRANSans',textAlign:'center'}}>
                <h4>جهت درج صحیح اطلاعات در ابتدا حتما شماره همراه معرف را جستجو کنید سپس اطلاعات را ذخیره نمایید</h4>
            </div>

            <div className="card-header" style={headerLoginForm}>
                فرم مشتری جدید<PersonAddIcon style={mobileIconStyle}/>
            </div>

            <form className={classes.root} style={formLogin}>

                <Container maxWidth='xs' xs='6'>
                    <TextField
                        id="PresentedMobileNo"
                        label="تلفن همراه معرف(09xxxxxxxxx)"
                        type="number"
                        onChange={event=>setPresentedPhone(event.target.value)}
                        value={presentedPhone}
                        InputProps={{endAdornment:
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                    style={{backgroundColor:"#e6e6e6",bottom:'5px'}}
                                    onClick={()=>{searchPresentedPhone();}}
                                >
                                    <SearchIcon />
                                </IconButton>}}

                    />
                </Container>



                <Container maxWidth='xs' xs='6'>
                <TextField
                    id="MobileNo"
                    label="تلفن همراه(0912xxxxxxx)"
                    disabled={disableForm}
                    onChange={event=>setCustomerPhone(event.target.value)}
                    value={customerPhone}
                    InputProps={{endAdornment:<PhoneAndroidIcon/>}}
                />
                </Container>
                <Container maxWidth='xs' xs='6'>
                <TextField
                    id="name"
                    label="نام (فارسی)"
                    disabled={disableForm}
                    onChange={event=>setCustomerName(event.target.value)}
                    value={customerName}
                    InputProps={{endAdornment:<PersonIcon/>}}
                />
                </Container>
                <Container maxWidth='xs' xs='6'>
                <TextField
                    id="family"
                    label="نام خانوادگی (فارسی)"
                    disabled={disableForm}
                    onChange={event=>setCustomerFamily(event.target.value)}
                    value={customerFamily}
                    InputProps={{endAdornment:<PersonIcon/>}}
                />
                </Container>
                <div style={spaceBetwenButton} >
                    <Button
                        disabled={disableForm}
                        variant="outlined"
                        color="primary"
                        style={styleButton}
                        onClick={()=>{saveNewCustomerForm();}}
                    >
                        ذخیره فرم<SaveIcon/>
                    </Button>
                    <Button variant="outlined" color="primary" style={styleButton}>
                        کنسل فرم<CancelIcon/>
                    </Button>
                </div>


            </form>


        </Container >
    );
}

export default BusinessNewCustomerForm;