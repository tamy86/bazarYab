import React,{useEffect} from 'react';
import Container  from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import StoreIcon from '@material-ui/icons/Store';
import BusinessIcon from '@material-ui/icons/Business';

import { makeStyles } from '@material-ui/core/styles';
import BusinessAlerts from "./BusinessAlertShow";
import axios from 'axios';

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

function BusinessEditProfileForm(){
    const [errormessage,setErrormesasage]=React.useState('');
    const [showerror,setShowerror]=React.useState(false);
    const [businssMobile,setBusinessMobile]=React.useState();
    const [businssName,setBusinessName]=React.useState('');
    const [businssAddress,setBusinessAddress]=React.useState();
    const [error,setError]=React.useState();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const classes = useStyles();


    useEffect(()=>{

        axios.defaults.headers.common['Authorization']='Bearer'+localStorage.getItem('token');

        const getBusinessUserInfo=async ()=>{
            try{

                const res=await axios.get('/api/business/editprofile');

                setBusinessMobile(res.data['phone']);
                setBusinessName(res.data['name']);
                setBusinessAddress(res.data['address']);

            }
            catch (error) {
                setErrormesasage(
                    {
                        msg:error.response.data['message'],
                        key:Math.random(),
                        errortype:error.response.data['message type'],

                    });
                setShowerror(true);

            }
        };
        getBusinessUserInfo();
    },[setBusinessMobile,setBusinessName,setBusinessAddress]);


    function saveEditedForm() {

        const charFarsi = /^[-]|[۰۱۲۳۴۵۶۷۸۹]|[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/;

        const resultCharFarsiName = businssName.match(charFarsi);
        const resultCharFarsiAddress = businssAddress.match(charFarsi);

        if ((!resultCharFarsiName) && (!resultCharFarsiAddress)) {
            setErrormesasage(
                {
                    msg: 'نام یا آدرس وارد شده صحیح نمی باشد. (نام و آدرس باید فارسی و خالی نباشند)',
                    key: Math.random(),
                    errortype: 'warning'
                });

            setShowerror(true);

        } else
            if ((!resultCharFarsiName)||(businssName==null)) {
            setErrormesasage(
                {
                    msg: 'نام صحیح نمی باشد(نام باید فارسی و خالی نباشد)',
                    key: Math.random(),
                    errortype: 'warning'
                });

            setShowerror(true);
        }
        else
            if ((!resultCharFarsiAddress)||(businssName==null)) {
            setErrormesasage(
                {
                    msg: 'آدرس صحیح نمی باشد (آدرس باید فارسی و خالی نباشد)',
                    key: Math.random(),
                    errortype: 'warning'
                });

            setShowerror(true);
        }
        else {

            axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

            axios.put('/api/business/updateprofileform', {
                'businessMobile': businssMobile,
                'businessName': businssName,
                'businessAddress': businssAddress,
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


        }
    }


    return(
        <Container  style={styleBgForm}>

            {showerror ?
                <BusinessAlerts key={errormessage.key} errormessage={errormessage.msg} errortype={errormessage.errortype}/>:null
            }


            <div className="card-header" style={headerLoginForm}>
                فرم ویرایش کسب و کار<StoreIcon style={mobileIconStyle}/>
            </div>

            <form className={classes.root} style={formLogin}>
                <Container maxWidth='xs' xs='6'>
                    <TextField
                        id="mobileNoShoping"

                        InputProps={{endAdornment:<PhoneAndroidIcon/>}}
                        disabled={true}
                        defaultValue={businssMobile}
                        value={businssMobile}
                        inputProps={{readOnly:true}}


                    />
                </Container>
                <Container maxWidth='xs' xs='6'>
                    <TextField
                        id="shopingName"
                        InputProps={{endAdornment:<StoreIcon/>}}
                        value={businssName}
                        onChange={event=>setBusinessName(event.target.value)}


                    />
                </Container>
                <Container maxWidth='xs' xs='6'>
                    <TextField
                        id="shopingAddress"
                        InputProps={{endAdornment:<BusinessIcon/>}}
                        value={businssAddress}
                        onChange={event=>setBusinessAddress(event.target.value)}
                    />
                </Container>
                <div style={spaceBetwenButton}>
                    <Button variant="outlined" color="primary" style={styleButton} onClick={()=>{saveEditedForm();}}>
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

export default BusinessEditProfileForm;