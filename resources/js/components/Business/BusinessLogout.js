import React, {useEffect} from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import axios from "axios";



function Businesslogout() {

    const [logout,setLogout]=React.useState([]);


    useEffect(()=>{

        axios.defaults.headers.common['Authorization']='Bearer '+ localStorage.getItem('token');

        const businessLogout=async ()=>{
            try{
                const res= await axios.get('/api/business/logout');


                setLogout(res.data);
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
        businessLogout();
    },[setLogout]);


    window.location=`/business/home`;


    return(
        <div></div>
    );

}
export default Businesslogout;

