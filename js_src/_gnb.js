/**
 * gnb jQuery
 */

$(function(){

  $('.gnb-depth1-link').on('mouseenter', function(){

    $(this).next('.gnb-depth2').addClass('on');

  });

  //$('.gnb-depth1-item').on('mouseleave', function(){
  //
  //  $(this).children('.gnb-depth2').css('display', 'none');
  //
  //});

});