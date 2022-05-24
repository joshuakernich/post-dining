ScreenAlloc = function($s,def,utils){


  this.activate = function(){

    var n = Math.floor(Math.random()*def.allocations.length);
    var alloc = def.allocations[n];
    utils.alloc = alloc.wd;

    $s.find('.stockpile .wd').text(alloc.global);
    $s.find('.wd-chart').empty();

    console.log(alloc);

    $('<li><div class="wd-stat pos">Universal Daily Allocation</div><div class="wd pos">'+alloc.start+'</div></li>').appendTo($s.find('.wd-chart'));

    for(var i in alloc.penalties){
      $('<li><div class="wd-stat neg">'+alloc.penalties[i].name+'</div><div class="wd neg">'+alloc.penalties[i].wd+'</div></li>').appendTo($s.find('.wd-chart'));
    }

    $('<li><div class="wd-stat pos">TOTAL ALLOCATION</div><div class="wd pos">'+alloc.wd+'</div></li>').appendTo($s.find('.wd-chart'));

    var d = 500;

    d += utils.doAnimatedType( $s.find('.stockpile .wd-stat'), d ) + 500;
    d += utils.doAnimatedStat( $s.find('.stockpile .wd'), d ) + 1000;
    d += utils.doAnimatedType( $s.find('h2'), d, true ) + 1000;

    $s.find('.wd-chart li').each(function(){
      d += utils.doAnimatedType( $(this).find('.wd-stat'), d ) + 800;
      d += utils.doAnimatedStat( $(this).find('.wd'), d ) + 500;
    })

    utils.utter("Your allocation for today is "+alloc.wd+" water dollars.",d);

    $s.find('button').css({opacity:0}).delay(d).animate({opacity:1},100);
  }
}