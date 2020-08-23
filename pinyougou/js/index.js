window.addEventListener('load', function () {
    // 1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    // 2.鼠标经过就显示和隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 变量不用时，清除它
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);

    })

    // 3.动态生成小圆圈 有几张图片，就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = document.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li
        var li = document.createElement('li');
        // 记录当前小li的索引号，通过自定义属性来做
        li.setAttribute('index', i)
        // 把小li插入到ol里面
        ol.appendChild(li);
        // document.getElementByClassName(".circle").appendChild(li);
        // 4. 小圆圈的排他思想
        li.addEventListener('click', function () {
            // 把所有小li清除
            for (var i = 0; i < ol.children.length; i++)
                ol.children[i].className = '';
            // 当前的小li设置为curre 类名
            this.className = 'current';
            // 5.点击小圆圈，移动图片 移动的是ul
            // ul的距离就是小圆圈的索引号乘以图片的宽度 注意是负值
            // 当我们点击了某个小li，就获得当前小li的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li，就将当前小li索引号给num
            num = index;
            // 当我们点击了某个小li，就将当前小li索引号给circle
            circle = index;
            // var focusWidth = focus.offsetWidth;后面的按钮也需要用，就提出到外面
            console.log(focusWidth);
            console.log(index);
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';

    // 6.克隆第一张图片(li)，放到ul的最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 7.点击右侧按钮，图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            // 先关闭节流阀
            flag = false;
            // 如果走到了最后的复制的一张，ul的left要快速的复原为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                // 打开节流阀
                flag = true;
            });

            // 8.点击右侧按钮，小圆圈跟随一起变化
            // 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到了最后克隆的图片，此时需要复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 以下部份与下面面重复，可用函数封装
            // 先清除其他小圆圈的current类名，
            // for (var i = 0; i < ol.children.length; i++) {
            //     ol.children[i].className = '';
            // }
            // 留下当前小圆圈的current类名
            // ol.children[circle].className = 'current';
            circleChange();
        }
    });
    // 9.左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 如果走到了最后的复制的一张，ul的left要快速的复原为0
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1) * focusWidth + 'px';
                num = ul.children.length - 1;
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            // 如果circle < 4 说明走到了第一张图片，此时需要到第四张图片
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 以下部份与上面重复，可用函数封装
            // 先清除其他小圆圈的current类名，
            // for (var i = 0; i < ol.children.length; i++) {
            //     ol.children[i].className = '';
            // }
            // 留下当前小圆圈的current类名
            // ol.children[circle].className = 'current';
            circleChange();
        }
    });
    function circleChange() {
        // 先清除其他小圆圈的current类名，
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前小圆圈的current类名
        ol.children[circle].className = 'current';
    }

    // 10.自动播放
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);




})

