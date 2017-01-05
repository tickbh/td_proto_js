
var TYPE_STEP = 20;

var TYPE_NIL = 0;
var TYPE_U8 = 1;
var TYPE_I8 = 2;
var TYPE_U16 = 3;
var TYPE_I16 = 4;
var TYPE_U32 = 5;
var TYPE_I32 = 6;
var TYPE_FLOAT = 7;
var TYPE_STR = 8;
var TYPE_RAW = 9;
var TYPE_MAP = 10;
var TYPE_AU8 = 21;
var TYPE_AI8 = 22;
var TYPE_AU16 = 23;
var TYPE_AI16 = 24;
var TYPE_AU32 = 25;
var TYPE_AI32 = 26;
var TYPE_AFLOAT = 27;
var TYPE_ASTR = 28;
var TYPE_ARAW = 29;
var TYPE_AMAP = 30;

var STR_TYPE_NIL = "nil";
var STR_TYPE_U8 = "u8";
var STR_TYPE_I8 = "i8";
var STR_TYPE_U16 = "u16";
var STR_TYPE_I16 = "i16";
var STR_TYPE_U32 = "u32";
var STR_TYPE_I32 = "i32";
var STR_TYPE_FLOAT = "float";
var STR_TYPE_STR = "str";
var STR_TYPE_RAW = "raw";
var STR_TYPE_MAP = "map";
var STR_TYPE_AU8 = "u8[]";
var STR_TYPE_AI8 = "i8[]";
var STR_TYPE_AU16 = "u16[]";
var STR_TYPE_AI16 = "i16[]";
var STR_TYPE_AU32 = "u32[]";
var STR_TYPE_AI32 = "i32[]";
var STR_TYPE_AFLOAT = "float[]";
var STR_TYPE_ASTR = "str[]";
var STR_TYPE_ARAW = "raw[]";
var STR_TYPE_AMAP = "map[]";

function get_type_by_name(name) {
    switch(name) {
        case STR_TYPE_NIL: return TYPE_NIL;
        case STR_TYPE_U8: return TYPE_U8;
        case STR_TYPE_I8: return TYPE_I8;
        case STR_TYPE_U16: return TYPE_U16;
        case STR_TYPE_I16: return TYPE_I16;
        case STR_TYPE_U32: return TYPE_U32;
        case STR_TYPE_I32: return TYPE_I32;
        case STR_TYPE_FLOAT: return TYPE_FLOAT;
        case STR_TYPE_STR: return TYPE_STR;
        case STR_TYPE_RAW: return TYPE_RAW;
        case STR_TYPE_MAP: return TYPE_MAP;
        case STR_TYPE_AU8: return TYPE_AU8;
        case STR_TYPE_AI8: return TYPE_AI8;
        case STR_TYPE_AU16: return TYPE_AU16;
        case STR_TYPE_AI16: return TYPE_AI16;
        case STR_TYPE_AU32: return TYPE_AU32;
        case STR_TYPE_AI32: return TYPE_AI32;
        case STR_TYPE_AFLOAT: return TYPE_AFLOAT;
        case STR_TYPE_ASTR: return TYPE_ASTR;
        case STR_TYPE_ARAW: return TYPE_ARAW;
        case STR_TYPE_AMAP: return TYPE_AMAP;
        default: return TYPE_NIL;
    }
}

function get_name_by_type(index) {
    switch(index) {
        case TYPE_NIL: return STR_TYPE_NIL;
        case TYPE_U8: return STR_TYPE_U8;
        case TYPE_I8: return STR_TYPE_I8;
        case TYPE_U16: return STR_TYPE_U16;
        case TYPE_I16: return STR_TYPE_I16;
        case TYPE_U32: return STR_TYPE_U32;
        case TYPE_I32: return STR_TYPE_I32;
        case TYPE_FLOAT: return STR_TYPE_FLOAT;
        case TYPE_STR: return STR_TYPE_STR;
        case TYPE_RAW: return STR_TYPE_RAW;
        case TYPE_MAP: return STR_TYPE_MAP;
        case TYPE_AU8: return STR_TYPE_AU8;
        case TYPE_AI8: return STR_TYPE_AI8;
        case TYPE_AU16: return STR_TYPE_AU16;
        case TYPE_AI16: return STR_TYPE_AI16;
        case TYPE_AU32: return STR_TYPE_AU32;
        case TYPE_AI32: return STR_TYPE_AI32;
        case TYPE_AFLOAT: return STR_TYPE_AFLOAT;
        case TYPE_ASTR: return STR_TYPE_ASTR;
        case TYPE_ARAW: return STR_TYPE_ARAW;
        case TYPE_AMAP: return STR_TYPE_AMAP;
        default: return STR_TYPE_NIL;
    }
}

function get_array_contains_type(value) {
    return value.pattern - TYPE_STEP
}
