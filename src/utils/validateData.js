import React from 'react'

export const validateData = (email, password, name) => {

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isNameValid = /^[a-zA-Z ]{2,30}$/.test(name);

    if (!isEmailValid) return "Email is not valid!";
    if (!isPasswordValid) return "Password is not valid";
    if (!isNameValid) return "Name is not valid"

    return null;
}
