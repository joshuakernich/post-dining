ScreenPin = function($s,def,utils){

  var keys = 'abcdefghijklmnopqrstuvwxyz';
  var $k = $s.find('.keypad');
  var $pins = $s.find('.pin');

  for(var i=0; i<10; i++){
    $("<button>").appendTo($k).text(i).click(onPin);
  }

  $k.append('<br>');

  for(var i=0; i<keys.length; i++){
    $("<button>").appendTo($k).text(keys[i]).click(onPin);
    if(i == 13) $k.append('<br>');
  }

  $("<button>").appendTo($k).text('←').click(onPinBack);

  var iPin = 0;
  var PIN_LENGTH = 7;

  function onPin(){
   $pins.eq(iPin).text( $(this).text() ).removeClass('focus');
   iPin++;
   if(iPin > PIN_LENGTH) iPin = PIN_LENGTH;
   $pins.eq(iPin).addClass('focus');

   var scope = this;
   if(iPin==PIN_LENGTH){
      var code = $pins.text();
      var isProfile;
      for(var i in def.profiles){
        if(def.profiles[i].code == code) isProfile = def.profiles[i];
      }

      if(isProfile){
        setTimeout(function(){
          utils.toNextScreen(scope);
        },1500)
        $('.sound-select')[0].play();
        $pins.addClass('correct');
        $s.find('.pin-feedback').text(':: ID CODE VALIDATED ::');
      } else{
        $('.sound-error')[0].play();
        $pins.addClass('error');
        $s.find('.pin-feedback').text(':: ID CODE is INCORRECT ::');
      }
    } else {
      $('.sound-blip')[0].play();
    } 
  }

  function onPinBack(){
    $pins.eq(iPin).removeClass('focus');
    iPin--;
    if(iPin<0) iPin = 0;
    $pins.eq(iPin).text('').addClass('focus');
    $('.sound-blip')[0].play();
    $pins.removeClass('error');
    $s.find('.pin-feedback').text('');
  }
}