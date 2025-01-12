new WOW().init();

$('#hamburger').click(function() {
    $(this).toggleClass('active');
    $('.header-hidden').toggleClass('active');
    $('html').toggleClass('noscroll');
    // $('.header-mobile').toggleClass('active');
});


var swiper = new Swiper('.main-swiper-container', {
    spaceBetween: 30,
    effect: 'fade',
    speed: 2000,
    autoplay: { delay: 2000, },
    pagination: {
        el: '.main-swiper-pagination',
        paginationType: "custom",
        clickable: true,
        renderBullet: function(index, galleryBullet) {
            return '<span class="' + galleryBullet + '">' + '0' + (index + 1) + '<div class="pagination-slide">слайд</div></span>';
        },
    },
    navigation: {
        nextEl: '.main-swiper-button-next',
        prevEl: '.main-swiper-button-prev',
    },
});


/*swiper with marks*/
function updSwiperNumericPagination() {
    this.el.querySelector('.team-swiper-pagination')
        .innerHTML = '<span class="count">' + (this.realIndex + 1) + '</span>/<span class="total">' + this.el.slidesQuantity + '</span>';
}


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.team-swiper').forEach(function(node) {
        // Getting slides quantity before slider clones them
        node.slidesQuantity = node.querySelectorAll('.swiper-slide').length;

        // Swiper initialization
        new Swiper(node, {
            speed: 2000,
            effect: 'fade',
            loop: true,
            autoplay: { delay: 2000, },
            pagination: {
                el: node.querySelector('.swPagination'),
                clickable: 'true'
            },
            on: { // Secondary pagination is update after initialization and before slide change
                init: updSwiperNumericPagination,
                slideChange: updSwiperNumericPagination
            }
        });
    });
});


//open modal
$(document).ready(function() {
    var modal = $('.modal-content');
    console.log(modal);

    $('.btn-go-gallary').click(function(event) {
        var btn = $(this);
        var id = $(this).attr('href').replace(/#modal/, '');
        // console.log('id = ' + id);

        $('.modal-content').hide();
        $('.modal-content').removeClass('activeModal');
        $('.overlay').fadeIn(200);
        $('.modal-content#modal' + id).show();
        $('.modal-content#modal' + id).addClass('activeModal');
        $('.btn-close-modal').fadeIn(200);
        $('.btn-arrow-modal').fadeIn(200);
        $('html, header').width($('html, header').width());
        $('html').css('overflow', 'hidden');


        var listItem = $('.activeModal');
        var listSize = $('.modal-content').length;
        // console.log(listSize);
        var currentModal = $('.modal-content').index(listItem);
        // console.log('Index: ' + currentModal);
        if (currentModal <= 0) {
            $('.btn-arrow-left').addClass('btn-disabled');
        } else if (currentModal + 1 == listSize) {
            $('.btn-arrow-right').addClass('btn-disabled');
        }

        $('.btn-arrow-left').click(function() {
            id--;
            if (id > 0) {
                $('.btn-arrow-left').removeClass('btn-disabled');
                $('.btn-arrow-right').removeClass('btn-disabled');
                $('.modal-content').hide();
                $('.modal-content').removeClass('activeModal');
                // console.log('new index = ' + id);
                $('.modal-content#modal' + id).show();
                $('.modal-content#modal' + id).addClass('activeModal');
                if (id == 1) {
                    $('.btn-arrow-left').addClass('btn-disabled');
                }
            }
        });

        $('.btn-arrow-right').click(function() {
            id++;
            if (id <= listSize) {
                $('.btn-arrow-left').removeClass('btn-disabled');
                $('.btn-arrow-right').removeClass('btn-disabled');
                $('.modal-content').hide();
                $('.modal-content').removeClass('activeModal');
                // console.log('new index = ' + id);
                $('.modal-content#modal' + id).show();
                $('.modal-content#modal' + id).addClass('activeModal');
                if (id == listSize) {
                    $('.btn-arrow-right').addClass('btn-disabled');
                }
            }
        });


    });

    $('.btn-close-modal, .overlay').click(function() {
        $('.modal-content').hide();
        $('.btn-arrow-modal').removeClass('btn-disabled');
        $('.modal-content').removeClass('activeModal');
        $('.btn-close-modal').fadeOut(200);
        $('.btn-arrow-modal').fadeOut(200);
        $('.overlay').fadeOut(200);
        $('html').removeAttr('style');
        $('.project-item').show();
    });

    $('.btn-full-window').click(function(event) {
        $('.modal-content').toggleClass('change-size');
        $('.modal-dublicat').toggleClass('active');
    });

});


$(document).ready(function() {
    $('.btn-callback').click(function(event) {
        var id = $(this).attr('href').replace(/#form/, '');
        $('.overlayX').fadeIn(200,
            function() {
                $('.feedback-modal#form' + id).addClass('modal-slide--active');
                $('html, header').width($('html, header').width());
                $('html').css('overflow', 'hidden');
            });
    });
    $('.close-btn, .overlayX, .modal-slide-btn').click(function() {
        $('.feedback-modal').removeClass('modal-slide--active');
        $('.overlayX').fadeOut(200);
        $('html').removeAttr('style');
    });
});

$(document).ready(function() {
    $('.btn-send-message').click(function(event) {
        var id = $(this).attr('href').replace(/#form/, '');
        $('.overlayX').fadeIn(200,
            function() {
                $('.feedback-modal#form' + id).addClass('modal-slide--active');
                $('html, header').width($('html, header').width());
                $('html').css('overflow', 'hidden');
            });
    });
    $('.close-btn, .overlayX, .modal-slide-btn').click(function() {
        $('.feedback-modal').removeClass('modal-slide--active');
        $('.overlayX').fadeOut(200);
        $('html').removeAttr('style');
    });
});


$(document).ready(function() {
    $('.send-order').click(function(event) {
        var id = $(this).attr('href').replace(/#modal/, '');
        $('.overlayX').fadeIn(200,
            function() {
                $('.feedback-modal-popup#modal' + id).addClass('active');
                $('html, header').width($('html, header').width());
                $('html').css('overflow', 'hidden');
            });
    });
    $('.close-btn-popup, .overlayX, .modal-slide-btn').click(function() {
        $('.feedback-modal-popup').removeClass('active');
        $('.overlayX').fadeOut(200);
        $('html').removeAttr('style');
    });
});

$(document).ready(function() {

    $('.callBack').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/callBack.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*$('.callBack .modal-popup-form-container').html('<p>Ваша заявка отправлена, спасибо!</p>');
                $('.callBack .btn').css('display', 'none');
                $('.callBack .modal-popup__title-h1').css('display', 'none');*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })

});  

$(document).ready(function() {

    $('.formPhone').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/formPhone.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                //$('.formPhone').html('<p>Ваша заявка отправлена, спасибо!</p>');
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })

});  

