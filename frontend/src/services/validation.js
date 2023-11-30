// Regular expression for validating password: at least 6 characters
const PASSWORD_REGEX = /^.{6,}$/;

// Regular expression for validating email
const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validatePassword(password) {
    return PASSWORD_REGEX.test(password);
}

export function validateEmail(email) {
    return EMAIL_REGEX.test(String(email).toLowerCase());
}
