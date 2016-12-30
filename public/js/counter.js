function validatePIN (pin) {
    var letterNumber = /^[-.0-9a-zA-Z]+$/
    if (pin.match(letterNumber)) {
        return false;
    } else if (pin.length==4 || pin.length==6) {
        return true;
    }
}
