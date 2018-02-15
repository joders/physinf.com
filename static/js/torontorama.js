'use strict'

function load_page_images_sequentially() {

    var load_images_sequentially = function(image_list) {
        var load_image_step = function(index) {
            if(index<image_list.length) {
                image_list[index].onload=function() {
                    image_list[index].style.visibility='visible'
                    resize_image(image_list[index])
                    load_image_step(index+1)
                }
                image_list[index].src = image_list[index].attributes['data-src'].value
            }
            else
            resize_all_images()
        }
        load_image_step(0)
    }

    load_images_sequentially($('img'))
}

function resize_image(i) {
    var screen_width = Math.min($( window ).width(), $('#MyImageGallery')[0].offsetWidth)
    var screen_height = Math.min($( window ).height(), $('#MyImageGallery')[0].offsetHeight)

    // image height has to be smaller or equal 80% of the screen height
    // image width may only be larger than screen width when the height is smaller than half the width
    // never strech/skew an image (goes without saying)
    
    if(i.attributes.source_height.value / i.attributes.source_width.value * screen_width > .8 * screen_height) {
        i.style.width="auto"
        i.style.height="80%"
    } else if(i.attributes.source_width.value > 2 * i.attributes.source_height.value) {
        i.style.width="auto"
        i.style.height="60%"
        i.parentElement.scrollLeft= 0.5 * (i.width-screen_width)
    } else {
        i.style.width="100%"
        i.style.height="auto"
    }
}

function resize_all_images() {
    $('img').toArray().forEach(function(i, index) {
        resize_image(i)
    })
}

$(window).on('load', load_page_images_sequentially)
$(window).on('resize', resize_all_images)

