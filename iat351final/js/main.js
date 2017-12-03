$(document).ready(function(){
	$(".bookmark span").click(function() {
		reloadVideo($(this).data("url"));
	});

	$("#saveBookmark").click(function() {
		makeNewBookmark($("[name=label]").val(), $("[name=s_minutes]").val(), $("[name=s_seconds]").val(), $("[name=e_minutes]").val(), $("[name=e_seconds]").val());
	});

	var $dragging = null;
	$(document.body).on("mousemove", function(e) {
	    if ($dragging) {
	        $dragging.offset({
	            top: e.pageY - 25,
	            left: e.pageX - 25
	        });
	    }
	});
	$(document.body).on("mousedown", ".playerIcon", function (e) {
	    $dragging = $(e.target);
	});
	$(document.body).on("mouseup", function (e) {
	    $dragging = null;
	});

	$(".player2").dblclick(function(){
		$("#player2info").modal("show");
	});
	$(".player3").dblclick(function(){
		$("#player3info").modal("show");
	});
	$(".player4").dblclick(function(){
		$("#player4info").modal("show");
	});
	$(".player5").dblclick(function(){
		$("#player5info").modal("show");
	});
	$(".player6").dblclick(function(){
		$("#player6info").modal("show");
	});
	$(".player8").dblclick(function(){
		$("#player8info").modal("show");
	});
});

function reloadVideo(url) {
	$("#filmwindow iframe").attr("src", url);
	console.log(url);
}

function makeNewBookmark(label, s_m, s_s, e_m, e_s) {
	name = "New Bookmark";
	if (label.trim()) name = label;

	startSeconds = 0;
	if (s_m) startSeconds += parseInt(s_m) * 60;
	if (s_s) startSeconds += parseInt(s_s);
	if (isNaN(startSeconds)) startSeconds = 0;
	console.log(startSeconds);

	endSeconds = 0;
	if (e_m) endSeconds += parseInt(e_m) * 60;
	if (e_s) endSeconds += parseInt(e_s);
	if (isNaN(endSeconds)) endSeconds = 0;
	console.log(endSeconds);

	url = getPathFromUrl($("#filmwindow iframe").attr("src"));
	url = url + "?start=" + startSeconds + "&end=" + endSeconds + "&autoplay=1";
	console.log(url);

	$("#bookmarkList").append('<div class="bookmark col-sm-4"><span data-url="'+ url + '">' + name + '</span></div>');
	$(".bookmark span").unbind( "click" );
	$(".bookmark span").click(function() {
		reloadVideo($(this).data("url"));
	});

	$("[name=label]").val("");
	$("[name=s_minutes]").val("");
	$("[name=s_seconds]").val("");
	$("[name=e_minutes]").val("");
	$("[name=e_seconds]").val("");
}

function getPathFromUrl(url) {
	return url.split("?")[0];
}
