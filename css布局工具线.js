var ckXian = function () {
    var button = `<button class="xm" type="button" name="button">参考线</button>`
    $('body').prepend(button)
    var style =
    `<style id="xm" media="screen">
        div{border: 1px red dashed;}
    </style>
    `
    var i = false
    $(".xm").on('click',function () {
        if (i) {
            $("#xm").remove()
            i = false
        }else {
            $("body").prepend(style)
            i = true
        }
    })

}
ckXian ()
var ckXian = function () {
    var body = document.querySelector('body')
    var style =
    `<style id="xm" media="screen">
        div{outline: 1px red dashed;}
    </style>
    `

    var i = false
    body.addEventListener('keydown', function(event){
        if (event.keyCode === 77 && event.ctrlKey) {
            if (i) {
                var styletog = document.querySelector('#xm')
                styletog.remove()
                i= false
            }else {
                body.insertAdjacentHTML('afterbegin', style);
                i = true
            }
        }
    })
}
ckXian ()
