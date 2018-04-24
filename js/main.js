window.onload = function () {
	Jiaodiantu();
	waterfall_init();	
};

function Jiaodiantu() {
	var index = 0;
	var animated = 0;
	var Lists = $('#Jiaodian .menu-right a');
	var Angle_l = $('#Jiaodian .angle-l');
	var Angle_r = $('#Jiaodian .angle-r');
	var buttons = $('#Jiaodian .banner-dots span');
	var BannerTop = $('#Jiaodian .banner-top');
	Angle_r.click(function () {
		if (animated == 1) return;
		animated = 1;
		index = index >= 5 ? 0 : index + 1;
		var src = Lists.eq(index).find('img:first').attr('src');
		BannerTop.css({
			background: 'url(' + src + ')'
		});
		Lists.eq(index).fadeIn(500).siblings().fadeOut(500, function () {
			animated = 0;
			buttons.eq(index).addClass('active');
			buttons.eq(index).siblings().removeClass('active');
		});
	});
	Angle_l.click(function () {
		if (animated == 1) return;
		animated = 1;
		index = index <= 0 ? 5 : index - 1;
		var src = Lists.eq(index).find('img:first').attr('src');
		BannerTop.css({
			background: 'url(' + src + ')'
		});
		Lists.eq(index).fadeIn(500).siblings().fadeOut(500, function () {
			animated = 0;
			buttons.eq(index).addClass('active');
			buttons.eq(index).siblings().removeClass('active');
		});
	});
	$('#Jiaodian .banner-dots').delegate('span', 'click', function () {
		index = buttons.index($(this));
		var src = Lists.eq(index).find('img:first').attr('src');
		BannerTop.css({
			background: 'url(' + src + ')'
		});
		buttons.eq(index).addClass('active');
		buttons.eq(index).siblings().removeClass('active');
		Lists.eq(index).fadeIn(500).siblings().fadeOut(500, function () {
			animated = 0;
		});
	});
	var focusimg_timer = setInterval(function () {
		Angle_r.trigger('click');
	}, 3000);;
	$('#Jiaodian .menu-right').hover(function () {
		clearInterval(focusimg_timer);
	}, function () {
		focusimg_timer = setInterval(function () {
			Angle_r.trigger('click');
		}, 3000);
	})

}

function waterfall_init() {
	waterfall();
	window.onscroll = function () {
		if (isNeedLoad()) {
			/////////////
			waterfall();
		}
	}
	window.onclick = function () {
		if (isNeedLoad()) {
			/////////////
			waterfall();
		}
	}
}

function isNeedLoad() {
	var oBoxs = $('.waterfall-main .waterfall-box');
	return oBoxs[oBoxs.length - 1].offsetTop < document.body.scrollTop + document.body.clientHeight;
}

function waterfall() {
	var oParent = $('.waterfall-main');
	oParent.css('height','1360px');
	var boxHeights = [];
	var oBoxs = $('.waterfall-main .waterfall-box');
	var cols = Math.floor(oParent.width() / oBoxs[0].offsetWidth);
	var incw = Math.floor((oParent.width() - oBoxs[0].clientWidth * cols) / (cols -1));
	var BigboxW = oBoxs[0].clientWidth + incw;
	console.log(cols);

	for (var i = 0; i < oBoxs.length; i++) {
		if (i < cols) {
			boxHeights[i] = oBoxs[i].offsetHeight+18;
			oBoxs[i].style.left = i * BigboxW + 'px';
		} else {
			var minH = Math.min.apply(null, boxHeights); //数组中的最小值minH
			var index = $.inArray(minH, boxHeights);
			// 计算及定义图片出现的位置
			oBoxs.eq(i).css({
				left:oBoxs.eq(index).position().left,
				top:boxHeights[index]+'px'
			});
			// 改变数组值
			boxHeights[index] += oBoxs[i].offsetHeight+18;
			console.log('boxHeight:'+boxHeights+' index:'+index+' i:'+i+':'+oBoxs[i].offsetHeight);
		}
	}
}
