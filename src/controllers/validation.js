// Should contain at least:
// one digit, one lower case, one upper case, 8 from the mentioned characters
const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

// Valid  Numbers Only
const REGEX_NUMBERS  = /^\d+$/;

// Valid Letters Only
const REGEX_LETTERS = /^[a-z]+$/i;

// Input Not Empty
export const exists = (value) => {
    let trimmedValue = value.trim();
    return trimmedValue !== '';
};

export const lettersOnly = (value) => {
    let trimmedValue = value.trim();
    return REGEX_LETTERS.test(trimmedValue);
};

export const numbersOnly = (value) => {
    let trimmedValue = value.trim();
    return REGEX_NUMBERS.test(trimmedValue);
};

export const valuesMatch = (value1, value2) => {
    let trimmedValue1 = value1.trim(),
        trimmedValue2 = value2.trim();

    return trimmedValue1 === trimmedValue2;
};

export const noWhiteSpaces = (value) => {
    return value.replace(/ +/g, "");
};

export const isPassword = (value) => {
    return REGEX_PASSWORD.test(value);
};

export const maxLength = (value, max) => {
    let trimmedValue = value.trim();
    return trimmedValue <= max;
};

export const minLength = (value, min) => {
    let trimmedValue = value.trim();

    return trimmedValue >= min;
};

//email form validation 
export const emailValidation = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} ;
