$(document).ready(function () {
	var currentPath=window.location.pathname;
	if(currentPath=="/activity/getActivityList"){
		addTryItemToLocalStorage();
		if(localStorage.length>500){
			openTryItem();
			return;
		}
		var nextPage = $("#pager").find("a.ui-pager-next").length;
		if (nextPage == 1) {
			$("#pager").find("a.ui-pager-next")[0].click();
		}else{
			openTryItem();
		}	
	}else if(currentPath!=null&&currentPath.endsWith(".html")){
		askTry();
	}else{
		openTryItem();
	}

/**
	if ($("a.app-btn.btn-application").length == 1) {
		askTry();
		return;
	}
	setTimeout(() => {
		addTryItemToLocalStorage();
		if(localStorage.length>500){
			openTryItem();
			return;
		}
		var nextPage = $("#pager").find("a.ui-pager-next").length;
		if (nextPage == 1) {
			$("#pager").find("a.ui-pager-next")[0].click();
		} else {
			openTryItem();
		}
	}, 1000);
 */
});
function  addTryItemToLocalStorage(){
	$("div .try-item").each(function () {
		var text=$(this).find("div.try-button.show").text();
		if(text=="已申请"){
			return;
		}
		var href = $(this).find("a").attr("href");
		if(href.endsWith(".html")){
			localStorage.setItem(href, href);
			console.log("add  new item to localStorage:"+href);
		}
	});
}
function openTryItem() {
	if(localStorage.length==0){
		return;
	}
	var i=0;
	var foundItem=false;
	while(true){
		var key = localStorage.key(i);
		console.log("key--->:"+key);	
		if(key!=null&&key.endsWith(".html")){
			foundItem=true;
			setTimeout(function(){
				localStorage.removeItem(key);
				window.location = key;
			},1000);
			break;
		}else if(i>localStorage.length){
			break;
		}
		i++;
	}

	if(!foundItem){
		window.location="https://try.jd.com/activity/getActivityList";
	}
}
function askTry() {
	console.log("start to ask try");
	var stateText=$("div.freeTry").find("div.state").text();
	if(stateText.search("您已提交申请")>-1){
		openTryItem();
		return;
	}
	var tryBtn = $("a.app-btn.btn-application");
	if (tryBtn.length == 1) {
		tryBtn[0].click();
		setTimeout(function () {
			var sureBtn = $("div.ui-dialog").find("a.y");
			if (sureBtn.length == 1) {
				sureBtn[0].click();
			}
			setTimeout(function(){
				var cleanFocus=$("div.f-gray").text();
				if(cleanFocus.search("数超过上限")>-1){
					window.open("https://t.jd.com/follow/vender");
					setTimeout(function(){
						window.location.reload();
					},120*1000);
					return;
				}
				var msg=$("div.ui-dialog-content").text();
				if(msg.search("请明天申请")>-1){
					var timer=setInterval(function(){
						window.location.reload();
						console.log("refresh the page");
					},30*60*1000);
					setTimeout(function(){
						clearInterval(timer);
						openTryItem();
					},24*60*60*1000);
					return;
				}
				openTryItem();
			},3000);
		}, 3000);
	}else{
		setTimeout(function(){
			openTryItem();
		},3000);
	}
}