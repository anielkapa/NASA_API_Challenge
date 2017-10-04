$(function() {
var sectionWelcome = $(".welcome div");
var url = "https://api.nasa.gov/planetary/apod?api_key=j6C6VfTMZepXqCDMrRRJSEFE8pSuuRmVRcbqqRYc";
var marsUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1446&page=2&api_key=j6C6VfTMZepXqCDMrRRJSEFE8pSuuRmVRcbqqRYc";
const error = "something went wrong!";
let img =$(".mars div img");
$.ajax({
  url: url,
  method: "GET"
}).done(function(response) {
  if(response.media_type == "video") {
    $("#apod_img_id").css("display", "none");
    $("#apod_vid_id").attr("src", response.url);
  }
  else {
    $("#apod_vid_id").css("display", "none");
    $("#apod_img_id").attr("src", response.url);
  }
}).fail(function(error) {
  console.log(error);
});

$.ajax({
  url: marsUrl,
  method: "GET"
}).done(function(response) {
  let photosObjects = response['photos'];
  for (var key in photosObjects) {
    let imgUrls = photosObjects[key]['img_src'];
    let idiS = photosObjects[key]['id'];
    img.eq(key).attr("id", idiS);
    img.eq(key).attr("src", imgUrls);
    let earthDate = photosObjects[key]['earth_date'];
    img.eq(key).attr("data-earth_date", earthDate);
  }
}).fail(function(error) {
  console.log(error);
});

$("button").on("click", function (addPictures){
  event.preventDefault();
  if ($(".mars div img").attr("class", "hide")) {
    $(".mars div img").attr("class", "show");
    $('.button').hide();
  }
});

  img.on("mouseover",function (showDate){
    let dataToPut = $(this).data("earth_date");
    $(this).parent().append( $( `<span>Earth Date: ${dataToPut}</span>` ) );
    $(this).css("opacity", '0.7');
    $(this).parent().find("span").css("position", 'absolute');
  });
  img.parent().on("mouseleave",function (showDate){
    $(this).find("span").remove("span");
    $(this).find("img").css("opacity", '1');
  });


});
