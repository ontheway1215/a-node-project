var p = 1;
var q = "";
var str = "";
var getData = "";
var host = document.location.origin;
$(function() {
  // goPAGE();
  $("body").keydown(function (e) {
    var curkey = e.which;
    if (curkey == "13") {
      if ($("#search_input_value").val() == "") return;
      $('#submit').click();
    }
  });
  //搜索表情
  $("#submit").click(function () {
    p = 1;
    q = decodeURIComponent($("#search_input_value").val());
    if ($("#search_input_value").val() == "") return;
    bqss_search(p, q);
    document.location.pathname = '/search/' + q;
    $("#search_input_value").val(q);
  });
  var q = document.location.pathname.split('/')[2] ? document.location.pathname.split('/')[2] : '';
//滑动加载更多

	$(window).scroll(function () {
		if ($(window).scrollTop() >= 300) {
			$(".toTop").show();
		} else {
			$(".toTop").hide();
		}
		if ($(document).height() == $(window).height() + $(window).scrollTop()) {
			p++;
			if ($(".search-content a").length > 0) {
				if (p > 5) {
					$(".search_result").addClass("search_noresult");
					$(".text_loading").text("没有更多表情了");
					return;
				} else {
					bqss_search(p, q);
				}
			} else {
				return;
			}
		}
	});
})
//表情专辑
$(".album-content .img-box").click(function () {
	var text = $(this);
	q = decodeURIComponent(text);
	p = 1;
});
$(document).on("click", ".album-content .img-box", function () {
	var text = $(this).find(".cover-text").text();
	q = decodeURIComponent(text);
	p = 1;
	// bqss_search(p, q);
	$("#search_input_value").val(q);
	document.location.href = document.location.origin + '/search/' + q;
});

//ajax请求
var callAjax = function (url, callback) {
	var urlStr = host + url;
    $.ajax({
			type:"GET",
			url:urlStr,
			headers: {
        Accept: "application/json; charset=utf-8"
      },
			async:true,
			success:function(res){
				callback(res)
			},
			error: function(res) {
				console.log('error')
			},
			dataType: "json"
    })
}

//search函数
var bqss_get_search = function (p, q, callback) {
	var params = {};
	var url = "/search/" + q + '?page=' + p;
	callAjax(url, callback)
};

// //首页trending
// var bqss_get_trending = function (callback) {
//   var url = "/trending";
//   callAjax(url, callback)
// };
// //首页热词
// var bqss_get_hot = function (callback) {
//   var url = "/hot";
//   callAjax(url, callback);
// };
//
// //trending
// bqss_get_trending(function (res) {
//   $.each(res.emojis, function(index, element) {
//     var imgSize = "";
//     if(element.height >= element.width) {
//       imgSize = "portrait";
//     } else {
//       imgSize = "thumbnail";
//     };
//     var content = "<a href='" +element.main+ "' download=''><div class='img-box'><img class='"+imgSize+"' src='"  + element.main+ "'><div class='download-cover'></div></div></a>";
//     $(".pop-content").append(content);
//   })
//
// });
// //hot
// bqss_get_hot(function (res) {
//   $.each(res.data_list, function(index, element) {
//     var imgSize = "";
//     if(element.height >= element.width) {
//       imgSize = "portrait";
//     } else {
//       imgSize = "thumbnail";
//     };
//     var content = "<div class='img-box'><div class='cover-text'>"+element.text+"</div><img class='"+imgSize+"' src='"  + element.cover+ "'></div>";
//     $(".album-content").append(content);
//   })
// });

