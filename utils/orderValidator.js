const validateOrder = (data) => {
    const { orderNumber, sendItems, outSerieNum, applicant, indexAddress, availabilityDate, condition } = data;

    if(orderNumber.length == 0){
        throw new Error("You need write something");
    }
    if(typeof orderNumber !== 'number'){
        throw new Error("Order Number must be a number");
    }
    if(!/^[0-9]+$/i.test(orderNumber)){
        throw new Error("Contact Phone name must contain characters from 0-9");
    }

    for(let i = 0; i < sendItems.length; i++){
        if(sendItems[i].serieNum.length == 0){
            throw new Error("You need write something");
        }
        if(typeof sendItems[i].serieNum !== 'string'){
            throw new Error("Serie Number must be a string");
        }

        if(sendItems[i].finalUser.length == 0){
            throw new Error("You need write something");
        }
        if(typeof sendItems[i].finalUser !== 'string'){
            throw new Error("Final User must be a string");
        }

        if(sendItems[i].contactPhone.length == 0){
            throw new Error("You need write something");
        }
        if(typeof sendItems[i].contactPhone !== 'string'){
            throw new Error("Contact Phone must be a string");
        }
        if(!/^[0-9]+$/i.test(sendItems[i].contactPhone)){
            throw new Error("Contact Phone name must contain characters from 0-9");
        }
    }

    if(outSerieNum.length == 0){
        throw new Error("You need write something");
    }
    if(typeof outSerieNum !== 'string'){
        throw new Error("Out serie number must be a string");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(outSerieNum)) {
        throw new Error("Out serie number must contain characters from a-z and space");
    }

    if(applicant.length == 0){
        throw new Error("You need write something");
    }
    if(typeof applicant !== 'string'){
        throw new Error("Applicant must be a string");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(applicant)) {
        throw new Error("Applicant name must contain characters from a-z and space");
    }
    
    for(let j = 0; j < indexAddress.length; j++){
        if(indexAddress[j].id.length == 0){
            throw new Error("You need write something");
        }
        if(typeof indexAddress[j].id !== 'number'){
            throw new Error("Id must be a number");
        }
    }
    if(availabilityDate.length == 0){
        throw new Error("You need write something");
    }
    if (typeof availabilityDate !== 'string') {
        throw new Error("Availability Date must be a string");
    }
    if(!/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i.test(availabilityDate)){
        throw new Error("The format of emission date must be dd/mm/yyyy");
    }
    if(condition.length == 0){
        throw new Error("You need write something");
    }
    if(typeof condition !== 'string'){
        throw new Error("Condition must be a String");
    }
}
const validateOnlyOrderNumber = (data) => {
    const { orderNumber } = data;

    if(orderNumber.length == 0){
        throw new Error("You need write something");
    }
    if(typeof orderNumber !== 'number'){
        throw new Error("Order Number must be a number");
    }
    if(!/^[0-9]+$/i.test(orderNumber)){
        throw new Error("Contact Phone name must contain characters from 0-9");
    }
}
const validateOnlySendItems = (data) => {
    const { sendItems } = data;

    for(let i = 0; i < sendItems.length; i++){
        if(sendItems[i].serieNum.length == 0){
            throw new Error("You need write something");
        }
        if(typeof sendItems[i].serieNum !== 'string'){
            throw new Error("Serie Number must be a string");
        }

        if(sendItems[i].finalUser.length == 0){
            throw new Error("You need write something");
        }
        if(typeof sendItems[i].finalUser !== 'string'){
            throw new Error("Final User must be a string");
        }

        if(sendItems[i].contactPhone.length == 0){
            throw new Error("You need write something");
        }
        if(typeof sendItems[i].contactPhone !== 'string'){
            throw new Error("Contact Phone must be a string");
        }
        if(!/^[0-9]+$/i.test(sendItems[i].contactPhone)){
            throw new Error("Contact Phone name must contain characters from 0-9");
        }
    }
}
const validateOnlyOutSerieNum = (data) => {
    const { outSerieNum } = data;

    if(outSerieNum.length == 0){
        throw new Error("You need write something");
    }
    if(typeof outSerieNum !== 'string'){
        throw new Error("Out serie number must be a string");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(outSerieNum)) {
        throw new Error("Out serie number must contain characters from a-z and space");
    }
}
const validateOnlyApplicant = (data) => {
    const { applicant } = data;
    if(applicant.length == 0){
        throw new Error("You need write something");
    }
    if(typeof applicant !== 'string'){
        throw new Error("Applicant must be a string");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(applicant)) {
        throw new Error("Applicant name must contain characters from a-z and space");
    }
}
const validateOnlyAddress = (data) => {
    const { indexAddress } = data;
    for(let j = 0; j < indexAddress.length; j++){
        if(indexAddress[j].id.length == 0){
            throw new Error("You need write something");
        }
        if(typeof indexAddress[j].id !== 'number'){
            throw new Error("Id must be a number");
        }
    }
}
const validateOnlyAvailabilityDate = (data) => {
    const { availabilityDate } = data;
    if(availabilityDate.length == 0){
        throw new Error("You need write something");
    }
    if (typeof availabilityDate !== 'string') {
        throw new Error("Availability Date must be a string");
    }
    if(!/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i.test(availabilityDate)){
        throw new Error("The format of emission date must be dd/mm/yyyy");
    }
}
const validateOnlyCondition = (data) => {
    const { condition } = data;
    if(condition.length == 0){
        throw new Error("You need write something");
    }
    if(typeof condition !== 'string'){
        throw new Error("Condition must be a String");
    }
}
module.exports = {
    validateOrder,
    validateOnlyOrderNumber,
    validateOnlySendItems,
    validateOnlyOutSerieNum,
    validateOnlyApplicant,
    validateOnlyAddress,
    validateOnlyAvailabilityDate,
    validateOnlyCondition
}