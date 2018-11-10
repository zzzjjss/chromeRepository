$(document).ready(function () {
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
});
function  addTryItemToLocalStorage(){
	$("div .try-item").each(function () {
		var text=$(this).find("div.try-button.show").text();
		if(text=="已申请"){
			return;
		}
		var href = $(this).find("a").attr("href");
		localStorage.setItem(href, href);
		console.log("add  new item to localStorage:"+href);
	});
}
function openTryItem() {
	if(localStorage.length==0){
		return;
	}
	var key = localStorage.key(0);
	localStorage.removeItem(key);
	window.location = key;
}
function askTry() {
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
	}
}