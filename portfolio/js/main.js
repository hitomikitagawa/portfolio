//ハンバーガーメニュー(下層共通)
$(function () {

    $('.gnav_btn').click(function () {
        $(this).toggleClass('open');
        $('.gnav').toggleClass('open');
    })

    $('.gnav ul a').click(function () {

        $('.gnav_btn').removeClass('open');
        $('.gnav').removeClass('open');
    })
})



// トップへ戻るボタン (下層共通)
var now_scroll;
$(window).on('scroll', function () {
    var scroll_height = $(this).scrollTop();

    if (scroll_height > 500 && scroll_height > now_scroll) {
        $('.to_top').addClass('on');
    } else {
        $('.to_top').removeClass('on');
    }

    now_scroll = scroll_height;
})

// 見出し(下層)
const subTitles = document.querySelectorAll('.sub_title');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.3
});

// 1つ目の見出しはすぐ表示（ファーストビュー対策）
if (subTitles.length > 0) {
  subTitles[0].classList.add('is-visible');
}

// 2つ目以降はスクロールで発火
subTitles.forEach((title, index) => {
  if (index > 0) observer.observe(title);
});



//loadingアニメーション（トップのみ）
var bar = new ProgressBar.Line(splash_text, {
	easing: 'easeInOut',
	duration: 1200,
	strokeWidth: 0.1,
	color: '#404648',
	trailWidth: 0.1,
	trailColor: '#bbb',
	text: {				
		style: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			padding: '0',
			margin: '-30px 0 0 0',
			transform:'translate(-50%,-50%)',
			'font-size':'2rem',
			color: '#fff',
		},
		autoStyleContainer: false 
	},
	step: function (state, bar) {
		bar.setText(Math.round(bar.value() * 100) + ' %'); 
	}
});

bar.animate(1.0, function () {
    $("#splash").fadeOut(800, function() {
        $(this).remove(); 
        setTimeout(function() {
            textTypingAnime(); 
        }, 500);
    });
});


// MVタイトルのアニメーション（トップのみ）
function textTypingAnime() {
	$('.textTyping').each(function () {
		var thisChild = $(this).children();
		thisChild.each(function (i) {
			var time = 150;
			$(this).delay(time * i).fadeIn(time);
		});
	});
}

$(window).on('load', function () {
	var element = $(".textTyping");
	element.each(function () {
		var text = $(this).html();
		var textbox = "";
		text.split('').forEach(function (t) {
			if (t !== " ") {
				textbox += '<span>' + t + '</span>';
			} else {
				textbox += t;
			}
		});
		$(this).html(textbox);
	});
});



//スリックスライダー（トップのみ）
$(document).ready(function(){
  $('.slick-slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: false,
		prevArrow: '<button type="button" class="custom-prev"><img src="img/arrow_left.png" alt="前へ"></button>',
    nextArrow: '<button type="button" class="custom-next"><img src="img/arrow_right.png" alt="次へ"></button>',
    responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
				slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
		],
  });
});
$(window).on("resize orientationchange", function () {
  $(".slick-slider").slick("resize");
});

// AOS初期化を slick 完了後に実行することで競合回避
  $('.slick-slider').on('setPosition', function () {
    AOS.refresh();
  });

// AOS 初期化
AOS.init({
	once: true,
	offset: 100,
	duration: 800
});



