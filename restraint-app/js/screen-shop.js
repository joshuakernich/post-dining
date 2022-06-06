ScreenShop = function($s,def,utils){

  var $crumbs = $s.find('.breadcrumbs');
  var beanEmpty = {name:"-",  wd:0,   d:makeDescription(0,0,0), img:'', top:'', bottom:''};
  var selections = [];
  var hasABurger = false;
  var wdSpend = 0;
  var timeActivate;
  var iTick;
  var stampWas;
  var $modal;

  for(var il in def.layers){

    var l = def.layers[il];

    var $p = $('<div class="shop-page">').insertBefore($s.find('.shop-page-checkout'));
    $('<h1>'+l.title+'</h1>').appendTo($p);
    if(l.subtitle) $('<h2 class="subtitle">'+l.subtitle+'</h2>').appendTo($p);

    for(var i in l.list){
      var $ing = $('<div class="ingredient">\
        <div class="ingredient-img" style="background-image:url('+l.list[i].img+')"></div>\
        <h2><span class="name">'+l.list[i].name+'</span> <span class="wd">'+toWD(l.list[i].wd)+'</span></h2>\
        <p style="white-space:nowrap;">'+l.list[i].d+'</p>\
        <button></button>\
      </div>').appendTo($p);

      l.list[i].n = i;
      $ing.data('bean',l.list[i]);

      if(l.list[i].isABurger) hasABurger = true;
    }

    selections[il] = beanEmpty;

    $('<li>'+l.short+'<div class="ing"></div></li>').insertBefore( $s.find('.breadcrumbs li:last-of-type'));
    $('<h2><span class="name">-</span> <span class="wd">0</span></h2>').insertBefore( $s.find('.summary-box hr'));
    $('<div class="ing-summary"></div>').appendTo( $s.find('.summary') );
    $('.wd-of').text(utils.alloc);
  }

  if(def.doCodeGen){
    $modal = $('<div class="layer shop-code-modal">').appendTo($s).hide();
    var $box = $('<div class="box">').appendTo($modal);
    $box.html("<h2>Your personal Canapé Code is</h2><h1 class='canape-code'>ZZZ</h1>");
    $('<button>Finish</button>').appendTo($box).click(function(){
      utils.toNextScreen(this);});
    $s.find('.redeem').click(toCodeModal);
  } else {
    $s.find('.redeem').click(function(){
      utils.toNextScreen(this);});
  }

  if(!def.timer) $s.find('.timer').hide();

  //add an extra layer for the burger top
  if(hasABurger) $('<div class="ing-summary"></div>').appendTo( $s.find('.summary') );

  function toWD(wd){
    return wd.toFixed(2);
  }

  function toCodeModal(isTimeUp){


    clearInterval(iTick);

    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var code = '';
    var sub = (isTimeUp == true)?'X':'O';

    for(var n in selections) code += (selections[n].n != undefined)?alphabet[selections[n].n]:sub;

    if(isTimeUp && wdSpend>utils.alloc) code = 'XXX';

    if(isTimeUp == true) $modal.find('h2').html('Your time has elapsed.<br>Your personal Canapé Code is');
    else $modal.find('h2').html('Your personal Canapé Code is');

    $modal.find('.canape-code').text(code);
    $modal.show();

    utils.utter($modal.find('h2').text() + '...' + code.split('').join('...'));
  }

  function toNextPage(scope){
    var i = $s.find('.shop-page').index($(scope).closest('.shop-page'));
    toPage(i+1);
  }

  function toPage(i){
    var $p = $s.find('.shop-page').hide().eq(i).show();
    $s.find('.breadcrumbs li').removeClass('active').eq(i).addClass('active');

    if($p.is('.shop-page-checkout')) {
      // CHECKOUT
      // Make burger drop-in
      $p.find('.ing-summary').each(function(n){
        $(this).css({top:-n*30-500}).delay(n*100).animate({top:-n*30})
      })
      

      if( wdSpend > utils.alloc ) utils.utter( $p.find('.alloc-error').text() );
      else if( wdSpend > 0 ) utils.utter("That's a good looking, socially responsible selection.");

    } else {
      // SHOP PAGE
      // Heading slides in
      $p.find('h1').css({position:'relative',top:-200}).animate({top:0});
      $p.find('h2.subtitle').css({position:'relative',top:-200}).animate({top:0});
      // say the header
      utils.utter($p.find('h1').text());
      // Make options appear
      $p.find('.ingredient').each(function(i){
        $(this).addClass('static').width(0).height(0).delay((i+1)*300).animate({width:220,height:10},300).delay(100).animate({height:200},300,function(){
          $(this).removeClass('static').css({width:'',height:''});
        });
      })
    }
  }

  function redrawSelections(){

    $s.find('.breadcrumbs li').removeClass('populated');

    $s.find('.ing-summary').first().css({'background-image':'none'});
    $s.find('.ing-summary').last().css({'background-image':'none'});

    var wd = 0;
    for(var n in selections){
      
      var bean = selections[n];
    
      wd += bean.wd;

      $s.find('.breadcrumbs li').eq(n).removeClass('populated');
      if(bean.wd>0) $s.find('.breadcrumbs li').eq(n).addClass('populated');
      
      $s.find('.breadcrumbs li').eq(n).find('.ing').css({'background-image':'url('+bean.img+')'});
      $s.find('.summary-box .name').eq(n).text(bean.name);
      $s.find('.summary-box .wd').eq(n).text(toWD(bean.wd));
      $s.find('.ing-summary').eq(n).css({'background-image':'url('+bean.img+')'});

      $s.find('.shop-page').eq(n).find('.ingredient').removeClass('selected').each(function(){
        if($(this).data('bean')==bean) $(this).addClass('selected');
      })

      if(bean.isABurger){
        $s.find('.ing-summary').first().css({'background-image':'url('+bean.bottom+')'});
        $s.find('.ing-summary').last().css({'background-image':'url('+bean.top+')'});
      }
    }

    $s.find('.wd-total').text(toWD(wd));
    $s.find('.wd-spent').text(toWD(wd));
    $s.find('.wd-total').removeClass('overspend');
    $s.find('.wd-alloc').removeClass('overspend');
    $s.find('.alloc-error').hide();
    $s.find('.redeem').show();

    if(wd>utils.alloc){
      //uh oh... too much!
      $s.find('.wd-total').addClass('overspend');
      $s.find('.wd-alloc').addClass('overspend');
      $s.find('.alloc-error').show();
      $s.find('.redeem').hide();
    }

    if(wd == 0){
      $s.find('.redeem').hide();
    }

    wdSpend = wd;
  }

  redrawSelections();

  this.activate = function(){
    $('.wd-of').text(utils.alloc);
    
    toPage(0);

    if(def.timer){
      timeActivate = new Date().getTime();
      iTick = setInterval(tick,50);
    }
  };

  this.deactivate = function(){
    clearInterval(iTick);
    $('.timer').removeClass('warning');
  }

  function tick(){
    var ms = def.timer * 1000 - ( new Date().getTime() - timeActivate );
    if(ms<0) ms = 0;
    var sec = Math.ceil(ms/1000);
    var min = Math.floor(sec/60);

    sec60 = sec%60;

    var stamp = '' + min + ':' + (sec60<10?'0':'') + sec60;
  
    if(sec<=15){
      
      if(stampWas != stamp){
        $s.find('.timer').addClass('warning');
        $s.find('.timer').css({'font-size':'55px'}).animate({'font-size':'50px'},200);
      }
    }

    if(ms == 0) toCodeModal(true);

    $('.timer').text(stamp);
    stampWas = stamp;
  }

  $s.find('.breadcrumbs li').click(function(){
    var n = $s.find('.breadcrumbs li').index(this);
    toPage(n);
  })

  $s.find('.ingredient').click(function(){
    $(this).closest('.shop-page').find('.ingredient').removeClass('active');
    $(this).addClass('active');
  })

  $s.find('.ingredient button').click(function(){

    var $ing = $(this).closest('.ingredient');
    var isAlreadySelected = $ing.hasClass('selected');

    $(this).closest('.shop-page').find('.ingredient').removeClass('selected');

    var iLayer = $s.find('.shop-page').index($(this).closest('.shop-page'));

    if(isAlreadySelected){

      selections[iLayer] = beanEmpty;
      redrawSelections();

    } else {

      selections[iLayer] = $ing.data('bean');
      utils.utter($ing.find('.name').text());
      redrawSelections();

      var me = this;
      setTimeout(function(){
        toNextPage(me);
      },1000)
    }
  })

  $s.find('.shop-page').hide().eq(0).show();
}