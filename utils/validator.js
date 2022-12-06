const validateUserRegister = (data) => {
    const {firstname, lastname, email, username, department, ccosto, password} = data;
    // ---- Validate FIRSTNAME
    if (typeof firstname !== 'string') {
        throw new Error("FirstName must be a string");
    }
    if (firstname.length <= 5) {
        throw new Error("FirstName must be a string of more than 5 characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(firstname)) {
        throw new Error("FirstName must contain characters from a-z and space");
    }

    // ---- Validate LASTNAME
    if (typeof lastname !== 'string') {
        throw new Error("LastName must be a string");
    }
    if (lastname.length <= 5) {
        throw new Error("LastName must be a string of more than 5 characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(lastname)) {
        throw new Error("LastName must contain characters from a-z and space");
    }

    // ---- Validate EMAIL
    if (typeof email !== 'string') {
        throw new Error("Email must be a string");
    }
    let largo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    if (!largo.test(email.toLowerCase())) {
        throw new Error("Email must contain characters from a-z and space");
    }

    // ---- Validate USERNAME
    if (typeof username !== 'string') {
        throw new Error("UserName must be a string");
    }
    if (username.length <= 5) {
        throw new Error("UserName must be a string of more than 5 characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(username)) {
        throw new Error("UserName must contain characters from a-z and space");
    }
/*
    // ---- Validate DEPARTMENT
    if (typeof department !== 'string') {
        throw new Error("Department must be a string");
    }
    if (department.length <= 5) {
        throw new Error("Department must be a string of more than 5 characters");
    }
    if (!/^[a-zA-Z0-9À-ÿ\u00f1\u00d1]+(\s*[a-zA-Z0-9À-ÿ\u00f1\u00d1]*)*[a-zA-Z0-9À-ÿ\u00f1\u00d1]+$/i.test(department)) {
        throw new Error("Department must contain characters from a-z and space");
    }

    // ---- Validate CCOSTO
    if (typeof ccosto !== 'number') {
        throw new Error("Cost Center must be a number");
    }
    if (ccosto.length <= 0) {
        throw new Error("Cost Center must be greater than 0");
    }
*/
    // ---- Validate PASSWORD
    if (typeof password !== 'string') {
        throw new Error("Password must be a string");
    }
    if (password.length <= 8) {
        throw new Error("Password must be a string of more than 5 characters");
    }
    let pass = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040-\u002e])(?=.*[A-Z])(?=.*[a-z])\S{8,20}$/
    if (!pass.test(password)) {
        throw new Error("Your password must be longer than 8 characters, have at least 1 capital letter, have at least 1 number, and have at least 1 special character");
    }

}

const validateLogin = (data) => {
    const {username, password} = data;
    // ---- Validate USERNAME
    if (typeof username !== 'string') {
        throw new Error("UserName must be a string");
    }
    if (username.length <= 5) {
        throw new Error("UserName must be a string of more than 5 characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(username)) {
        throw new Error("UserName must contain characters from a-z and space");
    }
    // ---- Validate PASSWORD
    if (typeof password !== 'string') {
        throw new Error("Password must be a string");
    }
    if (password.length <= 8) {
        throw new Error("Password must be a string of more than 5 characters");
    }
    let pass = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040-\u002e])(?=.*[A-Z])(?=.*[a-z])\S{8,20}$/
    if (!pass.test(password)) {
        throw new Error("Your password must be longer than 8 characters, have at least 1 capital letter, have at least 1 number, and have at least 1 special character");
    }
    return "OK";
}

const validateUserCreate = (data) => {
    const {firstname, lastname, email, username, role, password} = data;
    // ---- Validate FIRSTNAME
    if (typeof firstname !== 'string') {
        throw new Error("FirstName must be a string");
    }
    if (firstname.length <= 5) {
        throw new Error("FirstName must be a string of more than 5 characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(firstname)) {
        throw new Error("FirstName must contain characters from a-z and space");
    }

    // ---- Validate LASTNAME
    if (typeof lastname !== 'string') {
        throw new Error("LastName must be a string");
    }
    if (lastname.length <= 5) {
        throw new Error("LastName must be a string of more than 5 characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(lastname)) {
        throw new Error("LastName must contain characters from a-z and space");
    }

    // ---- Validate EMAIL
    if (typeof email !== 'string') {
        throw new Error("Email must be a string");
    }
    let largo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    if (!largo.test(email.toLowerCase())) {
        throw new Error("Email must contain characters from a-z and space");
    }

    // ---- Validate USERNAME
    if (typeof username !== 'string') {
        throw new Error("UserName must be a string");
    }
    if (username.length <= 5) {
        throw new Error("UserName must be a string of more than 5 characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(username)) {
        throw new Error("UserName must contain characters from a-z and space");
    }

    // ---- Validate ROLE
    if (typeof role !== 'string') {
        throw new Error("Role must be a string");
    }
    if (role.length <= 3) {
        throw new Error("Role must be a string of more than 5 characters");
    }
    if (!/^[a-zA-Z0-9À-ÿ\u00f1\u00d1]+(\s*[a-zA-Z0-9À-ÿ\u00f1\u00d1]*)*[a-zA-Z0-9À-ÿ\u00f1\u00d1]+$/i.test(role)) {
        throw new Error("Role must contain characters from a-z and space");
    }

    // ---- Validate PASSWORD
    if (typeof password !== 'string') {
        throw new Error("Password must be a string");
    }
    if (password.length <= 8) {
        throw new Error("Password must be a string of more than 5 characters");
    }
    let pass = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040-\u002e])(?=.*[A-Z])(?=.*[a-z])\S{8,20}$/
    if (!pass.test(password)) {
        throw new Error("Your password must be longer than 8 characters, have at least 1 capital letter, have at least 1 number, and have at least 1 special character");
    }
}


module.exports = {
    validateUserRegister,
    validateLogin,
    validateUserCreate,
}