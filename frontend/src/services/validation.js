/**
 * @module validation
 * @description {@link module:validation|validation} module for validating user input
 * @global
 */

// Regular expression for validating password: at least 6 characters
/**
 * @constant
 * @type {RegExp}
 * @name PASSWORD_REGEX
 * @description Regular expression for validating password: at least 6 characters
 */
const PASSWORD_REGEX = /^.{6,}$/;

// Regular expression for validating email
/**
 * @constant
 * @type {RegExp}
 * @name EMAIL_REGEX
 * @description Regular expression for validating email
 */
const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Validates a password using a regular expression.
 * @function validatePassword
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
export function validatePassword(password) {
    return PASSWORD_REGEX.test(password);
}

/**
 * Validates an email using a regular expression.
 * @function validateEmail
 * @param {string} email - The email to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
export function validateEmail(email) {
    return EMAIL_REGEX.test(String(email).toLowerCase());
}
