// Gernal functions that are used in the app


// function that takes a string and converts it to a number
export function convertToNumber(string: string) {
    let number = Number(string);
    return number;
}

// function that takes a string and removes spaces and makes it lowercase
export function removeSpacesAndLowercase(string: string) {
    let newString = string.replace(/\s/g, '')
    newString = newString.toLowerCase()
    return newString
}