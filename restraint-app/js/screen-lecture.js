ScreenLecture = function($s,def,utils){

  $s.find('.intro-monologue').html(def.copy);

  this.activate = function(){
    var delay = 500;
    $s.find('p').each(function(){
      delay += utils.doAnimatedType($(this),delay,true) + 1000;
    })
  }
}