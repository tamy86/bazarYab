import BusinessAlerts from "./components/SubComponents/business/BusinessAlertShow";

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

{/*//Home*/}

{/*require('./components/Example');*/}
{/*require('./components/Home/HomeHeader');*/}
{/*require('./components/Home/HomeContent')*/}
{/*require('./components/Home/HomeFooter');*/}


{/*//User*/}

{/*require('./components/Users/UserLogin');*/}
{/*require('./components/Users/UserHeader');*/}
{/*require('./components/Users/UserContent');*/}
{/*require('./components/Users/UserFooter');*/}
{/*require('./components/Users/UserBusinessReport');*/}
{/*require('./components/Users/UserDiscountReport');*/}
{/*require('./components/Users/UserEditProfile');*/}



{/*//Business*/}
{/*require('./components/Business/BusinessLogin');*/}
{/*require ('./components/Business/BusinessHeader');*/}
{/*require ('./components/Business/BusinessContent');*/}
{/*require('./components/Business/BusinessFooter');*/}
{/*require('./components/Business/BusinessNewCustomer');*/}
{/*require('./components/Business/BusinessSettingDiscount');*/}
{/*require('./components/Business/BusinessCustomerReport');*/}
{/*require('./components/Business/BusinessCustomerSearch');*/}


import React, {useEffect} from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserLogin from './components/Users/UserLogin';
import BusinessLogin from './components/Business/BusinessLogin';
import HomeContent from './components/Home/HomeContent';

import BusinessIndex from './components/Business/BusinessIndex';
import UserIndex from './components/Users/UserIndex';
import BusinessLogut from './components/Business/BusinessLogout';

import axios from "axios";



axios.defaults.baseURL='http://127.0.0.1:8000/';
axios.defaults.headers.common['Authorization']='Bearer '+ localStorage.getItem('token');
// BusinessContent.defaults.headers.common['Authorization']='Bearer'+ localStorage.getItem('token');
// BusinessLogin.defaults.headers.common['Authorization']='Bearer'+ localStorage.getItem('token');
// options.headers.set('Authorization','Bearer'+localStorage.getItem('token'));







function App(){
    return(
        <BrowserRouter>

            <div>

            <Switch>

                //home

                <Route exact path="/" component={HomeContent}>

                </Route>
                <Route exact path="/user/login" component={UserLogin}>

                </Route>
                <Route exact path="/business/login" component={BusinessLogin}>

                </Route>



                //user

                <Route exact path="/user/home" component={UserIndex}>

                </Route>

                <Route exact path="/user/businessreport" component={UserIndex}>

                </Route>

                <Route exact path="/user/discountsreport" component={UserIndex}>

                </Route>

                <Route exact path="/user/editprofile" component={UserIndex}>

                </Route>

                //business

                <Route exact path="/business/home" component={BusinessIndex}>

                </Route>

                <Route exact path="/business/customerreport" component={BusinessIndex}>

                </Route>

                <Route exact path="/business/customersearch" component={BusinessIndex}>

                </Route>

                <Route exact path="/business/newcustomer" component={BusinessIndex}>

                </Route>

                <Route exact path="/business/settingdiscount" component={BusinessIndex}>

                </Route>

                <Route exact path="/business/viewsettingdiscount" component={BusinessIndex}>

                </Route>

                <Route exact path="/business/customeroffreport" component={BusinessIndex}>

                </Route>

                <Route exact path="/business/editprofile" component={BusinessIndex}>

                </Route>

                <Route exact path="/business/logout" component={BusinessIndex}>

                </Route>



            </Switch>

            </div>
        </BrowserRouter>
    );
}

export default App;


if(document.getElementById('app')){
    ReactDOM.render(<App/>,document.getElementById('app'));
}