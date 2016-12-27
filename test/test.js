
function test_head_field(buffer, index, t) {
    var data = buffer.readBytes(2);
    console.assert(data.remaining()==2, "Size Must Equal 2");
    console.assert(data.readUint16() == index, "Index Not Match");


    var data = buffer.readBytes(2);
    console.assert(data.remaining()==2, "Size Must Equal 2");
    console.assert(data.readUint16() == t, "Type Not Match");

}

function test_encode_u8() {
    var config = td_proto_config;
    var buffer = new ByteBuffer();

    encode_field(buffer, config, {pattern: TYPE_U8, number: 3})
    encode_field(buffer, config, {pattern: TYPE_U8, number: 3})

    buffer.mark(0)
    buffer.reset()
    test_head_field(buffer, 0, TYPE_U8)

    var data = buffer.readBytes(1);
    console.assert(data.remaining() == 1, "Size Must Equal 2");
    console.assert(data.readUint8() == 3, "Type Not Match");


    var field = decode_field(buffer, td_proto_config)
    console.assert(field.pattern == TYPE_U8, "Type Not Match");
    console.assert(field.number == 3, "Number Not Match");

    var a = document.createElement('a');
    document.body.appendChild(a);
    a.innerHTML = 'test_encode_u8 success<br/>'; 
}

function test_encode_u16() {
    var config = td_proto_config;
    var buffer = new ByteBuffer();

    encode_field(buffer, config, {pattern: TYPE_U16, number: 0x1234})
    encode_field(buffer, config, {pattern: TYPE_U16, number: 0x1234})

    buffer.mark(0)
    buffer.reset()
    test_head_field(buffer, 0, TYPE_U16)

    var data = buffer.readBytes(2);
    console.assert(data.remaining() == 2, "Size Must Equal 2");
    console.assert(data.readUint16() == 0x1234, "Type Not Match");


    var field = decode_field(buffer, td_proto_config)
    console.assert(field.pattern == TYPE_U16, "Type Not Match");
    console.assert(field.number == 0x1234, "Number Not Match");

    var a = document.createElement('a');
    document.body.appendChild(a);
    a.innerHTML = 'test_encode_u16 success<br/>'; 
}


function test_encode_u32() {
    var config = td_proto_config;
    var buffer = new ByteBuffer();

    encode_field(buffer, config, {pattern: TYPE_U32, number: 0x12345678})
    encode_field(buffer, config, {pattern: TYPE_U32, number: 0x12345678})

    buffer.mark(0)
    buffer.reset()
    test_head_field(buffer, 0, TYPE_U32)

    var data = buffer.readBytes(4);
    console.assert(data.remaining() == 4, "Size Must Equal 2");
    console.assert(data.readUint32() == 0x12345678, "Type Not Match");


    var field = decode_field(buffer, td_proto_config)
    console.assert(field.pattern == TYPE_U32, "Type Not Match");
    console.assert(field.number == 0x12345678, "Number Not Match");

    var a = document.createElement('a');
    document.body.appendChild(a);
    a.innerHTML = 'test_encode_u32 success<br/>'; 
}


function test_encode_float() {
    var config = td_proto_config;
    var buffer = new ByteBuffer();

    var number = 12345.123;

    encode_field(buffer, config, {pattern: TYPE_FLOAT, number: number})
    encode_field(buffer, config, {pattern: TYPE_FLOAT, number: number})

    buffer.mark(0)
    buffer.reset()
    test_head_field(buffer, 0, TYPE_FLOAT)

    var data = buffer.readBytes(4);
    console.assert(data.remaining() == 4, "Size Must Equal 2");
    console.assert(data.readUint32() == number * 1000, "Type Not Match");


    var field = decode_field(buffer, td_proto_config)
    console.assert(field.pattern == TYPE_FLOAT, "Type Not Match");
    console.assert(field.number == number, "Number Not Match");

    var a = document.createElement('a');
    document.body.appendChild(a);
    a.innerHTML = 'test_encode_float success<br/>'; 
}

function test_encode_str() {
    var config = td_proto_config;
    var buffer = new ByteBuffer();

    var str = "I'm a chinese people";

    encode_field(buffer, config, {pattern: TYPE_STR, str: str})
    encode_field(buffer, config, {pattern: TYPE_STR, str: str})

    buffer.mark(0)
    buffer.reset()
    test_head_field(buffer, 0, TYPE_STR)

    var length = buffer.readUint16();
    console.assert(str.length == length, "Size Must Equal length");
    var readStr = buffer.readUTF8String(length)
    console.assert(str == readStr, "UTF8 equal");
    


    var field = decode_field(buffer, td_proto_config)
    console.assert(field.pattern == TYPE_STR, "Type Not Match");
    console.assert(field.str == str, "UTF8 Not Match");

    var a = document.createElement('a');
    document.body.appendChild(a);
    a.innerHTML = 'test_encode_str success<br/>'; 
}

