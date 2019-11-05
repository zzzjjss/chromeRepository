$(document).ready(function () {
    setTimeout(function(){
        $( "a:contains('批量操作')")[0].click();
        console.log("click  batch operation!");
        setTimeout(function(){
            $( "em:contains('全选')")[0].click();
            console.log("click select all");
            setTimeout(function(){
                $( "em:contains('取消关注')")[0].click();
                console.log("click  cancel all");
                setTimeout(function(){
                    $( "a:contains('确定')")[0].click();
                    console.log("sure cancel");
                },3000);
            },3000);
        },3000);
    },3000);
});