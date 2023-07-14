const validateTax = (data) => {
    const { docNumber, emissionDate, docType, supplier, recivedItems } = data;

    //VALIDATE docNumber
    if(docNumber.length == 0){
        throw new Error("You need write something");
    }
    if(typeof docNumber !== 'string'){
        throw new Error("Documnet Number must be a string");
    }
    if(!/^[0-9]+$/i.test(docNumber)){
        throw new Error("Document number name must contain characters from 0-9");
    }

    //VALIDATE emissionDate
    if(emissionDate.length == 0){
        throw new Error("You need wrtie something");
    }
    if(typeof emissionDate !== 'string'){
        throw new Error("Emission Date must be a String");
    }
    if(!/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i.test(emissionDate)){
        throw new Error("The format of emission date must be dd/mm/yyyy");
    }

    //VALIDATE docType
    if(docType.length == 0){
        throw new Error("You need write the type of the document");
    }
    if(typeof docType !== 'string'){
        throw new Error("Document type must be string");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(docType)) {
        throw new Error("Document type must contain characters from a-z and space");
    }

    //VALIDATE SUPPLIER
    if(supplier.length == 0){
        throw new Error("You need write the supplier name");
    }
    if(typeof supplier != 'string'){
        throw new Error("Supplier name must be string");
    }
    if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(supplier)) {
        throw new Error("UserName must contain characters from a-z and space");
    }

    for(let i = 0; i < recivedItems.length; i++){
        if(recivedItems[i].implementType.length == 0){
            throw new Error("You need write something");
        }
        if(typeof recivedItems[i].implementType !== 'string'){
            throw new Error("Implement Type must be a string");
        }
        if(recivedItems[i].serie.length == 0){
            throw new Error("You need write something");
        }
        if(typeof recivedItems[i].serie !== 'string'){
            throw new Error("Serie must be a string");
        }
    }
    return;
};
//VALIDATE ONLY DOCNUMBER
const validateDocNumber = (data) =>{
    const { docNumber } = data;
    if(docNumber.length == 0){
        throw new Error("You need write something");
    }
    if(typeof docNumber !== 'string'){
        throw new Error("Documnet Number must be a string");
    }
    if(!/^[0-9]+$/i.test(docNumber)){
        throw new Error("Document number name must contain characters from 0-9");
    }
    return;
};
//VALIDATE ONLY EMISSIONDATE
const validateEmissionDate = (data) =>{
    const { emissionDate } = data;
    if(emissionDate.length == 0){
        throw new Error("You need wrtie something");
    }
    if(typeof emissionDate !== 'string'){
        throw new Error("Emission Date must be a String");
    }
    if(!/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i.test(emissionDate)){
        throw new Error("The format of emission date must be dd/mm/yyyy");
    }
    return;
};
//VALIDATE ONLY DOCTYPE
const validateDocType = (data) =>{
    const { docType } = data;
    if(docType.length == 0){
        throw new Error("You need write the type of the document");
    }
    if(typeof docType !== 'string'){
        throw new Error("Document type must be string");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(docType)) {
        throw new Error("Document type must contain characters from a-z and space");
    }
    return;
};
//VALIDATE ONLY SUPPLIER
const validateSupplier = (data) =>{
    const { supplier } = data;
    if(supplier.length == 0){
        throw new Error("You need write the supplier name");
    }
    if(typeof supplier != 'string'){
        throw new Error("Supplier name must be string");
    }
    if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(supplier)) {
        throw new Error("UserName must contain characters from a-z and space");
    }
    return;
};
//VALIDATE ONLY SERIES
const validateSeries = (data) =>{
    const { serie } = data;
    if(serie.length == 0){
        throw new Error("You need write the series in the document");
    }
    return;
};
//VALIDTE ONLY FINAL USER
const validateFinalUser = (data) =>{
    const { finalUser } = data;
    if(finalUser.length == 0){
        throw new Error("You need write the type of the document");
    }
    if(typeof finalUser !== 'string'){
        throw new Error("Document type must be string");
    }
    return;
};
module.exports = {
    validateTax,
    validateDocNumber,
    validateEmissionDate,
    validateDocType,
    validateSupplier,
    validateSeries,
    validateFinalUser
};