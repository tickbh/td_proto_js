
function encode_number(buffer, value) {
    var number = parseInt(value.number)
    if(!value.pattern || IsNull(number)) {
        throw new Error("unkown encode number")
    }
    switch(value.pattern) {
    case TYPE_U8: {
        buffer.writeUint8(number)
        break;
    }
    case TYPE_I8: {
        buffer.writeInt8(number)
        break;
    }
    case TYPE_U16: {
        buffer.writeUint16(number)
        break;
    }
    case TYPE_I16: {
        buffer.writeInt16(number)
        break;
    }
    case TYPE_U32: {
        buffer.writeUint32(number)
        break;
    }
    case TYPE_I32: {
        buffer.writeInt16(number)
        break;
    }
    case TYPE_FLOAT: {
        buffer.writeInt32(parseInt(parseFloat(value.number) * 1000))
        break;
    }
    default: {
        throw new Error("unkown encode number")
    }
    }
}

function encode_str_raw(buffer, value) {
    var pattern = value.pattern
    switch(pattern) {
        case TYPE_STR: {
            encode_number(buffer, {pattern: TYPE_U16, number: value.str.length})
            buffer.writeString(value.str)
            break;
        }
        case TYPE_RAW: {
            encode_number(buffer, {pattern: TYPE_U16, number: value.str.length})
            buffer.writeString(value.raw)
            break;
        }
        default: {
            throw new Error("unkown str")
        }

    }
}

function encode_map(buffer, config, value) {
    var pattern = value.pattern
    switch(pattern) {
        case TYPE_MAP: {
            var map = value.map
            for(var name in map) {
                var field = get_field_by_name(config, name)
                if(field) {
                    write_field(buffer, field)
                    encode_field(buffer, config, td_from_value(map[name], field.pattern))
                }
            }
            write_str_field(buffer, STR_TYPE_NIL)
            break;
        }
        default: {
            throw new Error("unkown str")
        }

    }
}

function write_field(buffer, field) {
    if(!field) {
        return false
    }

    encode_number(buffer, {pattern: TYPE_U16, number: field.index})
    encode_number(buffer, {pattern: TYPE_U16, number: field.pattern})
    return true
}

function write_str_field(buffer, pattern) {
    encode_number(buffer, {pattern: TYPE_U16, number: 0})
    encode_number(buffer, {pattern: TYPE_U16, number: get_type_by_name(pattern)})
    return true
}

function encode_field(buffer, config, value) {
    write_str_field(buffer, get_name_by_type(value.pattern))
    switch(value.pattern) {
    case TYPE_U8:
    case TYPE_I8:
    case TYPE_U16:
    case TYPE_I16:
    case TYPE_U32:
    case TYPE_I32:
    case TYPE_FLOAT: {
        encode_number(buffer, value)
    }
    break;
    case TYPE_STR:
    case TYPE_RAW: {
        encode_str_raw(buffer, value)
    }
    break;
    case TYPE_MAP: {
        encode_map(buffer, config, value)
    }
    break;
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
        var must_type = get_array_contains_type(value)
        var list = value.list
        for (var i = 0; i < list.length; i++) {
            encode_field(buffer, config, td_from_value(list[i], must_type) )
        };
        write_str_field(buffer, STR_TYPE_NIL)
    }
    default:
        return false;
    }
    return true
}

function encode_proto(buffer, config, name, infos) {
    var proto = get_proto_by_name(config, name)
    if(!proto) {
        return false
    }
    if(proto.args.length != infos.length) {
        return false
    }
    encode_str_raw(buffer, {pattern: TYPE_STR, str: name})
    for(var i = 0; i < infos.length; i++) {
        if(!encode_field(buffer, config, td_from_value(infos[i], get_type_by_name(proto.args[i])))) {
            return false
        }
    }
    write_str_field(buffer, STR_TYPE_NIL)
    return true
}
