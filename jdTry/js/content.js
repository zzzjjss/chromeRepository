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
	}else if(currentPath.endsWith(".html")){
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
	while(true){
		var key = localStorage.key(i);
		console.log("key--->:"+key);	
		if(key.endsWith(".html")){
			setTimeout(function(){
				localStorage.removeItem(key);
				window.location = key;
			},1000);
			break;
		}
		i++;
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
				var msg=$("div.ui-dialog-content").text();
				if(msg.search("请明天申请")>-1){
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