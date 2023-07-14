const validateCreateAddress = (data) => {
    const { id, store, storeAddress } = data;

    if(id.lenght == 0){
        throw new Error("You need write something");
    }
    if(typeof id !== 'number'){
        throw new Error("Id must be a number");
    }
    
    if(store.lenght == 0){
        throw new Error("You need write something");
    }
    if(typeof store !== 'string'){
        throw new Error("Store must be a string");
    }

    if(storeAddress.lenght !== 0){
        throw new Error("You need write something");
    }
    if(typeof storeAddress !== 'string'){
        throw new Error("Store Address must be a string");
    }
}

const validateDeleteStore = (data) => {
    const { _id } = data;

    if(_id.lenght == 0){
        throw new Error("You need write something");
    }
    if(typeof _id !== 'string'){
        throw new Error("Id must be a string");
    }
}

module.exports = {
    validateCreateAddress,
    validateDeleteStore
}