$(document).ready(function() {

    $('.formClient').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/formClient.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                //$('.formClient').html('<p>Ваша заявка отправлена, спасибо!</p>');
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })

});

$(document).ready(function() {

    $('.formSoisk').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/formSoisk.php',
            data: data,
            dataType: 'html',
            success: function (e) {

                function tryParseJSON(input) {
                   try {
                     // Пытаемся разобрать строку как JSON
                     const jsonData = JSON.parse(input);
                     return jsonData;
                   } catch (error) {
                     // Если произошла ошибка при разборе JSON, возвращаем null
                     return null;
                   }
                 }

                 const parsedData = tryParseJSON(e);
                 if (parsedData !== null) {
                   // Входная строка была JSON

                   $(".error_message2").remove();
                   var json = JSON.parse(e);

                   $.each(json, function (index, value) {
                     $('textarea[name=' + index + ']').addClass('invalid').parent().append('<span class="error_message2">' + value + '</span>');
                     $('input[name=' + index + ']').addClass('invalid').parent().append('<span class="error_message2">' + value + '</span>');
                     $('select[name=' + index + ']').addClass('invalid').parent().append('<span class="error_message2">' + value + '</span>');
                 });

                 } else {
                   // Входная строка была не JSON
                   $('.reset').val(''); 
                   $(".error_message2").remove();
                   //$('.formSoisk').html('<p>Ваша заявка отправлена, спасибо!</p>');
                   window.location = '/app_thanks/';

                 }

            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })

});

$(document).ready(function() {

    $('.callWork').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/callWork.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*$('.callWork .modal-popup-form-container').html('<p>Ваша заявка отправлена, спасибо!</p>');
                $('.callWork .btn').css('display', 'none');
                $('.callWork .modal-popup__title-h1').css('display', 'none');*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })

}); 

$(document).ready(function() {

    $('.formSait').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/formSait.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*$('.formSait .modal-popup-form-container').html('<p>Ваша заявка отправлена, спасибо!</p>');
                $('.formSait .btn').css('display', 'none');
                $('.formSait .modal-popup__title-h1').css('display', 'none');*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })

});  

$(document).ready(function() {

    $('.buySait').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/buySait.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*$('.buySait .modal-popup-form-container').html('<p>Ваша заявка отправлена, спасибо!</p>');
                $('.buySait .btn').css('display', 'none');
                $('.buySait .modal-popup__title-h1').css('display', 'none');*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })

}); 

$(document).ready(function() {

    $('.buyPortal').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/buyPortal.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*$('.buyPortal .modal-popup-form-container').html('<p>Ваша заявка отправлена, спасибо!</p>');
                $('.buyPortal .btn').css('display', 'none');
                $('.buyPortal .modal-popup__title-h1').css('display', 'none');*/
                window.location = '/app_thanks/';

            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })

});   

