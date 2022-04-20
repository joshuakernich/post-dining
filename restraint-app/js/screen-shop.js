ScreenShop = function($s,def,utils){

  var $crumbs = $s.find('.breadcrumbs');

  for(var il in def.layers){

    var l = def.layers[il];

    var $p = $('<div class="shop-page">').insertBefore($s.find('.shop-page-checkout'));
    $('<h1>'+l.title+'</h1>').appendTo($p);

    for(var i in l.list){
      var $ing = $('<div class="ingredient">\
        <div class="ingredient-img" style="background-image:url('+l.list[i].img+')"></div>\
        <h2><span class="name">'+l.list[i].name+'</span> <span class="wd">'+l.list[i].wd+'</span></h2>\
        <p>'+l.list[i].d+'</p>\
        <button></button>\
      </div>').appendTo($p);

      $ing.data('bean',l.list[i]);
      if(l.isABurger) $ing.addClass('is-a-burger');
    }

    $('<li>'+l.short+'<div class="ing"></div></li>').insertBefore( $s.find('.breadcrumbs li:last-of-type'));
    $('<h2><span class="name">-</span> <span class="wd">0</span></h2>').insertBefore( $s.find('.summary-box hr'));
    $('<div class="ing-summary"></div>').appendTo( $s.find('.summary') );
    $('.wd-of').text(def.alloc);

    //add an extra layer for the burger top
    if(l.isABurger) $('<div class="ing-summary"></div>').appendTo( $s.find('.summary') );
  }

  function toNextPage(scope){
    var i = $s.find('.shop-page').index($(scope).closest('.shop-page'));
    toPage(i+1);
  }

  function toPage(i){
    var $p = $s.find('.shop-page').hide().eq(i).show();
    $s.find('.breadcrumbs li').removeClass('active').eq(i).addClass('active');

    if($p.is('.shop-page-checkout')) {
      //make the burger drop in
      $p.find('.ing-summary').each(function(n){
        $(this).css({top:-n*30-500}).delay(n*100).animate({top:-n*30})
      })
    }
  }

  toPage(0);

  $s.find('.breadcrumbs li').click(function(){
    var n = $s.find('.breadcrumbs li').index(this);
    toPage(n);
  })

  $s.find('.ingredient').click(function(){
    $(this).closest('.shop-page').find('.ingredient').removeClass('active');
    $(this).addClass('active');
  })

  $s.find('.ingredient button').click(function(){

    var isAlreadySelected = $(this).closest('.ingredient').hasClass('selected');

    $(this).closest('.screen').find('.ingredient').removeClass('selected');

    var $ing = $(this).closest('.ingredient');
    var idxBreadcrumb = $s.find('.shop-page').index($(this).closest('.shop-page'));

    if(isAlreadySelected){
      //just deselect it
      $s.find('.breadcrumbs li').eq(idxBreadcrumb).removeClass('populated');
      $s.find('.ing').eq(idxBreadcrumb).css({'background-image':'none'});
      $s.find('.summary-box .name').eq(idxBreadcrumb).text('-');
      $s.find('.summary-box .wd').eq(idxBreadcrumb).text(0);

      if( $ing.hasClass('is-a-burger') ){
        //well this is annoying
        $s.find('.ing-summary').first().css({'background-image':'none'});
        $s.find('.ing-summary').last().css({'background-image':'none'});
      } else {
        $s.find('.ing-summary').eq(idxBreadcrumb).css({'background-image':'none'});
      }
      
    } else {

      $ing.addClass('selected');
      
      var img = $ing.find('.ingredient-img').css('background-image');

      $s.find('.breadcrumbs li').eq(idxBreadcrumb).addClass('populated');
      $s.find('.ing').eq(idxBreadcrumb).css({'background-image':img});
      $s.find('.summary-box .name').eq(idxBreadcrumb).text($ing.find('.name').text());
      $s.find('.summary-box .wd').eq(idxBreadcrumb).text($ing.find('.wd').text());

      if( $ing.hasClass('is-a-burger') ){
        //well this is annoying
        $s.find('.ing-summary').first().css({'background-image':'url('+$ing.data('bean').bottom+')'});
        $s.find('.ing-summary').last().css({'background-image':'url('+$ing.data('bean').top+')'});
      } else {
        $s.find('.ing-summary').eq(idxBreadcrumb).css({'background-image':img});
      }

      utils.utter($ing.find('.name').text());

      var me = this;
      setTimeout(function(){
        toNextPage(me);
      },1000)
    }

    var total = 0;
     $s.find('.summary-box .wd:not(.wd-total)').each(function(){
      total += parseFloat($(this).text());
     })

     $s.find('.wd-spent').text(total);

     $s.find('.wd-alloc').removeClass('overspend');
     if(total>def.alloc) $s.find('.wd-alloc').addClass('overspend');
  })

  $s.find('.shop-page').hide().eq(0).show();
}