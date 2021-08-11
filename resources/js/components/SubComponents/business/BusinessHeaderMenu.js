import React, {useEffect} from 'react';
import {createMuiTheme, makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {ThemeProvider} from '@material-ui/core';
import {Link} from "react-router-dom";

import BusinessProfileCircleMenu from '../business/BusinessProfileCircleMenu';
import axios from "axios";
import BusinessAlerts from "./BusinessAlertShow";
import Container from "@material-ui/core/Container/Container";



const drawerWidth = 240;



const listtheme = createMuiTheme({
    overrides: {

        MuiListItemText: { // Name of the component ⚛️ / style sheet
            primary:{ // Name of the rule
                fontFamily:'IRANSans',
            }
        }
    }
});



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        position:'fixed',
        width:'100%',
        zIndex:'1',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,

    },
    hide: {
        display: 'none',

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        direction: 'rtl',
        float:'right',
        right:'0px',



    },
    drawerPaper: {
        width: drawerWidth,
        float:'right',
        background:'#eceff1',



    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',

        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,

        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,

        }),
        marginRight: -drawerWidth,


    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,


    },
    list:{

        textAlign:'right',
        float:'right',
    },



}));


const linkstyle= {
    color:'#0e0e0e',
    textDecoration:'none',
    display:'contents'
};

const userphoneStyle={
    fontSize:'x-large'
};

function BusinessHeaderMenu() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [userphone,setUserphone]=React.useState();
    const [errormessage,setErrormesasage]=React.useState('');
    const [showerror,setShowerror]=React.useState(false);



    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    useEffect(()=> {


        const getPhoneBusiness=async ()=>{
            /*header config in app.js file so for all header need to check auth going and to check */
            try{
                const  res=  await axios.get('/api/business/getphone');

                setUserphone(res.data['phone']);
            }
            catch(error){


                setErrormesasage(
                    {
                        msg: error.response.data['message'],
                        key: Math.random(),
                        errortype: error.response.data['message type'],
                    });
                setShowerror(true);
            }
        };
        getPhoneBusiness();
    },[setUserphone]);





    return (
        <div className={classes.root}>

            {showerror ?
                <BusinessAlerts key={errormessage.key} errormessage={errormessage.msg} errortype={errormessage.errortype}/>:null
            }


            <CssBaseline />
            <AppBar
                style={{height:'65px',backgroundColor:'#00BFFF'}}
                position="fixed"
            >
                <Toolbar>
                    <Typography className={classes.title} variant="h6" color="inherit">

                        <BusinessProfileCircleMenu/>

                    </Typography>
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>

            <ThemeProvider theme={listtheme}>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >

                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <CloseIcon/> : <CloseIcon/>}

                        </IconButton>
                        <h2 style={userphoneStyle}> {userphone}</h2>

                    </div>
                    <Divider />


                    <List>
                        <Link style={linkstyle} to='/business/home'>
                        <ListItem button key={'صفحه نخست'} className={classes.list}>
                            <ListItemIcon><HomeIcon/></ListItemIcon>
                            <ListItemText  primary={'صفحه نخست'}/>
                        </ListItem>
                        </Link>


                        <Link style={linkstyle} to='/business/newcustomer'>
                        <ListItem button key={'مشتری جدید'} className={classes.list}>
                            <ListItemIcon><PersonAddIcon/></ListItemIcon>
                            <ListItemText  primary={'مشتری جدید'}/>
                        </ListItem>
                        </Link>


                        <Link style={linkstyle} to='/business/customerreport'>
                        <ListItem button key={'گزارش مشتریان'} className={classes.list}>
                            <ListItemIcon><ListAltIcon/></ListItemIcon>
                            <ListItemText  primary={'گزارش مشتریان'}/>
                        </ListItem>
                        </Link>


                        <Link style={linkstyle} to='/business/customersearch'>
                        <ListItem button key={'جستجو سریع مشتری'} className={classes.list}>
                            <ListItemIcon><SearchIcon/></ListItemIcon>
                            <ListItemText  primary={'جستجو سریع مشتری'}/>
                        </ListItem>
                        </Link>


                    </List>
                    <Divider />

                    <List>

                        <Link style={linkstyle} to='/business/editprofile'>
                        <ListItem button key={'ویرایش اطلاعات اولیه'} className={classes.list}>
                            <ListItemIcon><EditIcon/></ListItemIcon>
                            <ListItemText  primary={'ویرایش اطلاعات اولیه'}/>
                        </ListItem>
                        </Link>
                    </List>


                    <List>
                        <Link style={linkstyle} to='/business/settingdiscount'>
                        <ListItem button key={'فرم تنظیم تخفیف ها'} className={classes.list}>
                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                            <ListItemText  primary={'فرم تنظیم تخفیف ها'}/>
                        </ListItem>
                        </Link>
                    </List>

                    <List>
                        <Link style={linkstyle} to='/business/viewsettingdiscount'>
                            <ListItem button key={'مشاهده تنظیمات تخفیف ها'} className={classes.list}>
                                <ListItemIcon><VisibilityIcon/></ListItemIcon>
                                <ListItemText  primary={'مشاهده تنظیمات تخفیف ها'}/>
                            </ListItem>
                        </Link>
                    </List>

                    <List>
                        <Link style={linkstyle} to='/business/customeroffreport'>
                            <ListItem button key={'گزارش مشتریان دارای تخفیف'} className={classes.list}>
                                <ListItemIcon><AssignmentTurnedInIcon/></ListItemIcon>
                                <ListItemText  primary={'گزارش مشتریان دارای تخفیف'}/>
                            </ListItem>
                        </Link>
                    </List>

                    <Divider />

                </Drawer>

            </ThemeProvider>
        </div>
    );
}

export default BusinessHeaderMenu;