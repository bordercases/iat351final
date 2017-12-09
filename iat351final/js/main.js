$(document).ready(function(){
	$(".bookmark .play").click(function() {
		reloadVideo($(this).data("url"));
	});

	$(".bookmark .note").click(function(){
		loadModal($(this).data("txt"));
		$("#myModal").modal("show");
	});

	$("#saveBookmark").click(function() {
		makeNewBookmark($("[name=label]").val(), $("[name=s_minutes]").val(), $("[name=s_seconds]").val(), $("[name=e_minutes]").val(), $("[name=e_seconds]").val(), $("#bmNotes").val());
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


});

function reloadVideo(url) {
	$("#filmwindow iframe").attr("src", url);
	console.log(url);
}

function loadModal(txt) {
	$("#myModal .modal-body").text(txt);
	console.log(txt);
}

function makeNewBookmark(label, s_m, s_s, e_m, e_s, txt) {
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

	$("#bookmarkList").append('<div class="row bookmark"><div class="col-md-8">' + name + '</div><div class="col-md-2"><span data-url="'+ url + '" class="play glyphicon glyphicon-play-circle"></span></div><div class="col-md-2"><span data-txt="' + txt + '" class="note glyphicon glyphicon-list-alt"></span></div></div>');

	$(".bookmark .play").unbind( "click" );
	$(".bookmark .note").unbind( "click" );

	$(".bookmark .play").click(function() {
		reloadVideo($(this).data("url"));
	});

	$(".bookmark .note").click(function(){
		loadModal($(this).data("txt"));
		$("#myModal").modal("show");
	});

	$("[name=label]").val("");
	$("[name=s_minutes]").val("");
	$("[name=s_seconds]").val("");
	$("[name=e_minutes]").val("");
	$("[name=e_seconds]").val("");
	$("#bmNotes").val("");
}

function getPathFromUrl(url) {
	return url.split("?")[0];
}
