ScreenPin = function($s,def,utils){

  var $k = $s.find('.keypad');
  var $pins = $s.find('.pin');

  for(var i=0; i<10; i++){
    $("<button>").appendTo($k).text(i).click(onPin);
  }

  $("<button>").appendTo($k).text('←').click(onPinBack);

  var iPin = 0;

  function onPin(){
   $pins.eq(iPin).text( $(this).text() ).removeClass('focus');
   iPin++;
   $pins.eq(iPin).addClass('focus');

   var scope = this;
   if(iPin==4){
      setTimeout(function(){
        utils.toNextScreen(scope);
      },1000)
      $('.sound-select')[0].play();
      
    } else {
      $('.sound-blip')[0].play();
    } 
  }

  function onPinBack(){
    $pins.eq(iPin).removeClass('focus');
    iPin--;
    $pins.eq(iPin).text('').addClass('focus');
    $('.sound-blip')[0].play();
  }
}