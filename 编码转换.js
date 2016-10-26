var ascii = function(char) {
    /*
    char 是一个长度为 1 的 string
    这个函数返回这个字符的 ASCII 码

    这个答案用到了 s.charCodeAt(index) 函数, 例子如下
    'A'.charCodeAt(0) 返回 65
    'a'.charCodeAt(0) 返回 97

    字符在电脑中的存储是以数字的方式
    每个字符其实是用一个数字代表的, 这个方式叫做编码
    ASCII 码是一个通用的编码, 包含英文字符数字和常见符号

    这个作业答案我给了, 理解一下这件事就好, 不懂搜一下
    */
    return char.charCodeAt(0)
}


// 作业 2
//
var charFromAscii = function(code) {
    /*
    code 是一个 int
    返回 code 所表示的字符

    这个答案用到了 String.fromCharCode(code) 函数, 例子如下
    String.fromCharCode(97) 返回 'a'
    String.fromCharCode(65) 返回 'A'
    */
    return String.fromCharCode(code)
}


// 作业 3
//
var zerofill = function (str) {
    var char = '0'
    if (str.length < 8) {
        while(str.length < 8) {
            str = char + str
        }
    }
    return str
}
var binary = function(n) {
    /*
    n 是一个不大于 255 的 int
    返回 n 的 8 位二进制形式的字符串
    例如 binary(7) 返回 '00000111'

    进制转换自行搜索或者论坛提问大家讨论吧
    */
    var num = 0
    var result = 0
    for (var i = 0; i < 8; i++) {
        num = n % 2
        n = Math.floor( n / 2 )
        result = result + num * Math.pow(10,i)
    }
    var resultstr = String(result)
    var str = zerofill(resultstr)
    return str
    // return parseInt(n).toString(2)
}

// 作业 4
//
var int = function(bin) {
    /*
    bin 是一个 8 位二进制形式的字符串
    返回 bin 代表的数字
    例如 int('00000111') 返回 7

    进制转换自行搜索或者论坛提问大家讨论吧
    */

    var result = 0
    for (var i = 0; i < bin.length; i++) {
        var nums = bin.slice(i,i+1)
        num = Number(nums)
        result = result + num * Math.pow(2,(bin.length-1-i))
    }
    return result
    // return Number(bin).toString()
}


// 作业 5
//
var binaryStream = function(s) {
    /*
    s 是一个 string
    返回 s 的二进制字符串
    例如 binaryStream('Man') 返回
    '010011010110000101101110'

    使用上面的函数
    */
    var str = ''
    for (var i = 0; i < s.length; i++) {
        var n = s[i].charCodeAt(0)
        var stri = binary(n)
        str += stri
    }
    return str
}


// 作业 6
//
var stringFromBinary = function(bins) {
    /*
    bins 是一个二进制形式的字符串
    返回 bins 代表的原始字符串
    例如 stringFromBinary('010011010110000101101110') 返回 'Man'

    使用上面的函数
    */
    var str = ''
    for (var i = 0; i < bins.length/8; i++) {
        var stri = bins.slice(i*8,(i+1)*8)
        var n = int(stri)
        var sn =String.fromCharCode(n)
        // String.fromCharCode()
        str += sn
    }
    return str
}


// 作业 7
//
var base64Encode = function(s) {
    /*
    s 是一个 string
    返回 s 的 base64 编码

Base64是一种基于 64 个可打印字符来表示数据的方法
它用每6个比特为一个单元，对应某个可打印字符
ASCII 码一个字符是 8 比特, 也就是一字节
3 个字节就有 24 个比特, 对应了 4 个 base64 单元

如下所示
原始信息        M        a        n
ASCII         77       7        110
二进制         01001101 01100001 01101110
4 个单元       010011 010110 000101 101110
每个单元转换后  19  22  5  46

转换后每个 base64 单元都是一个 0-63 的数字
因为 6 比特表示的范围就是这么大
然后数字到字符串的转换是下面这段字符串取下标所得
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

那么 Base64 编码结果就是    T   W   F  u

所以 base64Encode('Man') 返回 'TWFu'


既然 3 个字节转换为 4 个 base64 单元
那么 1 个字节怎么办呢?
答案是用 0 补出 3 字节, 如下所示
原始信息    M
ASCII     77       0        0
二进制     01001101 00000000 00000000
4 个单元   010011 010000 000000 000000
单元转换后  19 16 0 0
因为末尾是强行补上的, 所以给他用 '=' 凑出字符(这是一个例外)
所以 base64Encode('M') 返回 'TQ=='
    */
    var ma64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    // log('ma',ma64.length)
    var bins = binaryStream(s)
    var char = '0'
    var str = ''
    // log(bins)
    while (bins.length%24 !== 0) {
        bins += char
    }

    for (var i = 0; i < bins.length/6; i++) {
        var binsi = bins.slice(i*6,(i+1)*6)
        var indexi = int(binsi)
        var si = ma64[indexi]
        if ( binsi == '000000') {
            si = '='
        }
        str += si
    }
    return str
}


// 作业 8
//
var find = function(s1, s2) {
    /*
    s1 s2 都是 string
    但 s2 的长度是 1

    返回 s2 在 s1 中的下标, 从 0 开始, 如果不存在则返回 -1
    */
    if (s1.includes(s2)) {
        for (var i = 0; i < s1.length; i++) {
            if (s2[0]===s1[i]) {

                result = i

                break
            }
        }
    }else {
        result = -1
    }
    return result
}

var base64Decode = function(s) {
    /*
    s 是一个 base64 编码后的字符串
    解码 s 并返回
    例如 base64Decode('TWFu') 返回 'Man'
    */
    var str = ''
    var ma64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    for (var i = 0; i < s.length; i++) {
        var index = find(ma64,s[i])
        if (index == -1) {
            var bini = '00000000'

        }else {
            var bin00i = binary(index)
            var bini = bin00i.slice(2)
        }
        str += bini
    }
    var strend = str.slice(str.length-9,str.length-1)

    while (strend === '00000000') {
            str = str.slice(0,str.length-10)

            strend = str.slice(str.length-9,str.length-1)

    }
    var string = stringFromBinary(str)
    return string
}
