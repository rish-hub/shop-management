import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './index.scss';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '100ch',
            },
        },
    }),
);



export default function CustomerForm(props) {
    const intialObj = {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
    }
    const classes = useStyles();
    const [initialValue, setInitialValue] = React.useState(intialObj);
    const [disabled, setDisbaled] = React.useState(true);


    const handleChange = (event) => {
        event.preventDefault();
        const newVal = { ...initialValue };
        newVal[event.target.name] = event.target.value
        const { name, email, phone, address } = newVal;
        setInitialValue(newVal);
        if (name && email && phone && address) {
            setDisbaled(false)
        } else {
            setDisbaled(true)
        }
        if (["name", "phone"].includes(event.target.name)) {
            props.searchOnchange(event.target.value, event.target.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        props.createCustomer(initialValue)
    }
    const handleReset = () => {
        setDisbaled(true)
        setInitialValue(intialObj)
    }
    return (
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            <div className="form-holder">
                <div className="rows">
                    <TextField
                        id="outlined-margin-normal"
                        label="Name*"
                        name="name"
                        multiline
                        value={initialValue.name}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-margin-normal"
                        label="Email*"
                        name="email"
                        multiline
                        value={initialValue.email}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </div>
                <div className="rows">
                    <TextField
                        id="outlined-margin-normal"
                        label="Phone*"
                        name="phone"
                        multiline
                        value={initialValue.phone}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-margin-normal"
                        label="Address*"
                        name="address"
                        multiline
                        value={initialValue.address}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </div>
                <div className="rows">
                    <div className="action-button">
                        <Button variant="outlined" onClick={handleReset}>Reset</Button>
                        <Button variant="outlined" disabled={disabled} type="submit">Submit</Button>
                    </div>
                </div>
            </div>
        </form>
    );
}