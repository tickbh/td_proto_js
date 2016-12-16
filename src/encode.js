
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
        buffer.writeInt32(parseFloat(value.value) * 1000 )
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

            }
            //             for (name, sub_value) in val {
//                 if try!(write_field(buffer, config.get_field_by_name(name))) {
//                     try!(encode_field(buffer, config, sub_value));
//                 }
//             }
//             try!(write_str_field(buffer, STR_TYPE_NIL));
            encode_number(buffer, {pattern: TYPE_U16, number: value.str.length})
            buffer.writeString(value.str)
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
    encode_number(buffer, {pattern: TYPE_U16, number: get_type_by_name(field.pattern)})
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
            if(list[i].pattern != must_type) {
                return false
            }
            encode_field(buffer, config, list[i])
        };
        write_str_field(buffer, STR_TYPE_NIL)
    }
    default:
        return false;
    }
    return true
}

function encode_proto(buffer, config, name, infos) {
    var proto = config.get_proto_by_name(name)
    if(!proto) {
        return false
    }
    if(proto.args.length != infos.length) {
        return false
    }
    encode_str_raw(buffer, {pattern: TYPE_STR, str: name})
    for(var i = 0; i < infos.length; i++) {
        if(!encode_field(buffer, config, infos[i])) {
            return false
        }
    }
    write_str_field(buffer, STR_TYPE_NIL)
    return true
}