function test_encode_map() {
    td_reinit_proto({
        field : {
            name                  : { index :    1, pattern : "str" },
            index                 : { index :    2, pattern : "u16" },
            sub_name              : { index :    3, pattern : "str" }
        },
        proto: {
            cmd_achieve_op        : { index :    1, args : [ "map" ] }
        }
    });


    var config = td_proto_config;
    var buffer = new ByteBuffer();

    var value = {}
    value["name"] = "I'm a chinese people"
    value["sub_name"] = "tickdream"
    value["index"] = 1

    encode_field(buffer, config, td_from_value(value, TYPE_MAP));

    buffer.mark(0)
    buffer.reset()

    var read = td_into_value(decode_field(buffer, config))
    for(var k in value) {
        console.assert(value[k] == read[k], "Type Not Match");
    }

    value["undefine"] = 1
    var buffer = new ByteBuffer();
    encode_field(buffer, config, td_from_value(value, TYPE_MAP));

    buffer.mark(0)
    buffer.reset()
    
    var read = td_into_value(decode_field(buffer, config))
    console.assert(IsNull(read["undefine"]), "Type Not Match");

    var a = document.createElement('a');
    document.body.appendChild(a);
    a.innerHTML = 'test_encode_map success<br/>'; 
}

// #[test]
// fn test_encode_map() {
//     let config = td_rp::Config::new(" { \"name\" : { \"index\" :    1, \"pattern\" : \"string\" }, \
//                                         \"index\" : { \"index\" :    2, \"pattern\" : \"u16\" },  \
//                                         \"sub_name\" : { \"index\" :    3, \"pattern\" :\"string\" }   }",
//         "{\"cmd_test_op\"        : { \"msg_type\" :    \"server\", \"args\" : [ \"map\" ] }}");
//     let config = config.unwrap();
//     let mut hash_value = HashMap::<String, Value>::new();
//     hash_value.insert("name".to_string(), Value::Str("I'm a chinese people".to_string()));
//     hash_value.insert("sub_name".to_string(), Value::Str("tickdream".to_string()));
//     hash_value.insert("index".to_string(), Value::U16(1 as u16));
//     {
//         let mut buffer = Buffer::new();
//         td_rp::encode_field(&mut buffer, &config, &Value::Map(hash_value.clone())).unwrap();

//         // just read field
//         let read = td_rp::decode_field(&mut buffer, &config).unwrap();
//         match read {
//             Value::Map(val) => assert_eq!(val, hash_value),
//             _ => unreachable!("it will not read"),
//         }
//     }

//     let mut undefine = hash_value.clone();
//     undefine.insert("undefine".to_string(), Value::U16(1 as u16));
//     {
//         let mut buffer = Buffer::new();
//         td_rp::encode_field(&mut buffer, &config, &Value::Map(undefine.clone())).unwrap();

//         // just read field
//         let read = td_rp::decode_field(&mut buffer, &config).unwrap();
//         match read {
//             Value::Map(val) => assert_eq!(val, hash_value),
//             _ => unreachable!("it will not read"),
//         }
//     }
// }

// #[test]
// fn test_encode_array_u8() {
//     let config = Config::new_empty();
//     let mut array : Vec<Value> = vec![];
//     for i in 0 .. 10 {
//         array.push(Value::U8(i as u8));
//     }

//     let mut buffer = Buffer::new();
//     td_rp::encode_field(&mut buffer, &config, &Value::AU8(array.clone())).unwrap();

//     let read = td_rp::decode_field(&mut buffer, &config).unwrap();
//     match read {
//         Value::AU8(ref val) => {
//             assert_eq!(*val, array);
//         },
//         _ => unreachable!("it will not read"),
//     }
// }


// #[test]
// fn test_base_proto() {
//     let config = td_rp::Config::new(" { \"name\" : { \"index\" :    1, \"pattern\" : \"string\" }, \
//                                         \"index\" : { \"index\" :    2, \"pattern\" : \"u16\" },  \
//                                         \"sub_name\" : { \"index\" :    3, \"pattern\" :\"string\" }   }",
//         "{\"cmd_test_op\"        : { \"msg_type\" :    \"server\", \"args\" : [ \"map\" ] }}");
//     let config = config.unwrap();
//     let mut hash_value = HashMap::<String, Value>::new();
//     hash_value.insert("name".to_string(), Value::Str("I'm a chinese people".to_string()));
//     hash_value.insert("sub_name".to_string(), Value::Str("tickdream".to_string()));
//     hash_value.insert("index".to_string(), Value::U16(1 as u16));

//     {
//         let mut buffer = Buffer::new();
//         td_rp::encode_proto(&mut buffer, &config, &"cmd_test_op".to_string(), vec![Value::Map(hash_value.clone())]).unwrap();

//         // just read field
//         let read = td_rp::decode_proto(&mut buffer, &config).unwrap();
//         match read {
//             (name, val) => {
//                 assert_eq!(name, "cmd_test_op".to_string());
//                 assert_eq!(val[0], Value::Map(hash_value));
//                 assert_eq!(val.len(), 1);
//             }
//         }
//     }
// }

test_encode_u8()
test_encode_u16()
test_encode_u32()
test_encode_float()
test_encode_str()
test_encode_map()