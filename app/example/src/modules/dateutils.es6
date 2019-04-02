let stringToDate = dateAsString => {
    let date = dateAsString.split('-');
    let d = date[0];
    let m = date[[1] - 1];
    let y = date[2];
    return new Date(y, m, d, 23, 59, 59);
}

export function birthdateToAge(birthdate) {

   return stringToDate(birthdate);
    
};