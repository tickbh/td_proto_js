
function td_check_vaild(buffer, size) {
    return buffer.remaining() >= size
}

function td_check_unvaild(buffer, size) {
    return !td_check_vaild(buffer, size)
}

var IsNull = IsNull || function(value) {
    return value == null || value == undefined
}

function td_from_value(value, type) {
    switch(type) {
    case TYPE_U8:
    case TYPE_I8:
    case TYPE_U16:
    case TYPE_I16:
    case TYPE_U32:
    case TYPE_I32:
    case TYPE_FLOAT:
        return {pattern: type, number: value}
    case TYPE_STR:
        return {pattern: type, str: value}
    case TYPE_RAW:
        return {pattern: type, raw: value}
    case TYPE_MAP:
        return {pattern: type, map: value}
    case TYPE_AU8:
    case TYPE_AU16:
    case TYPE_AI16:
    case TYPE_AU32:
    case TYPE_AI32:
    case TYPE_AFLOAT:
    case TYPE_ASTR:
    case TYPE_ARAW:
    case TYPE_AMAP:
        return {pattern: type, list: value}
    }
    return {pattern: TYPE_NIL}
}

function td_into_value(value) {
    switch(value.pattern) {
    case TYPE_U8:
    case TYPE_I8:
    case TYPE_U16:
    case TYPE_I16:
    case TYPE_U32:
    case TYPE_I32:
    case TYPE_FLOAT:
        return value.number
    case TYPE_STR:
        return value.str
    case TYPE_RAW:
        return value.raw
    case TYPE_MAP:
        return value.map
    case TYPE_AU8:
    case TYPE_AU16:
    case TYPE_AI16:
    case TYPE_AU32:
    case TYPE_AI32:
    case TYPE_AFLOAT:
    case TYPE_ASTR:
    case TYPE_ARAW:
    case TYPE_AMAP:
        return value.list
    }
    return null
}