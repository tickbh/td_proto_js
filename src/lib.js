
function td_check_vaild(buffer, size) {
    return buffer.byteOffset + size <= this.byteLength
}

function td_check_unvaild(buffer, size) {
    return !td_check_vaild(buffer, size)
}

var IsNull = IsNull || function(value) {
    return value == null || value == undefined
}