//搜索关键词
var bqss_search = function (p, q) {
	bqss_get_search(p, q, function (res) {
		getData = res.emojis;
    $.each(res.emojis, function (index, element) {
      var imgSize = "";
      if(element.height >= element.width) {
        imgSize = "portrait"
      } else {
        imgSize = "thumbnail"
      }
      var content = "<a href='"+ element.main +"' download=''><div class='img-box'><img class='"+imgSize+"' src='"  + element.main+ "'><div class='download-cover'></div></div></a>";
      $(".search-content").append(content);
    });
    if(res.emojis.length ==0 || res.emojis.length<20) {
      $(".search_loading").removeClass("search_loading").addClass("search_noresult");
      $(".text_loading").text("没有更多了");
    }else {
      $(".text_loading").text("正在拼命加载");
      $(".search_result").removeClass("search_noresult").addClass("search_loading");
    };
		return getData;
	})
};

//回到顶部
$(".toTop").click(function () {
  $("body").scrollTo({toT: 0});
});

//scrollTop函数
$.fn.scrollTo =function(options){
	var defaults = {
		toT : 0,    //滚动目标位置
		durTime : 500,  //过渡动画时间
		delay : 30,     //定时器时间
		callback:null   //回调函数
	};
	var opts = $.extend(defaults,options),
		timer = null,
		_this = this,
		curTop = _this.scrollTop(),//滚动条当前的位置
		subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
		index = 0,
		dur = Math.round(opts.durTime / opts.delay),
		smoothScroll = function(t){
			index++;
			var per = Math.round(subTop/dur);
			if(index >= dur){
				_this.scrollTop(t);
				window.clearInterval(timer);
				if(opts.callback && typeof opts.callback == 'function'){
					opts.callback();
				};
				return;
			}else{
				_this.scrollTop(curTop + index*per);
			};
		};
	timer = window.setInterval(function(){
		smoothScroll(opts.toT);
	}, opts.delay);
	return _this;
};

$(".connect_style .weixin").hover(function () {
	$(".bg_bqmm").show()
}, function () {
	$(".bg_bqmm").hide()
})


// window.onload = function () {
// 	//banner轮播
// 	var oPlay = document.getElementById("play");
// 	var oNext=oPlay.children[1] || 1;
// 	var oPrev=oPlay.children[0];
// 	var aHead=oPlay.children[3].children;
// 	var oUl=oPlay.children[2].children[0];
// 	var oLiW=oUl.children[0].offsetWidth;
// 	var Length = oUl.children.length;
// 	var timer = null;
// 	var ready=true;//准备好了
//
// 	oUl.innerHTML+=oUl.innerHTML;
//
// 	oUl.style.width=oUl.children.length*oLiW+'px';
//
// 	var now=0;
//
//
// 	for(var i=0;i<aHead.length;i++){
// 	    (function(index){
// 	        aHead[i].onclick=function(){
// 	            now=index;
// 	            tab();
// 	        };
// 	    })(i);
// 	};
//
// 	function tab() {
// 		for(var i = 0; i< aHead.length; i++) {
// 			aHead[i].className = "";
// 		};
// 		if(now == Length) {
// 			 // aHead[0].className = "active"
// 		} else {
// 			 // aHead[now].className='active';
// 		};
//
// 		$(".banner-content ul").animate({left:-now*oLiW}, 1000, function(){
//
//             ready=true;
//             if(now==Length){
//                 oUl.style.left=0;
//                 now=0;
//             }
//         });
// 	};
//
// 	oNext.onclick=function(){
//         if(!ready) return;
//         ready=false;
//         now++;
//         tab();
//     };
//     oPrev.onclick=function(){
//         if(!ready) return;
//         ready=false;
//         now--;
//         if(now==-1){
//             now=Length-1;
//             oUl.style.left=-oUl.offsetWidth/2+'px';
//         };
//         tab();
//     };
//
// 	function auto() {
// 		timer = setInterval(function () {
// 			oNext.onclick();
// 		},4000)
// 	};
// 	auto();
//
// 	oPlay.onmouseover = function () {
// 		clearInterval(timer);
// 	};
// 	oPlay.onmouseout = function () {
// 		auto();
// 	}
// }




