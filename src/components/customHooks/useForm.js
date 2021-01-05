import { useState } from "react";

const useForm = (validate, submitForm) => {
    const [values, setValues] = useState({
        email: "",
        login: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        let validateErrors = validate(values); 
        setErrors(validateErrors);

        if(Object.keys(validateErrors).length === 0) {
            submitForm();
        }
    }

    return {handleChange, values, handleSubmit, errors };
}

export default useForm;