import React from 'react';
import PageTitle from '../../../components/PageTitle/PageTitle';
import CustomerForm from './components/CustomerForm';
import { Store } from "./../../../context/Master/Customer";

import './index.scss'

const CustomerMaster = () => {
    const {
        createCustomer, state
    } = React.useContext(Store);

    return <div className="ct-master">
        <PageTitle title="Customer Master" />
        <div className="customer-form">
            <CustomerForm createCustomer={createCustomer} />
        </div>
    </div>
}

export default CustomerMaster;