import React from 'react';
import Container from '@material-ui/core/Container';
import BusinessCustomerHasOffReport from '../SubComponents/business/BusinessCustomerHasOffReport';
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

function BusinessCustomerHasOff() {
    return(
        <div>


            <Container maxWidth="xl" style={userLoginStyle}>

                <BusinessCustomerHasOffReport/>

            </Container>

        </div>
    );
}

export default BusinessCustomerHasOff;
