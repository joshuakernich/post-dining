ScreenAlloc = function($s,def,utils){

  this.activate = function(){
    var d = 500;

    d += utils.doAnimatedType( $s.find('.stockpile .wd-stat'), d ) + 500;
    d += utils.doAnimatedStat( $s.find('.stockpile .wd'), d ) + 1000;
    d += utils.doAnimatedType( $s.find('h2'), d, true ) + 1000;

    $s.find('.wd-chart li').each(function(){
      d += utils.doAnimatedType( $(this).find('.wd-stat'), d ) + 800;
      d += utils.doAnimatedStat( $(this).find('.wd'), d ) + 500;
    })

    utils.utter("Your allocation for today is "+def.alloc+" water dollars.",d);

    $s.find('button').css({opacity:0}).delay(d).animate({opacity:1},100);
  }
}