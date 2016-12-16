
function test_encode_u8() {

    // let config = Config::new_empty();
    // let mut buffer = Buffer::new();
    // let value = Value::U8(1 as u8);
    // td_rp::encode_field(&mut buffer, &config, &value).unwrap();
    // td_rp::encode_field(&mut buffer, &config, &value).unwrap();

    // // first read field
    // test_head_field(&mut buffer, 0, td_rp::TYPE_U8);
    // // after index type is data
    // let data: &mut [u8; 1] = &mut [0];
    // let size = buffer.read(data).unwrap();
    // assert_eq!(size, 1);
    // assert_eq!(data[0], 1);

    // // second read field
    // let read = td_rp::decode_field(&mut buffer, &config).unwrap();
    // match read {
    //     Value::U8(val) => assert_eq!(val, 1),
    //     _ => unreachable!("it will not read"),
    // }

    // let size = buffer.read(data).unwrap();
    // assert_eq!(size, 0);
    // 

    var a = document.createElement('a');
    document.body.appendChild(a);
    a.innerHTML = 'test_encode_u8 success'; 
}


test_encode_u8()
