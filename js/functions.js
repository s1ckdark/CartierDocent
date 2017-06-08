// Audio Player Functions
function calculateTotalValue(length) {
  var minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds = seconds_int.toFixed(),
    time = minutes + ':' + (seconds < 10 ? "0" + seconds : seconds)
    // console.log(seconds_str)

  return time;
}
function calculateCurrentValue(currentTime) {
  var current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}

function initProgressBar() {
  var player = document.getElementById('player');
  var length = player.duration
  var current_time = player.currentTime;

  // calculate total length of value
  var totalLength = calculateTotalValue(length)
  $(".end_time").html(totalLength);

  // calculate current value time
  var currentTime = calculateCurrentValue(current_time);
  $(".start_time").html(currentTime);

  var progressbar = document.getElementById('seekObj');
  // progressbar.value = (player.currentTime / player.duration)*100;
  $('.progress_bar').css('width',(player.currentTime / player.duration)*100+'%');

  progressbar.addEventListener("click", seek);

  if (player.currentTime == player.duration) {
    $('#playBtn').removeClass('pause');
  }
  function seek(evt) {
    var percent = evt.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    progressbar.value = percent / 100;
  }
};

function initPlayers(num) {
  for (var i = 0; i < num; i++) {
    (function() {
      // Variables
      // ----------------------------------------------------------
      // audio embed object
      var playerContainer = document.getElementById('playerContainer'),
        player = document.getElementById('player'),
        isPlaying = false,
        playBtn = document.getElementById('playBtn');

      // Controls Listeners
      // ----------------------------------------------------------
      if (playBtn != null) {
        playBtn.addEventListener('click', function() {
          togglePlay()
        });
      }
      // Controls & Sounds Methods
      // ----------------------------------------------------------
      function togglePlay() {
        if (player.paused === false) {
          player.pause();
          isPlaying = false;
          $('#playBtn').removeClass('pause');
          $('.play_state').addClass('paused').removeClass('playing');
        } else {
          player.play();
          $('#playBtn').addClass('pause');
          $('.play_state').addClass('playing').removeClass('paused');
          isPlaying = true;
        }
      }
    }());
  }
}

$(function() {
/* ######################################################################## */
   //공유 설정
    var snsMore = $("#snsMore");
    $(".sns-share-box .sns-more").on("click", function() {
        snsMore.toggleClass("open");
        return false;
    });

/* ######################################################################## */

    TweenMax.set('.hero img', {opacity:0, scale:.8});
    TweenMax.set('.hero .btn_front', {opacity:0});
    TweenMax.set('.artists_list', {opacity: 0, visibility: 'hidden', zIndex: -1});

    $(window).load(function(){
      if( $('#viewport').hasClass('front') ){
        new TimelineMax({delay:.6})
          .staggerTo('.hero img', .6, {opacity:1, scale:1, delay:.6}, .6)
          .to('.hero .btn_front', .6, {opacity:1});

      } else {
        return false;
      }

    });



    // Audio Player Initialize
    initPlayers($('#playerContainer').length);


     var artSwiper = new Swiper('#artistSlider', {
      loop: false,
      // Navigation arrows
      // nextButton: '.swiper-button-next',
      // prevButton: '.swiper-button-prev'
     });

     $('.swiper-button-next').on('click',function(e){
      e.preventDefault();
      artSwiper.swipeNext();
     });
     $('.swiper-button-prev').on('click',function(e){
      e.preventDefault();
      artSwiper.swipePrev();
     });

    TweenMax.set('.artwork_wrap', {zIndex:50, visibility:'visible', opacity:1, width:'360px',background:'white'});
    TweenMax.set('.artwork_wrap', {zIndex:50, visibility:'visible', opacity:1, width:'360px',background:'white'});
    TweenMax.set('.swiper-button-next', {right:'380px'});
    TweenMax.set('.swiper-slide .inner', {width:'calc(100% - 360px)'});
    TweenMax.set('.btn_desc_close', {zIndex:50, visibility:'visible', opacity:1});
  
    $('.btn_pop_close').on('click',function(e){
      e.preventDefault();
      var popWrap = $(this).parent()
      // TweenMax.to(popWrap, .6, {zIndex:-1, opacity:0});
      new TimelineMax()
        .to(popWrap, .6, {opacity:0})
        .to(popWrap, .1, {zIndex:-1, visibility:'hidden'});
    });
    
    $('.btn_desc_close').on('click',function(e){
      e.preventDefault();
      var descWrap = $(this).parent();
      var artslider = $('.artist_wrap');
      var btn_artists_desc = $('.btn_artists_desc');
      new TimelineMax()
      .to(descWrap, .6, {right:-360,opacity:0,zIndex:-1, visibility:'visible'}, .6)
      .to(artslider, .6, {width:'100%',opacity:1}, 0.6)
      .to(btn_artists_desc, .6, {zIndex:50, opacity:1,visibility:'visible'}, .6)
      .to('.swiper-button-next', .6, {right:'20px'}, 0.6)
      .to('.swiper-slide .inner', .6, {right:'0px', width:'100%'}, 0.6);
    });

    $('.btn_artists').on('click',function(e){
      e.preventDefault();
      new TimelineMax()
        .to('.artists_list', .1, {zIndex:50, visibility:'visible'})
        .to('.artists_list', .6, {opacity:1});
    });
    $('.btn_artists_desc').on('click',function(e){
      e.preventDefault();
      new TimelineMax()
      .to('.artwork_wrap', .6, {opacity:1, visibility:'visible', zIndex:50}, .6)
      .to('.btn_artists_desc', .6, {opacity:1, visibility:'hidden', zIndex:-1},.6)
      .to('.swiper-button-next', .6, {right:'380px'}, .6)
      .to('.swiper-slide .inner', .6, {right:'380px',width:'calc(100% - 360px)'}, .6)
      .to('.artwork_wrap', .6, {right:0}, .6);
    });

    // TweenMax.to('.img_wrap img', 8, {scale:1.2, rotation:5, yoyo:true, repeat:-1, ease: Power0.easeNone});
//       $('.artists_list_container > ul.row > li > a').bind('click hover',function(e){
//              e.preventDefault();
//     TweenMax.to('.artists_list_container > ul.row > li > a img', 0.5, {scale:1.2, rotation:7, ease: Power0.easeNone});
// });

    TweenMax.set('.data_item .box.over', {opacity:0});
    TweenMax.set('.data_item .box.over p', {opacity:0, y:'+=10'});
    $('.data_item').each(function(){
        var dataSelf = $(this);

        var dataHoverTween = new TimelineMax({paused:true})
            .to(dataSelf.find('.box.over'), .3, {opacity:1})
            .to(dataSelf.find('.box.over p'), .3, {opacity:1, y:'-=10'})

        dataSelf.hover(
            function(){
                dataHoverTween.restart();
            },
            function(){
                dataHoverTween.reverse();
            }
        )
    });
});
