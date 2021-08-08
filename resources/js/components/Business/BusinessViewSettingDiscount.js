import React from 'react';
import Container from '@material-ui/core/Container';
import BusinessViewSettingDiscountForm from '../SubComponents/business/BusinessViewSettingDiscountForm';
import BusinessHeader from '../Business/BusinessHeader';
import BusinessFooter from '../Business/BusinessFooter';


const userLoginStyle={
    backgroundColor:'#fff',
    width:"100%",
    height:'100%',
    direction:'rtl',
    marginTop:'0px',
    paddingTop:'50px',
    padding:'80px 0',
};

function BusinessViewSettingDiscount() {
    return(
        <div>


            <Container maxWidth="xl" style={userLoginStyle}>

                <BusinessViewSettingDiscountForm/>

            </Container>

        </div>
    );
}

export default BusinessViewSettingDiscount;