$(document).ready(function() {

    $('.buyApp').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/buyApp.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*$('.buyApp .modal-popup-form-container').html('<p>Ваша заявка отправлена, спасибо!</p>');
                $('.buyApp .btn').css('display', 'none');
                $('.buyApp .modal-popup__title-h1').css('display', 'none');*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })

});   

$(document).ready(function() {

    $('.buySEO').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/buySEO.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*$('.buySEO .modal-popup-form-container').html('<p>Ваша заявка отправлена, спасибо!</p>');
                $('.buySEO .btn').css('display', 'none');
                $('.buySEO .modal-popup__title-h1').css('display', 'none');*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })
});

$(document).ready(function() {

    $('.formWork').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/work.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*showMessage();
                reset ();*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;
    });

    $('.form_zayavka_na_obuchenie').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/form_zayavka_na_obuchenie.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*showMessage();
                reset ();*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;
    });

    $('.form_zayavka_s_vakansii').submit(function(){
        var that = $(this);
        var data = that.serialize();
        document.getElementById('form-vakansii').reset();
        $('.form_work-title').html('Отправляется...');

        $.ajax({
            type: 'post',
            url: '/ajax/form_zayavka_s_vakansii.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                $('.form_work-title').html('Успешно!');
                /*showMessage();
                reset ();*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                $('.form_work-title').html('Попробуйте позже');
                console.log(false);
            }
        });
        return false;
    });


    $('.zayavka-na-platformu').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/buyPlatform.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*reset ();
                $('.zayavka-na-platformu .modal-popup-form-container').html('<p>Ваша заявка отправлена, спасибо!</p>');
                $('.zayavka-na-platformu .btn').css('display', 'none');
                $('.zayavka-na-platformu .modal-popup__title-h1').css('display', 'none');*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;
    })


    $('.formCeny').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/zayavka_na_razrabotku.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*showMessage();
                reset ();*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;
    });

    $('.formSeoObuchenie').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/zayavka_na_seo_obuchenie.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*showMessage();
                reset ();*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;
    });

    $('.form_seo_obuchenie').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/zayavka_na_seo_obuchenie.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*reset ();
                $('.obuchenie-seo__form-wrap .modal-popup').removeClass('active');
                $('#modal8').addClass('active');
                setTimeout(function() {
                    $('#modal8').removeClass('active');
                    $('.overlayX').fadeOut(200);
                    $('html').removeAttr('style');
                }, '2000');*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;
    });


    function showMessage() {
        $('#modal8').addClass('active');
        $('.overlayX').fadeIn(200,
            function() {
                $('html, header').width($('html, header').width());
                $('html').css('overflow', 'hidden');
            });

        setTimeout(function() {
            $('#modal8').removeClass('active');
            $('.overlayX').fadeOut(200);
            $('html').removeAttr('style');
        }, '2000');
    };


    function reset () {
        $('textarea').val('');
        $('input').val('');
    };
});

$(document).ready(function() {

    $('.buyCourse').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/buyCourse.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*$('.buyCourse .modal-popup-form-container').html('<p>Ваша заявка отправлена, спасибо!</p>');
                $('.buyCourse .btn').css('display', 'none');
                $('.buyCourse .modal-popup__title-h1').css('display', 'none');*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })

});

$(document).ready(function() {

    $('.ostavitZayavku').submit(function(){
        var that = $(this);
        var data = that.serialize();

        $.ajax({
            type: 'post',
            url: '/ajax/ostavitZayavku.php',
            data: data,
            dataType: 'json',
            success: function (e) {
                console.log(true);
                /*$('.modal-popup').removeClass('active');
                $('.overlayX').fadeOut(200);
                $('html').removeAttr('style');
                $('textarea').val('');
                $('input').val('');*/
                window.location = '/app_thanks/';
            },
            error:function(e){
                console.log(false);
            }
        });
        return false;

    })

});



$(document).ready(function() {
    $(".gallary-content").click(function(){
      var data = $(this).data('id');
      $('.project-item[data-id='+data+']').hide();   
    });
    $(".btn-close-modal").click(function(){
        $('.project-item').show();
    });
});

$(document).ready(function() {
    const observer = lozad('.lozad', {
        rootMargin: '5px 0px',
        threshold: 0.1 
    });
    observer.observe();
});



var swiper = new Swiper('.swiper-work', {
    spaceBetween: 30,
    effect: 'fade',
    speed: 2000,
    autoplay: { delay: 2000, },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});

