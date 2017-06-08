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
    $(".forehead .btn-sns-more").on("click",function() {
        snsMore.toggleClass('open');
        return false;
    });
    $("#snsMore .close-modal").on("click",function() {
        snsMore.removeClass('open');
        popupWechat.removeClass("open");
        return false;
    });
    
    var shareUrl = $("meta[property='og:url']").attr("content");
    var popupWechat = $("#popup_wechat");
    $("#snsMore .sns-wc").on("click", function() {
        popupWechat.addClass("open");
        var getWidth =  $("#qrcode").width();
        $("#qrcode").empty().qrcode({width:getWidth,height:getWidth,text:shareUrl});
        return false;
    });
/* ######################################################################## */

    // Front Page
    var frontSwiper = new Swiper ('#frontSwiper', {
      direction: 'horizontal',
      loop: false,
      onTransitionEnd: function(swiper){
        if ( frontSwiper.activeIndex == 1) {
          setTimeout(function(){ 
            location.replace("/innovation/CartierDocent/mobile/artist_01.html");
          }, 2500);
        }
      }
    });


    TweenMax.set('.hero img', {opacity:0, scale:.8});
    TweenMax.set('.hero .icon_next', {opacity:0});

    $(window).load(function(){
      if( $('#viewport').hasClass('front') ){
        new TimelineMax({onComplete:swipernext, delay:1.2})
          .staggerTo('.hero img', .6, {opacity:1, scale:1, delay:.6}, .6)
          .to('.hero .icon_next', .6, {opacity:1});

        function swipernext() {
        new TimelineMax({yoyo:false, repeat:-1})
          .to('.hero .icon_next', .4, {x:30})
          .to('.hero .icon_next', .8, {x:-60})
          .to('.hero .icon_next', .4, {opacity:0})
          .to('.hero .icon_next', .6, {x:0})
        }
      } else {
        return false;
      }

    });



    // Audio Player Initialize
    initPlayers($('#playerContainer').length);

    $(window).load(function(){
    })
      var bottomSwiper = new Swiper ('#bottomSlider', {
        direction: 'horizontal',
        loop: false,
        onSlideChangeEnd: function(swiper){
          var index = swiper.activeIndex;
          
          if( index == 0 ){
            $('#showImg').addClass('active');
            $('#showTxt').removeClass('active');
          }
          if( index == 1 ){
            $('#showTxt').addClass('active');
            $('#showImg').removeClass('active');
          }

          // console.log(swiper.activeIndex)
        },
      })

      $('#showImg').on('click',function(e){
        e.preventDefault();
        bottomSwiper.slideTo(0);
        $(this).addClass('active');
        $('#showTxt').removeClass('active');
      });

      $('#showTxt').on('click',function(e){
        e.preventDefault();
        bottomSwiper.slideTo(1);
        $(this).addClass('active');
        $('#showImg').removeClass('active');
      });
      var verticalSwiper = new Swiper('#verticalSlider', {
          scrollbar: '.swiper-scrollbar',
          direction: 'vertical',
          slidesPerView: 'auto',
          mousewheelControl: true,
          freeMode: true,
      });


      var artistSwiper = new Swiper('#artistSlider', {
          scrollbar: '.swiper-scrollbar',
          direction: 'vertical',
          slidesPerView: 'auto',
          mousewheelControl: true,
          freeMode: true,
          onScroll: function(swiper, e){
            // 마우스 스크롤시
            if( $('.artists li').eq(6).offset().top-96 <= 0 && $('.artists li').eq(11).offset().top-96 > 0) {
              $('.artists_list h3').text('Seoul Museum of Art 2F')
            }
            if( $('.artists li').eq(11).offset().top-96 <= 0 ) {
              $('.artists_list h3').text('Seoul Museum of Art 3F')
            }
            if( $('.artists li').eq(6).offset().top-96 > 0 ) {
              $('.artists_list h3').text('Seoul Museum of Art 1F')
            }
          },
          onSliderMove: function(swiper, e){
            // 터치 이동시
            // 2F, 3F의 위치에 따라 제목의 층수 바꾸기
            // 96은 상단 GNB와 제목 영역의 높이
            if( $('.artists li').eq(6).offset().top-96 <= 0 && $('.artists li').eq(11).offset().top-96 > 0) {
              $('.artists_list h3').text('Seoul Museum of Art 2F')
            }
            if( $('.artists li').eq(11).offset().top-96 <= 0 ) {
              $('.artists_list h3').text('Seoul Museum of Art 3F')
            }
            if( $('.artists li').eq(6).offset().top-96 > 0 ) {
              $('.artists_list h3').text('Seoul Museum of Art 1F')
            }
          }
      });
      var artSwiper = new Swiper ('#artSlider', {
        direction: 'horizontal',
        preventClicks: false,
        paginationHide: false,
        pagination: '#artSlider .swiper-pagination',
        paginationClickable: true,
        nextButton: '#artSlider .swiper-button-next',
        prevButton: '#artSlider .swiper-button-prev',
        loop: false,
      });

      TweenMax.set('.pop_wrap', {zIndex:-1, visibility:'hidden', opacity:0});

      $('.btn_pop_close').on('click',function(e){
        e.preventDefault();
        var popWrap = $(this).parent()
        
        new TimelineMax()
          .to(popWrap, .6, {opacity:0})
          .to(popWrap, .1, {zIndex:-1, visibility:'hidden'});
      });
      $('.art_img img').on('click',function(e){
        e.preventDefault();
        var popWrap = $('.art_gallery')
        
        new TimelineMax()
          .to(popWrap, .6, {opacity:0})
          .to(popWrap, .1, {zIndex:-1, visibility:'hidden'});
      });
      
      $('.btn_artists').on('click',function(e){
        e.preventDefault();
        new TimelineMax()
          .to('.artists_list', .1, {zIndex:50, visibility:'visible'})
          .to('.artists_list', .6, {opacity:1});
      });

      $('.btn_full').on('click',function(e){
        e.preventDefault();
        new TimelineMax()
          .to('.art_gallery', .1, {zIndex:50, visibility:'visible'})
          .to('.art_gallery', .6, {opacity:1});
      });

      TweenMax.to('.img_wrap img', 8, {scale:1.2, rotation:7, yoyo:true, repeat:-1, ease: Power0.easeNone});






});
