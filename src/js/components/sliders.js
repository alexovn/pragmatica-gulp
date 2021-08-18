import Swiper, { Navigation, Pagination, EffectFade } from 'swiper';

const sliderList = {};

export default function sliders() {

  (function simpleSlider() {
    Swiper.use([Navigation, Pagination, EffectFade]);

    const selectionsSlider = new Swiper(".selections__slider", {
      slidesPerView: 2,
      slidesPerGroup: 2,
      autoHeight: false,

      navigation: {
        nextEl: ".selections__slider-button-next",
        prevEl: ".selections__slider-button-prev",
        disabledClass: "selections__slider-button-disabled"
      },
      pagination: {
        el: '.selections__slider-pagination',
        type: 'bullets',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
      },
    });

    function removeClasses(array, className) {
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        element.classList.remove(className);
      }
    }
  
    function addClasses(array, className) {
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        element.classList.add(className);
      }
    }


    function thumbnails(itemSelector, slider) {
      const list = document.querySelectorAll(itemSelector);
      for (let i = 0; i < list.length; i++) {
        const thumb = list[i];
        thumb.addEventListener('click', function(e) {
          e.preventDefault();
          removeClasses(list, 'product-thumbs__item_active');
          const idx = Array.prototype.indexOf.call(list, thumb);
          slider.slideTo(idx)
          thumb.classList.add('product-thumbs__item_active');
        });
      }
    }

    const productPhotos = new Swiper(".main .product-photos", {
      slidesPerView: 1,
      loop: false,
      breakpoints: {
        320: {
          slidesPerView: "auto",
        },
        992: {
          slidesPerView: 1,
        },
      },
      on: {
        slideChange(swiper) {
          const {el} = swiper
          const parent = el.closest('.product-card__gallery');
          const thumbs = parent.querySelectorAll('.product-thumbs__item');
          removeClasses(thumbs, 'product-thumbs__item_active');
          thumbs[swiper.activeIndex].classList.add('product-thumbs__item_active');
        }
      }
    });

    thumbnails(".main .product-thumbs__item", productPhotos)




    const modalProductPhotos = new Swiper(".white-popup-block .product-photos", {
      slidesPerView: 1,
      loop: false,
      breakpoints: {
        320: {
          slidesPerView: "auto",
        },
        992: {
          slidesPerView: 1,
        },
      },
      on: {
        slideChange(swiper) {
          const {el} = swiper
          const parent = el.closest('.product-card__gallery');
          const thumbs = parent.querySelectorAll('.product-thumbs__item');
          removeClasses(thumbs, 'product-thumbs__item_active');
          thumbs[swiper.activeIndex].classList.add('product-thumbs__item_active');
        }
      }
    });
    thumbnails(".modals .product-thumbs__item", modalProductPhotos)

    sliderList.modalProductPhotos = modalProductPhotos;


    const reviewsSlider = new Swiper(".reviews__slider", {
      slidesPerView: 6,
      slidesPerGroup: 1,
      spaceBetween: 16,

      navigation: {
        nextEl: ".reviews__slider-btn-next",
        prevEl: ".reviews__slider-btn-prev",
        disabledClass: "slider-button-disabled"
      },
      pagination: {
        el: '.reviews__slider-pagination',
        type: 'bullets',
        dynamicBullets: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 3.2,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 5.4,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 16
        },
      },
    });

    sliderList.storiesSlider = new Swiper(".stories-slider", {
      slidesPerView: 5,
      watchOverflow: true,
      spaceBetween: 62,
      breakpoints: {
        320: {
          slidesPerView: "auto",
          spaceBetween: 20,
          freeMode: true
        },
        768: {
          slidesPerView: "auto",
          spaceBetween: 50,
          freeMode: true
        },
        1199: {
          slidesPerView: 5,
          spaceBetween: 62,
          freeMode: false
        },
      }
    });

    const productsSlider = new Swiper(".products-slider__container", {
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 32,

      navigation: {
        nextEl: ".slider-button-next",
        prevEl: ".slider-button-prev",
        disabledClass: "slider-button-disabled"
      },
      breakpoints: {
        320: {
          slidesPerView: 2.2,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 3.2,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 32,
        },
      },
    });
  })();


  (function headerSliders() {
    const list = document.querySelectorAll(".product-month__slider");

    list.forEach(item => {
      const imageWrapper = item.closest('.product-month').querySelector('.product-month__picture img');
      const productMonthSlider = new Swiper(item, {
        slidesPerView: 1,
        speed: 250,
        effect: 'fade',
        navigation: {
          nextEl: ".product-month__next",
          prevEl: ".product-month__prev"
        },
        on: {
          slideChange(swiper) {
            const activeSlide = swiper.slides[swiper.activeIndex];
            const imageUrl = activeSlide.dataset.image || "";
            if (imageWrapper) {
              imageWrapper.src = imageUrl;
            };
          }
        }
      });

    });
  })();

}
export const slidersObj = sliderList;