$(document).ready(function() {
    $('.zayavka').click(function(event) {
        var id = $(this).attr('href').replace(/#modal/, '');
        $('.overlayX').fadeIn(200,
            function() {
                $('.feedback-modal-popup#modal' + id).addClass('active');
                $('html, header').width($('html, header').width());
                $('html').css('overflow', 'hidden');
            });
    });
    $('.close-btn-popup, .overlayX, .modal-slide-btn').click(function() {
        $('.feedback-modal-popup').removeClass('active');
        $('.overlayX').fadeOut(200);
        $('html').removeAttr('style');
    });
});

$(document).ready(function () {
    $('a[href^="#"]').click(function () {
      let anchor = $(this).attr("href");
      $("html, body").animate(
      {
        scrollTop: $(anchor).offset().top - 125,
      },
      600
    );
    });
  
  var swiper = new Swiper(".swiper-container-projects", {
    slideToClickedSlide: true,
    slidesPerView: 1.875,
    spaceBetween: 40,
    centeredSlides: true,
    autoplay: true,
    delay: 3000,
    loop: true,
    slideActiveClass: "active",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    breakpoints: {
      320: {
        spaceBetween: 15,
        slidesPerView: 1.125,
      },
      768: {
        spaceBetween: 40,
      },
    },
  });
 });  

$('.header-services__title').click(function () {
    $('html').toggleClass('noscroll');
    $(this).toggleClass('active');
    $(this).parent().next().toggleClass('active');
});

var mainReviewsSlider = new Swiper('#main-reviews__slider', {
    speed: 1000,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.main-reviews-pagination',
        clickable: 'true',
    },
    on: {
        init: mainReviewsSliderNumber,
        slideChange: mainReviewsSliderNumber
    }
});

function mainReviewsSliderNumber() {
    let totalslide = this.slides.length;
    let currentSlide = this.realIndex + 1;

    $('.main-reviews-number-current').text(currentSlide);
    $('.main-reviews-number-total').text(totalslide);
} 

$(document).ready(function() {
    $(document).on('click', '.segoe-font--show-more', function(){

        var targetContainer = $('.segoe-font-uslugi'),          //  Контейнер, в котором хранятся элементы
            url =  $('.segoe-font--show-more').attr('data-url');    //  URL, из которого будем брать элементы

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){

                    //  Удаляем старую навигацию
                    $('.segoe-font--show-more').remove();

                    var elements = $(data).find('.other-services__link'),  //  Ищем элементы
                        pagination = $(data).find('.segoe-font--show-more');//  Ищем навигацию

                    targetContainer.append(elements);   //  Добавляем посты в конец контейнера
                    targetContainer.append(pagination); //  добавляем навигацию следом

                }
            })
        }

    });
    });


if($('.portfolio_filter').length){
    $('.portfolio_filter_top-add').on('click', function (e) {
        let index = $(this).index();
        let $switcher = $(this).closest('.portfolio_filter');
        let $switcher_container = $switcher.find('.portfolio_filter_bottom');
        let $switcher_contents = $switcher_container.find('.portfolio_filter_bottom-block');
        if($(this).hasClass('active')) {
            $('.portfolio_filter_top-add').removeClass('active')
            $switcher_container.find('.active').slideToggle()
            $switcher_container.find('.active').removeClass('active')

        } else {
            $('.portfolio_filter_top-add').removeClass('active')
            $(this).addClass('active')
            if($switcher_container.find('.active').length) {
                $switcher_container.find('.active').slideToggle()
                $switcher_container.find('.active').removeClass('active')
                setTimeout(()=>{
                    $($switcher_contents[index]).slideToggle()
                    $($switcher_contents[index]).addClass('active')
                },600)
            } else {
                $($switcher_contents[index]).slideToggle()
                $($switcher_contents[index]).addClass('active')
            }

        }
    })
    $('.portfolio_filter-checkbox--all').on('change', function (e) {
        if($(this).is(':checked')) {
            $(this).closest('.portfolio_filter_bottom-container').find('input').not(this).removeAttr('checked')
        }
    })
    $('.portfolio_filter_bottom-show').on('click', function (e) {
        $(this).siblings('.portfolio_filter_bottom-container--more').removeClass('hiden')
        $(this).css('display', 'none')
    })
    $('.portfolio_sidebar-btn-clean').on('click', function (e) {
        $(this).closest('.portfolio_sidebar-modal').find('input').removeAttr('checked')
    })
    $('.portfolio_sidebar-container-exit, .portfolio_sidebar--back').on('click', function (e) {
        $(this).closest('.portfolio_sidebar').addClass('hiden')
    })
    $('.portfolio_sidebtn-open').on('click', function (e) {
        $('.portfolio_sidebar').removeClass('hiden')
    })
    $('.portfolio_sidebar-show').on('click', function (e) {
        $(this).siblings('.portfolio_sidebar-list-more').removeClass('hiden')
        $(this).css('display', 'none')
    })
}

$('.portfolio_sidebtn-up').on('click', function (e) {
    $("html, body").animate({ scrollTop: 0 }, "slow");
})