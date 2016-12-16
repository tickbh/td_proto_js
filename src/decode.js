
function new_type_nil() {
    return {pattern: TYPE_NIL}
}

function decode_number(buffer, pattern) {
    switch(pattern) {
    case TYPE_U8: {
        if(td_check_unvaild(buffer, 1)) return new_type_nil();
        return {pattern: TYPE_U8, number: buffer.getUint8()}
    }
    case TYPE_I8: {
        if(td_check_unvaild(buffer, 1)) return new_type_nil();
        return {pattern: TYPE_I8, number: buffer.getInt8()}
    }
    case TYPE_U16: {
        if(td_check_unvaild(buffer, 2)) return new_type_nil();
        return {pattern: TYPE_U16, number: buffer.getUint16()}
    }
    case TYPE_I16: {
        if(td_check_unvaild(buffer, 2)) return new_type_nil();
        return {pattern: TYPE_I16, number: buffer.getInt16()}
    }
    case TYPE_U32: {
        if(td_check_unvaild(buffer, 4)) return new_type_nil();
        return {pattern: TYPE_U32, number: buffer.getUint32()}
    }
    case TYPE_I32: {
        if(td_check_unvaild(buffer, 4)) return new_type_nil();
        return {pattern: TYPE_I32, number: buffer.getInt32()}
    }
    case TYPE_FLOAT: {
        if(td_check_unvaild(buffer, 4)) return new_type_nil();
        return {pattern: TYPE_FLOAT, number: buffer.getInt32() / 1000.0}
    }
    default:
        throw new Error("Unknow decode number type")
    }
}

function decode_str_raw(buffer, pattern) {
    switch(pattern) {
    case TYPE_STR: {
        if(td_check_unvaild(buffer, 2)) return new_type_nil();
        var length = decode_number(buffer, TYPE_U16)
        if(length == 0) {
            return {pattern: TYPE_STR, str: ""}
        }
        if(td_check_unvaild(buffer, length)) return new_type_nil();
        return {pattern: TYPE_STR, str: buffer.getString(length)}
    }
    case TYPE_RAW: {
        if(td_check_unvaild(buffer, 2)) return new_type_nil();
        var length = decode_number(buffer, TYPE_U16)
        if(length == 0) {
            return {pattern: TYPE_RAW, str: ""}
        }
        if(td_check_unvaild(buffer, length)) return new_type_nil();
        return {pattern: TYPE_RAW, str: buffer.getString(length)}
    }
    default:
        throw new Error("Unknow decode str type")
    }
}

function read_field(buffer) {
    if(td_check_unvaild(buffer, 4)) return new_type_nil();
    var index = decode_number(buffer, TYPE_U16)
    var pattern = decode_number(buffer, TYPE_U16)
    return {
        index: index,
        pattern: pattern,
    }
}

function decode_by_field(buffer, config, field) {
    // var name = get_type_by_name(field.pattern)
    var t = field.pattern
    switch(t) {
    case TYPE_U8:
    case TYPE_I8:
    case TYPE_U16:
    case TYPE_I16:
    case TYPE_U32:
    case TYPE_I32:
    case TYPE_FLOAT: {
        return decode_number(buffer, t)
    }
    case TYPE_STR:
    case TYPE_RAW: {
        return decode_str_raw(buffer, t)
    }
    case TYPE_MAP: {
        return decode_map(buffer, config)
    }
    case TYPE_AU8:
    case TYPE_AI8:
    case TYPE_AU16:
    case TYPE_AI16:
    case TYPE_AU32:
    case TYPE_AI32:
    case TYPE_AFLOAT: 
    case TYPE_ASTR:
    case TYPE_ARAW:
    case TYPE_AMAP: {
        var list = []
        while(true) {
            var sub_value = decode_field(buffer, config)
            if(sub_value.pattern == TYPE_NIL) {
                break;
            }
            list.push(sub_value)
        }
        return {pattern: t, list: list}
    } 
    default: 
        return new_type_nil();
    }
}

function decode_field(buffer, config) {
    var field = read_field(buffer)
    if(!field || field.pattern == TYPE_NIL) {
        return {pattern: TYPE_NIL};
    }
    return decode_by_field(buffer, config, field)
}


function decode_map(buffer, config) {
    var map = {}
    while(true) {
        var field = read_field(buffer)
        if (field.pattern == TYPE_NIL) {
            break
        }
        var sub_value = decode_field(buffer, config)
        var name = get_field_index_name(config, field.index)
        if(!name) {
            continue
        }
        map[name] = sub_value
    }
    return {pattern: TYPE_MAP, map: map}
}

function decode_proto(buffer, config) {
    var name = decode_str_raw(buffer, TYPE_STR).str
    var list = []
    while(true) {
        var sub_value = decode_field(buffer, config)
        if(sub_value.pattern == TYPE_NIL) {
            break
        }
        list.push(sub_value)
    }
    var proto = get_proto_by_name(config, name)
    if(!proto) {
        return null
    }

    if(proto.args.length != list.length) {
        return null
    }
    return {proto: name, list: list}
}

