export const calculateAge = (birthdate) => {
    var ageDifMs = Date.now() - new Date(birthdate).getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}