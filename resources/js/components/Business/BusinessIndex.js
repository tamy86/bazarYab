import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import BusinessContent from './BusinessContent';
import BusinessCustomerReport from './BusinessCustomerReport';
import BusinessCustomerSearch from './BusinessCustomerSearch';
import BusinessNewCustomer from './BusinessNewCustomer';
import BusinessSettingDiscount from './BusinessSettingDiscount';
import BusinessViewSettingDiscount from './BusinessViewSettingDiscount';
import BusinessEditProfile from './BusinessEditProfile';
import BusinessHeader from "./BusinessHeader";
import BusinessFooter from "./BusinessFooter";
import BusinessLogout from "./BusinessLogout";
import App from "../../app";



function Businessindex() {
    return(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/business/home" component={BusinessContent}>

                    </Route>

                    <Route exact path="/business/customerreport" component={BusinessCustomerReport}>

                    </Route>

                    <Route exact path="/business/customersearch" component={BusinessCustomerSearch}>

                    </Route>

                    <Route exact path="/business/newcustomer" component={BusinessNewCustomer}>

                    </Route>

                    <Route exact path="/business/settingdiscount" component={BusinessSettingDiscount}>

                    </Route>

                    <Route exact path="/business/viewsettingdiscount" component={BusinessViewSettingDiscount}>

                    </Route>

                    <Route exact path="/business/editprofile" component={BusinessEditProfile}>

                    </Route>

                    <Route exact path="/business/logout" component={BusinessLogout}>

                    </Route>


                </Switch>


                <BusinessHeader/>


                <BusinessFooter/>


            </div>
        </BrowserRouter>
    );
}
export default Businessindex;

if(document.getElementById('businessindex')){
    ReactDOM.render(<Businessindex/>,document.getElementById('businessindex'));
}
