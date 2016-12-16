var td_proto_config = td_proto_config || {}

function get_field_index_name(config, index) {
    return (config.index_field || {})[index];
}

function get_field_by_name(config, name) {
    return (config.field || {})[name];
}

function get_field_by_index(config, index) {
    var name = get_field_index_name(config, index)
    if(!name) {
        return null
    }
    return get_field_by_name(config, name)
}


function get_proto_by_name(config, name) {
    return (config.proto || {})[name];
}

function get_proto_msg_type(config, name) {
    return (config.msg_proto || {})[name]
}

function td_reinit_proto(config) {
    config.field = config.field || {}
    config.proto = config.proto || {}
    config.index_field = {}
    config.msg_proto = {}
    for(var k in config.field) {
        var value = config.field[k]
        value.pattern = get_type_by_name(value.pattern)
        config.index_field[value.index] = value
    }

    for(var k in config.proto) {
        var value = config.proto[k]
        value.pattern = get_type_by_name(value.pattern)
        config.msg_proto[k] = value.msg_type
    }

    td_proto_config = config
}
