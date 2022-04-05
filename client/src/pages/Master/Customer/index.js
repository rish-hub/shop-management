import React from 'react';
import PageTitle from '../../../components/PageTitle/PageTitle';
import CustomerForm from './components/CustomerForm';
import { Store } from "./../../../context/Master/Customer";
import MUIDataTable from "mui-datatables";

import './index.scss'
import TableComponent from '../../dashboard/components/Table/Table';

const CustomerMaster = () => {
    const {
        state: { searchCustomers, customers },
        createCustomer,

        getSearchedCustomers,
        getCustomers,
    } = React.useContext(Store);

    React.useEffect(() => {
        getCustomers();
    }, [])

    const handleSearch = (value, field) => {
        const obj = {
            [field]: value
        } 

        getSearchedCustomers(obj)
    }

    return <div className="ct-master">
        <PageTitle title="Customer Master" />
        <div className="customer-form">
            <CustomerForm
                createCustomer={createCustomer}
                searchOnchange={handleSearch} />
        </div>
        <div className="customer-table">
            <MUIDataTable
                title="Customers List"
                data={customers}
                columns={["name", "email", "phone", "address"]}
                options={{
                    filterType: "checkbox",
                    rowsPerPage: 5,
                }}
            />
        </div>
    </div>
}

export default CustomerMaster;