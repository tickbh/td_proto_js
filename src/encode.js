
function encode_number(buffer, value) {
    var number = parseInt(value.value)
    if(!value.pattern || !number) {
        throw new Error("unkown encode number")
    }
    switch(value.pattern) {
    case TYPE_U8: {
        buffer.writeUint8(number)
    }
    case TYPE_I8: {
        buffer.writeInt8(number)
    }
    case TYPE_U16: {
        buffer.writeUint16(number)
    }
    case TYPE_I16: {
        buffer.writeInt16(number)
    }
    case TYPE_U32: {
        buffer.writeUint32(number)
    }
    case TYPE_I32: {
        buffer.writeInt16(number)
    }
    case TYPE_FLOAT: {
        buffer.writeInt32(parseFloat(value.value) * 1000 )
    }
    default: {
        throw new Error("unkown encode number")
    }
    }
}
