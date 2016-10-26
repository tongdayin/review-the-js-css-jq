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
