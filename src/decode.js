
function decode_number(buffer, pattern) {
    switch(pattern) {
    case TYPE_U8: {
        if(td_check_unvaild(buffer, 1)) return null;
        return buffer.getUint8()
    }
    case TYPE_I8: {
        if(td_check_unvaild(buffer, 1)) return null;
        return buffer.getInt8()
    }
    case TYPE_U16: {
        if(td_check_unvaild(buffer, 2)) return null;
        return buffer.getUint16()
    }
    case TYPE_I16: {
        if(td_check_unvaild(buffer, 2)) return null;
        return buffer.getInt16()
    }
    case TYPE_U32: {
        if(td_check_unvaild(buffer, 4)) return null;
        return buffer.getUint32()
    }
    case TYPE_I32: {
        if(td_check_unvaild(buffer, 4)) return null;
        return buffer.getInt32()
    }
    case TYPE_FLOAT: {
        if(td_check_unvaild(buffer, 4)) return null;
        return buffer.getInt32() / 1000.0
    }
    default:
        throw new Error("Unknow decode number type")
    }
}
