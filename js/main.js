var header = $('head');
var i = 5;
$(window).scroll(function () {
    header.children('#blur').remove();
    i = $(window).scrollTop() / 10;
    if (i > 15) {
        i = 15;
    }
    header.append('<style id="blur">.header:before{filter: blur(' + i.toString() + 'px)!important ;-webkit-filter: blur(' + i.toString() + 'px);-moz-filter: blur(' + i.toString() + 'px);-o-filter: blur(' + i.toString() + 'px);-ms-filter: blur(' + i.toString() + 'px);}</style>');
});
$(window).on('load', function () {
    for (var i = 0; i < $('.tmb-source').length; i++) {
        //console.log($('#blog').children().eq(i).children('div').attr('tmb'));
        $('.tmb-source').eq(i).css('background-image', 'url(' + $('.tmb-source').eq(i).attr('tmb') + ')');
    }
});
$(window).on('load resize', function () {
    $('.activity').css('height', $('.activity').width());
    $('.tmb-source').css('height', $('#blog').children().eq(0).width() * 3 / 4);
});
$(function () {
    var acts = {
        'act-awarded': 2,
        'act-tested': 3,
        'act-actcount': 1
    }
    $('.acts').one('inview', function (event, isInView, visiblePartX, visiblePartY) {
        var array_count = $('.activity').length;
        console.log(array_count);
        var i = 0;
        var timer = setInterval(function () {
            //「#add-contents」に配列の要素を出力
            $('.activity').eq(i).css('visibility', 'visible');
            if($('#about-lk-sm').is(':visible')){
                $('.activity').eq(i).css('width','100px');
                $('.activity').eq(i).css('height','100px');
            }
            $('.activity').eq(i).addClass('animated bounceIn');
            //カウントアップ
            i++;
            //カウント用変数「i」が配列の要素数「array_count」になればsetInterval関数をキャンセル
            if (i == array_count) {
                //clearInterval関数の繰り返しをキャンセル
                clearInterval(timer);
            }
        }, 300);
    });
    $('#header-lk').on('inview', function (event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
            $('#sticky-nav').slideUp(500);
        } else {
            $('#sticky-nav').slideDown(500);
        }
    });
})
$(function () {
    $('a[href^="#"]').click(function () {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
        return false;
    });
});

$(window).ready(function () {
    const video = document.getElementById('reiti_video');
    video.play();
    const play = video.play();
    if (play instanceof Promise) {
        play.catch(error => {
            video.muted = true;
            video.play();
        });
    }
    video.addEventListener('ended',(event)=>{
        console.log('OP終了');
        const header = document.getElementById('header-lk');
        $('#reiti_video').fadeOut(250,function(){
            setTimeout(function(){
                $('#blackout').fadeOut(250);
                $("#catch").fadeIn(250).css('display','inline-block');
            },250);
        });
    });
    $.ajax({
        url:'https://tek-news.com/wp-json/wp/v2/posts?_embed&per_page=2',
        type:'GET',
        success: function(data,status,xhr){
            //console.log(data);
            //var json = $.parseJSON(data);
            try{
                if(data[0]['_embedded']['wp:featuredmedia'] != undefined){
                    $('#most-latest').children('.tmb-source').attr("tmb",data[0]['_embedded']['wp:featuredmedia'][0].source_url);
                    $('#most-latest').children('.tmb-source').css("background-image",data[0]['_embedded']['wp:featuredmedia'][0].source_url);
                }
            }
            catch(e){
                console.log(e);
            }
            try{
                if(data[1]['_embedded']['wp:featuredmedia'] != undefined){
                    $('#second-latest').children('.tmb-source').attr("tmb",data[1]['_embedded']['wp:featuredmedia'][0].source_url);
                    $('#second-latest').children('.tmb-source').css("background-image",data[1]['_embedded']['wp:featuredmedia'][0].source_url);
                }
            }
            catch(e){
                console.log(e);
            }
            $('#most-latest').children(".blog-tmb-desc").children("h3.uk-margin-remove").children('.uk-link-heading').attr("href",data[0].link);
            $('#most-latest').children(".blog-tmb-desc").children("h3.uk-margin-remove").children('.uk-link-heading').text(data[0].title.rendered);
            var date = new Date(data[0].date_gmt);
            $('#most-latest').children(".blog-tmb-desc").children("p.uk-margin-remove").append(date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay());
            
    
            $('#second-latest').children(".blog-tmb-desc").children("h3.uk-margin-remove").children('.uk-link-heading').text(data[1].title.rendered);
            $('#second-latest').children(".blog-tmb-desc").children("h3.uk-margin-remove").children('.uk-link-heading').attr("href",data[1].link);
    
            date = new Date(data[1].date_gmt);
            $('#second-latest').children(".blog-tmb-desc").children("p.uk-margin-remove").append(date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay());
    
            //console.log("X-WP-Total");
            //console.log(xhr.getResponseHeader("x-wp-total"));
            $('#act-posts').text(xhr.getResponseHeader("x-wp-total"));
        }
    })
    .fail( (data) => {
        console.log(data);
    })
})