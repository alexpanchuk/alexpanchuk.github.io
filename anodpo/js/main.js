$(document).ready(function() {

/* MAIN MENU ================================== */
	// attachment on scroll
		var menuBlock = $('.header__nav');
		var menuOffset = menuBlock.offset().top;

		function fixMenu() {
			menuBlock.addClass('header__nav--attached');
			$('.header__search').hide();
			$('.phone__in-nav').show();
		}

		function unfixMenu() {
	    menuBlock.removeClass('header__nav--attached');
			$('.header__search').show();
			$('.phone__in-nav').hide();
		}

		// проверяем ширину экрана, чтобы определить закреплять меню с поиском или без
		$(window).on('resize', function(event) {
			unfixMenu();
			if ($(window).outerWidth() <= 990) {
					menuBlock = $('.header__menu-lvl-1');
				} else {
					menuBlock = $('.header__nav');
				}
			menuOffset = menuBlock.offset().top;
			if ( $(window).scrollTop() > menuOffset ) fixMenu();
		});

		// скрытие и показ меню
		$(window).on('scroll', function(event) {
		  if ( $(window).scrollTop() > menuOffset ) {
		    fixMenu();
		  } else {
		    unfixMenu();
		  }
		});

	// hide serch form placeholder on focus
		$('input').focus(function(){
		   $(this).data('placeholder',$(this).attr('placeholder'))
		   $(this).attr('placeholder','');
		 });
		 $('input').blur(function(){
		   $(this).attr('placeholder',$(this).data('placeholder'));
		 });
	// mainmenu animation
		$('.header__menu-lvl-1 li').hover(function() {
			$(this)
				.children('ul')
				.stop(true, true)
				.slideDown(200, function() {
					$(this)
						.children('li')
						.animate({ opacity: 1 }, 300);
			});
		}, function() {
			$(this)
				.children('ul')
				.stop(true, true)
				.slideUp(200, function() {
					$(this)
						.children('li')
						.animate({ opacity: 0 }, 100);
				});
		});
/* END MAIN MENU=============================== */

/* MOBILE MENU ================================ */
	var mobmenu = $('.mobmenu'); // Меню
	var dropdown = $('.dropdown');				
	// top menu show/hide on scroll
		var scrollPrev = 0 // Предыдущее значение скролла

		$(window).scroll(function() {
			var scrolled = $(window).scrollTop(); // Высота скролла в px
			var firstScrollUp = false; // Параметр начала сколла вверх
			var firstScrollDown = false; // Параметр начала сколла вниз
			
			// Если скроллим
			if ( scrolled > 0 ) {
				// Если текущее значение скролла > предыдущего, т.е. скроллим вниз
				if ( scrolled > scrollPrev ) {
					firstScrollUp = false; // Обнуляем параметр начала скролла вверх
					// Если меню видно
					if ( scrolled < mobmenu.height() + mobmenu.offset().top ) {
						// Если только начали скроллить вниз
						if ( firstScrollDown === false ) {
							var topPosition = mobmenu.offset().top; // Фиксируем текущую позицию меню
							mobmenu.css({
								// "top": topPosition + "px"
							});
							firstScrollDown = true;
						}
						// Позиционируем меню абсолютно
						if (!dropdown.hasClass('active')) { // при открытом меню не скрываем
							mobmenu.css({
								"position": "absolute"
							});
						}
					// Если меню НЕ видно
					} else {
						// Позиционируем меню фиксированно вне экрана
						mobmenu.css({
							"position": "fixed",
							"top": "-" + mobmenu.height() + "px"
						});
					}
					
				// Если текущее значение скролла < предыдущего, т.е. скроллим вверх
				} else {
					firstScrollDown = false; // Обнуляем параметр начала скролла вниз
					// Если меню не видно
					if ( scrolled > mobmenu.offset().top ) {
						// Если только начали скроллить вверх
						if ( firstScrollUp === false ) {
							var topPosition = mobmenu.offset().top; // Фиксируем текущую позицию меню
							mobmenu.css({
								"top": topPosition + "px"
							});
							firstScrollUp = true;
						}
						// Позиционируем меню абсолютно
						mobmenu.css({
							"position": "absolute"
						});
					} else {
						// Убираем все стили
						mobmenu.removeAttr("style");
					}
				}
				// Присваеваем текущее значение скролла предыдущему
				scrollPrev = scrolled;
			}	
		});			
	// dropdown menu show
		function hideMenu () {
			dropdown.stop(true, true).animate({'left':'-300px'}, 300);
			dropdown.removeClass('active');
			$('body').removeClass('overflow-y-hidden');
		}

		function showMenu () {
			dropdown.stop(true, true).animate({'left':'0px'}, 300);
			dropdown.addClass('active');
			$('body').addClass('overflow-y-hidden');

		}

		mobmenu.on('click', function(event) {
			event.preventDefault();
			if (dropdown.hasClass('active')) {
				hideMenu();
			} else {
				showMenu();
			}
		});

		// запрет скролла при появлении меню
	    // var keys = { 37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 36 : 1, 35: 1 };
			// $('body').on({
			//   'mousewheel': function (e) {
			//     if (dropdown.hasClass('active')){
			//         e.preventDefault();
			//         e.stopPropagation();
			//     }
			//   },
			//   'keydown': function (e) {
			//     var key = e.keyCode
			//     if (keys[key] && dropdown.hasClass('active')) {
			//         e.preventDefault();
			//         e.stopPropagation();
			//     }
			//     if (key == 27) {
			//         dropdown.removeClass('active')
			//     }
			//   }
			// })
	// hide on click out of menu and menu button
		$(document).on('click', function(event) {
			if( ($(event.target).closest(dropdown).length) || ($(event.target).closest(mobmenu).length) ) 
        return;
			hideMenu();      
      event.stopPropagation();
		});
  // dropdown menu on item click
		// var menuItem = $('.dropdown__item');
		// menuItem.on('click', function(event) {
		// 	event.preventDefault();
		// 	hideMenu();			
		// });
	// dropdown submenu animate
		$('.dropdown__item').on('click', 'a', function(event) {
			event.preventDefault();
			var thisMenuItem = $(this).parent(),
					subMenu = $(this).siblings('ul'),
					toggled = thisMenuItem.hasClass('dropdown__item--toggled');
					
			if (toggled) {
				thisMenuItem.removeClass('dropdown__item--toggled');
				subMenu
					.stop(true, true)
					.slideUp(200);
			} else {
				thisMenuItem.addClass('dropdown__item--toggled');
				subMenu.stop(true, true)
					.slideDown(300);
			}
		});
/* END MONILE MENU ============================ */

/* TOP TOP BUTTON ============================= */
	$('.totop').on('click', function(event) {
	  event.preventDefault();
	  $('body, html').animate( {scrollTop: 0}, 800);
	  return false;
	});

	$(window).on('scroll', function(event) {
	  var screenHeight = $( window ).height();
	  if ( $(window).scrollTop() > screenHeight ) {
	    $('.totop').addClass('totop--visible');
	  } else {
	    $('.totop').removeClass('totop--visible');
	  }
	});
/* END TO TOP BUTTON ========================== */

/* SLIDER ===================================== */
	// $(window).on('resize orientationchange', function() {
	// 	$('.cards__slider').slick({
	// 		infinite: true,
	// 		slidesToShow: 1,			
	// 	});
	// });

	// $('.cards__slider').slick({
	// 	infinite: true,
	// 	slidesToShow: 1,

    
  // });
/* ============================================ */

/* PARTY FORM ================================= */
	var total = 1;
	// Добавление поля ввода по клику на кнопку "Добавить"
	$('.party__btn--add').on('click', function() {
		total++;
		$('<li id="party__member-' + total + '">' +
				'<input type="text" name="party__memeber-' + total +'" class="party__input"> ' +
				'<a href="#" onclick="$(\'#party__member-' + total + '\').remove(); total--;"><i class="party__delete fa fa-close"></i></a>' +
			'</li>'
		)
		.appendTo( $('.party__list') );
		}
	);

	// Удаление поля ввода по клику на "х"
	$('.party__delete').on('click', function() {
		if (total > 0) total--;
		$(this).closest('.party__member').remove();
	})
/* END PARTY FORM ============================= */

});
/* ============================================ */
