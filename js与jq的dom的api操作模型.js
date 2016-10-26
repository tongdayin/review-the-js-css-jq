//原生js
var appendHtml = function(element, html) {
    /*
    element 是一个标签
    html 是一段 html 字符串
    把 html 作为子元素插入到 element 的末尾
    上课一直在用这个函数
    */
    element.insertAdjacentHTML('beforeend', html)
}
var bindEvent = function(element, eventName, callback) {
    /*
    element 是一个标签
    eventName 是一个 string, 表示事件的名字
    callback 是一个函数
    用法如下, 假设 button 是一个标签
    bindEvent(button, 'click', function(){
    })
    */
    element.addEventListener(eventName, callback)
}
var bindEventDelegate = function(element, eventName, callback, responseClass) {
    /*
    element 是一个标签
    eventName 是一个 string, 表示事件的名字
    callback 是一个函数
    responseClass 是一个字符串

    在 element 上绑定一个事件委托
    只会响应拥有 responseClass 类的元素
    */
    element.addEventListener(eventName, function(event){
        var target = event.target
        if(target.classList.contains(responseClass)) {
            callback(event)
        }
    })
}
var append = function(selector, html) {
    /*
    selector 是一个 string, 选择器, 有如下三种取值
        1, 标签选择器, 如 'div'
        2, class 选择器, 如 '.red'
        3, id 选择器, 如 '#id-input-name'
    html 是一段 html 字符串
    把 html 作为子元素插入到 selector 选中的所有元素的末尾
    */
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.insertAdjacentHTML('beforeend', html)
    }
}
var bindAll = function(selector, eventName, callback, responseClass) {
    /*
    selector 是一个 string, 选择器, 有如下三种取值
        1, 标签选择器, 如 'div'
        2, class 选择器, 如 '.red'
        3, id 选择器, 如 '#id-input-name'
    eventName 是一个 string, 表示事件的名字
    callback 是一个函数
    responseClass 是一个字符串, 这个参数可以为空

    给 selector 选中的所有元素绑定 eventName 事件
    当 responseClass 给出的时候, callback 只会响应拥有 responseClass 类的元素
    当 responseClass 没有给的时候, callback 直接响应

    这题做不出来就放弃
    */
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.addEventListener(eventName, function(event){
            var target = event.target
            if(target.classList.contains(responseClass)) {
                callback(event)
            }
        })
    }
}
$('#id-button-add').on('click', function(event) {
    var todo = $('#id-input-add').val()
    $('#id-div-todo').append(todoTemplete(todo))
})

// jQuery 事件委托的方式
$('#id-div-todo').on('click', '.delete-button', function(event){
    console.log('click')

    var button = $(event.target)
    button.closest('.todo-cell').remove()
})

$('#id-div-todo').on('click', '.complete-button', function(event){
    console.log('click 完成')
    var button = $(event.target)
    var span = button.closest('.todo-cell').find('span')
    span.toggleClass('done')
})

$('#id-div-todo').on('click', '.edit-button', function(event){
    console.log('click edit')
    var button = $(event.target)
    var span = button.closest('.todo-cell').find('span')
    var t = span.text()
    console.log('span.text', t)
})
var cells = $('.todo-cell')
for (var i = 0; i < cells.length; i++) {
    var c = cells[i]
    console.log('cell', i, c)
}
// jQuery 提供遍历数组的 each 函数
// 对每个元素调用函数, 参数是 index 和 element
$('.todo-cell').each(function(i, e) {
    console.log(i, e)
})

// map 操作
// map 就是以前上课讲过的 process 函数
// 对每个数组中的元素调用函数得到返回值组成新的数组
var foo = ['你好','您好','拟吼']
var bar = $.map(foo, function(value){
    var ti =
    `
    <button type="button" name="button">${value}</button>
    `
    return $('body').append(ti)
})
bar

// grep 相当于 filter 函数, 以前上课写过的
var far = $.grep(foo, function(value){
    return value % 2 == 0
})

/*
data数据获取方式
dom API 如下
var domDiv = $('.todo-cell')[0]
domDiv.dataset.id
"401"

jQuery API 如下
var jqdiv = $($('.todo-cell')[0])
jqdiv.data('id')
*/
按照功能, jQuery 常见的用法划分如下
*/
// a. 选择器
// 1. $
// 2. find
// 3. siblings
// 4. closest, parent
// $('body')
// $('#id-button-add')
// $('.cell')
//
//
// b. dom 操作
// 1. append
// 2. remove
// 3. empty
// 4. show, hide, toggle
//
//
// c. class 操作
// 1. addClass removeClass
// 2. toggleClass
//
//
// d. 属性、特性操作
// 1. attr, prop, data
// 2. removeAttr
//
//
// e. 取值
// 1. val
// 2. text
// 3. html
//
//
// f. 事件
// 1. on
// 2. change
// 3. event.target
//
//
// g. 数组方法
// 1. each
// 2. map
// 3. grep
