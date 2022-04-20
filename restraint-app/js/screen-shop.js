ScreenShop = function($s,def,utils){

  var $crumbs = $s.find('.breadcrumbs');
  var beanEmpty = {name:"-",  wd:0,   d:makeDescription(0,0,0), img:'', top:'', bottom:''};
  var selections = [];
  var hasABurger = false;

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

      if(l.list[i].isABurger) hasABurger = true;
    }

    selections[il] = beanEmpty;

    $('<li>'+l.short+'<div class="ing"></div></li>').insertBefore( $s.find('.breadcrumbs li:last-of-type'));
    $('<h2><span class="name">-</span> <span class="wd">0</span></h2>').insertBefore( $s.find('.summary-box hr'));
    $('<div class="ing-summary"></div>').appendTo( $s.find('.summary') );
    $('.wd-of').text(def.alloc);
  }

  //add an extra layer for the burger top
  if(hasABurger) $('<div class="ing-summary"></div>').appendTo( $s.find('.summary') );

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
    } else {
      // SHOP PAGE
      // Heading slides in
      $p.find('h1').css({position:'relative',top:-200}).animate({top:0});
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
      $s.find('.summary-box .wd').eq(n).text(bean.wd);
      $s.find('.ing-summary').eq(n).css({'background-image':'url('+bean.img+')'});

      $s.find('.shop-page').eq(n).find('.ingredient').removeClass('selected').each(function(){
        if($(this).data('bean')==bean) $(this).addClass('selected');
      })

      if(bean.isABurger){
        console.log('here');
        $s.find('.ing-summary').first().css({'background-image':'url('+bean.bottom+')'});
        $s.find('.ing-summary').last().css({'background-image':'url('+bean.top+')'});
      }
    }

    $s.find('.wd-total').text(wd);
    $s.find('.wd-spent').text(wd);
    $s.find('.wd-total').removeClass('overspend');
    $s.find('.wd-alloc').removeClass('overspend');
    $s.find('.alloc-error').hide();
    $s.find('.redeem').show();

    if(wd>def.alloc){
      //uh oh... too much!
      $s.find('.wd-total').addClass('overspend');
      $s.find('.wd-alloc').addClass('overspend');
      $s.find('.alloc-error').show();
      $s.find('.redeem').hide();
    }
  }


  redrawSelections();

  this.activate = function(){
    toPage(0);
  };

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

    $(this).closest('.screen').find('.ingredient').removeClass('selected');

    var iLayer = $s.find('.shop-page').index($(this).closest('.shop-page'));

    if(isAlreadySelected){
      

      /*//just deselect it
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
      }*/

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