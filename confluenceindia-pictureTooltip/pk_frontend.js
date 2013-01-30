/**
   * Ready
*/

	jQuery(document).ready(function() {

		jQuery("nav").pk_menu();
		jQuery(".pk_categories_filter").pk_dropdown();
		jQuery(".pk_minimal_tabs, .pk_boxed_tabs").pk_tabs();
		jQuery(".pk_minimal_toggles, .pk_boxed_toggles").pk_toggles();
		jQuery(".pk_zoom_icon, .pk_play_icon, .pk_page_icon, .pk_link_icon").pk_image_rollover();
		jQuery(".pk_titled_widget").pk_titled_widget();

		setTimeout(function() {
			jQuery(".pk_get_size").each(function() {
				jQuery(this).text("Size: " + jQuery(this).parent().width() + "px");
			});
		}, 300);

		jQuery(".pk_widget").each(function() {
			jQuery(this).find(".pk_image").each(function() {
				jQuery(this).find(".pk_image_wrapper img").css({ "display" : "block", "width" : (jQuery(this).outerWidth() - 12) + "px" });
				jQuery(this).find(".pk_image_wrapper img").css({ "overflow" : "hidden" });
			});
		});

		jQuery("a[rel^='prettyPhoto']").prettyPhoto({
			default_width:800,
			default_height:450,
			allow_resize: true,
			autoplay_slideshow: false,
			slideshow: 5000,
			opacity: 0.8,
			theme: 'facebook'
		});

		if(jQuery("#pk_slogan").length == 0) {
			jQuery("#pk_page_title").css("border" , "none");
		}

	});


/**
   * PK Menu
*/

	(function($) {
		$.fn.pk_menu = function(options) {
			var defaults = {
				easing: "easeOutExpo",
				speedIn: 400,
				speedOut: 100
			};
		
			var settings = $.extend({}, defaults, options);
		
			return this.each(function () {
				var $root = $(this);
				var $lists = $("ul", this);
				var $buttons = $lists.find("ul").parent();
				
				$("ul ul", $root).each(function() {
					$("li:last-child", this).addClass("pk_last");
				});

				function showMenu($element) {

					if(jQuery.browser.msie && parseInt(jQuery.browser.version) < 9) {
						$element.css({visibility:'visible'}).show();
					} else {
						$element.css({visibility:'visible'}).fadeIn(settings.speedIn);
					}

				}
 
    			function hideMenu($element, $current) {
   
    				if(jQuery.browser.msie && parseInt(jQuery.browser.version) < 9) {
						$element.hide();
					} else {
						$element.fadeOut(settings.speedIn, function() {
    						$element.hide();
    					});
					}

    			}

				$buttons.each(function() {
					var $btn = $(this);

					$btn.click(function() {
						var $targetul = $(this).find("ul:first");
						$targetul.hide();
					});

					$btn.hoverIntent(function() {

						var $targetul = $(this).find("ul:first");
						showMenu($targetul);

					}, function() {

						var $targetul = $(this).find("ul:first");
						hideMenu($targetul, $(this));

					});
				});
			});
		};
	})(jQuery);


/**
   * PK Itis Slider
*/

	(function($) {
		$.fn.pk_itis_slider = function(options) {
			var defaults = {
				sliderWidth:940,
				sliderHeight:400,
				thumbsSpace:1,
				thumbsWidth:60,
				thumbsHeight:60,
				thumbsVisible:4,
				tooltipWidth:150,
				slideshowAutoStart:false,
				slideshowInterval:5
			};

			var settings = $.extend({}, defaults, options);

			return this.each(function() {
				var root = $(this);

				var slider_width = settings.sliderWidth;
				var slider_height = settings.sliderHeight;
				var slider_tot_items = $(".pk_slider_item", root).length;

				var thumbs_space = settings.thumbsSpace;
				var thumbs_width = settings.thumbsWidth;
				var thumbs_height = settings.thumbsHeight;
				var thumbs_visible = settings.thumbsVisible;
				var thumbs_tot_pages = Math.ceil(slider_tot_items / thumbs_visible);
				var thumbs_page_id = 0;

				var selected_thumb = undefined;
				var current_item_id = -1;
				var old_item_id = 0;

				var over_thumb_id = 0;
				var over_thumb_verse = "";
				var over_thumb_position = undefined;

				var is_over = false;
				var is_first = true;
				var is_loop = false;
				var is_video = false;
				var is_animation = false;
				var is_slideshow = (settings.slideshowAutoStart == true) ? true : false;
				var slideshow_interval = undefined;

				var videos = [];
				var tooltips_contents = [];

				/* Init Slider */

				function initSlider() {

					root.css({ "overflow" : "hidden", "height" : (slider_height + thumbs_height) + "px" });

					$(".pk_slider_content", root).css({ "overflow" : "hidden", "width" : slider_width + "px", "height" : slider_height + "px", "margin" : "0 auto" });
					$(".pk_slider_item", root).each(function(i) {
						$(this).css({ "position" : "absolute", "overflow" : "hidden", "width" : slider_width + "px", "height" : slider_height + "px" }).hide();
						tooltips_contents[i] = $(".pk_tooltip_caption", this).html();
						if($(".pk_video", this).length > 0) {
							videos[i] = $(".pk_video", this).html();
						}

						$(".pk_video", this).empty();
						$(".pk_tooltip_caption", this).hide();
					});

					createNavigation();

					/* First Click */
					
					$(".pk_thumb_button", root).filter(":eq(0)").trigger("click", [true]);

				}
				
				/* Slider Functions */

				function createNavigation() {
					
					var thumbs = (slider_tot_items > thumbs_visible) ? thumbs_visible : slider_tot_items;

					$(".pk_slider_navigation", root).css({ "display" : "block", "height" : thumbs_height + "px" });
					$(".pk_slider_navigation_wrapper", root).css({ "overflow" : "hidden", "width" : settings.sliderWidth + "px", "height" : thumbs_height + "px", "margin" : "0 auto" });
					$("ul", root).css({ "position" : "absolute", "width" : (thumbs_width * thumbs) + (thumbs_space * thumbs) + "px" });
					$("ul", root).css({ "margin-left" : 1 + ($(".pk_slider_navigation_wrapper", root).width() / 2) - ($("ul", root).width() / 2) + "px" });
					
					var button_next_position = ($(".pk_slider_navigation_wrapper", root).width() / 2) + ($("ul", root).width() / 2);
					var button_prev_position = ($(".pk_slider_navigation_wrapper", root).width() / 2) - ($("ul", root).width() / 2)
					
					$(".pk_button_next", root).css({ "margin-left" : (button_next_position - (thumbs_space + 8)) + "px", "margin-top" : ((thumbs_height / 2) - ($(".pk_button_next", root).height() / 2)) + "px" });
					$(".pk_button_prev", root).css({ "margin-left" : (button_prev_position - 12) + "px", "margin-top" : ((thumbs_height / 2) - ($(".pk_button_prev", root).height() / 2)) + "px" });

					$("li", root).each(function(i) {
						$(this).css({ "margin-right" : thumbs_space + "px", "width" : thumbs_width + "px", "height" : thumbs_height + "px" });
						
						$(".pk_thumb_button", this).removeAttr("href").css({ "cursor" : "pointer" });
						$(".pk_thumb_button, .pk_thumb_overlay", this).css({ "width" : thumbs_width + "px", "height" : thumbs_height + "px" });
						$(".pk_thumb_label_text", this).css({ "width" : thumbs_width + "px" });
						$(".pk_thumb_label_text", this).css({ "margin-left" : ((thumbs_width / 2) - ($(".pk_thumb_label_text", this).width() / 2)) + "px", "margin-top" : ((thumbs_height / 2) - ($(".pk_thumb_label_text", this).height() / 2)) + "px" });
						
						$(this).mouseenter(function(mouse) {
							selected_thumb = $(this);
							over_thumb_position = $(this).offset();
							over_thumb_id = i;
							
							(mouse.pageX < (over_thumb_position.left + (thumbs_width / 2)) ) ? over_thumb_verse = "left" : over_thumb_verse = "right";
							
							if(is_over == false) {
								createTooltip();
								showTooltip();
							}

							stopSlideshow();
						}).mouseleave(function(mouse) {
							var navigation_position = $(".pk_slider_navigation_wrapper", root).offset();

							if(mouse.pageY > navigation_position.top) {
								is_over = false;
								hideTooltip();
								startSlideshow();
							} else {
								is_over = true;
							}
						});

						$(".pk_thumb_button", this).click(function() {
							if(current_item_id == i || is_animation == true) {
								return true;
							}
							
							if(current_item_id == -1 || is_slideshow == true) {

								selected_thumb = $(this).parent();
								
							}

							is_animation = true;
							current_item_id = i;
							stopSlideshow();
							loadItem();
						});	
					});

					if(slider_tot_items > thumbs_visible) {
						$(".pk_button_prev", root).click(function() {
							if(thumbs_page_id - 1 < 0) {
								return true;
							}
						
							thumbs_page_id--;
							moveThumbs(thumbs_page_id);
						});
						$(".pk_button_next", root).click(function() {
							if(thumbs_page_id + 1 > (thumbs_tot_pages - 1)) {
								return true;
							}
						
							thumbs_page_id++;
							moveThumbs(thumbs_page_id);
						});
					} else {
						$(".pk_button_prev, .pk_button_next", root).hide();
					}

				}
				
				function loadItem() {

					var new_item = $(".pk_slider_item", root).filter(":eq(" + current_item_id + ")");

					($(".pk_video", new_item).length > 0) ? is_video = true : is_video = false;
					
					if(jQuery.browser.msie || (navigator.userAgent.indexOf('iPad') != -1)) {
						changeItem();
					} else {
						if(is_video == true) {
							changeItem();
						} else {
							new_item.find("img").pk_preloader({
								afterLoading:function() { 
									changeItem();
								},
								speedIn:0,
								delay:50
							});
						}
					}

				}

				function changeItem() {

					var new_color = $("li a", root).filter(":eq(" + current_item_id + ")").attr("data-bgColor");
					var new_item = $(".pk_slider_item", root).filter(":eq(" + current_item_id + ")");
					var old_item = $(".pk_slider_item", root).filter(":visible");
					var speed_change_color = (is_first == true) ? 0 : 600;

					if(new_color != "" && new_color != undefined && new_color != null) {
						root.animate({ "background-color" : new_color }, speed_change_color, "easeInOutQuad");
						$("header").animate({ "background-color" : new_color }, speed_change_color, "easeInOutQuad");
						$(".pk_slider_navigation_wrapper", root).animate({ "background-color" : new_color }, speed_change_color, "easeInOutQuad");
					}
					
					if(current_item_id > old_item_id || is_loop == true) {
						new_item.css({ "margin-top" : -(slider_height) + "px" }).show();
						old_item.stop().animate({ "margin-top" : slider_height + "px" }, 800, "easeInOutExpo", function() {
							if($(".pk_video", this).length > 0) { $(".pk_video", this).empty(); }
							$(this).hide();
							
						});
						new_item.stop().animate({ "margin-top" : "0px" }, 800, "easeInOutExpo", function() { 
							if(is_video == true) {
								$(".pk_video", this).html(videos[current_item_id]);
							}
							is_animation = false;
							startSlideshow();
						});
					} else {
						new_item.css({ "margin-top" : slider_height + "px" }).show();
						old_item.stop().animate({ "margin-top" : -(slider_height) + "px" }, 800, "easeInOutExpo", function() {
							if($(".pk_video", this).length > 0) { $(".pk_video", this).empty(); }
							$(this).hide();
						});
						new_item.stop().animate({ "margin-top" : "0px" }, 800, "easeInOutExpo", function() { 
							if(is_video == true) {
								$(".pk_video", this).html(videos[current_item_id]);
							}
							is_animation = false;
							startSlideshow();
						});
					}
					
					is_first = false;
					old_item_id = current_item_id;
					$("li", root).each(function() { $(".pk_thumb_label", root).stop().animate({ "margin-top" : "0px" }, 400, "easeOutExpo"); });
					$(".pk_thumb_label", selected_thumb).stop().animate({ "margin-top" : settings.thumbsHeight + "px" }, 400, "easeOutExpo");

				}

				function moveThumbs(page_id) {

					if(slider_tot_items < thumbs_visible) {
						return true;
					}

					$("ul", root).animate({ "margin-top" : -(thumbs_height * page_id)  + "px" }, 600, "easeOutExpo");
				}

				function createTooltip() {
					
					if(tooltips_contents[over_thumb_id] == "" || tooltips_contents[over_thumb_id] == null) {
						return true;
					}

					var tooltip_post_link = $(".pk_tooltip_post_link", root).filter(":eq(" + over_thumb_id + ")").length;
					var tooltip_link = $(".pk_tooltip_post_link", root).filter(":eq(" + over_thumb_id + ")").attr("href");
					var tooltip = '<div class="pk_tooltip_wrapper"><div class="pk_tooltip"><div class="pk_tooltip_content"></div><span class="pk_arrow"></span></div></div>';
					var tooltip_footer = (tooltip_post_link >= 1) ? '<div class="pk_tooltip_footer"><hr /><a href="' + tooltip_link + '" title="" class="pk_tooltip_read_more pk_button_circle pk_button_next">read more</a></div>' : '';
					var navigation_position = $(".pk_slider_navigation_wrapper", root).offset();
					var slider_position = root.offset();
					
					$(".pk_slider_content", root).append(tooltip);

					$(".pk_tooltip", root).css({ "width" : settings.tooltipWidth + "px" });
					$(".pk_tooltip_content", root).html(tooltips_contents[over_thumb_id] + tooltip_footer);
					$(".pk_tooltip_content hr", root).css({ "width" : (settings.tooltipWidth - 70) });
					$(".pk_tooltip_wrapper", root).css({ "width" : (settings.tooltipWidth + 40) + "px", "height" : ($(".pk_tooltip", root).outerHeight() + 30) + "px" });
					$(".pk_tooltip_wrapper", root).css({ "margin-left" : ((over_thumb_position.left - navigation_position.left) - (((settings.tooltipWidth + 40) - thumbs_width) / 2)) + "px" });
					$(".pk_tooltip_wrapper", root).css({ "margin-top" : (settings.sliderHeight - $(".pk_tooltip_wrapper", root).height()) + "px" });
					$(".pk_tooltip_wrapper", root).mouseleave(function(mouse) {
						var limit_left = slider_position.left + over_thumb_position.left;
						var limit_right = slider_position.left + over_thumb_position.left + thumbs_width;
						
						if(mouse.pageX < limit_left || mouse.pageX > limit_right || mouse.pageY < (navigation_position.top - $(".pk_tooltip", root).outerHeight())) {
							is_over = false;
							hideTooltip();
							startSlideshow();
						}
					});

				}
				
				function showTooltip() {

					if(jQuery.browser.msie && parseInt(jQuery.browser.version) < 9) {
						$(".pk_thumb_label", selected_thumb).stop().animate({ "margin-top" : settings.thumbsHeight + "px" }, 400, "easeOutExpo");
						$(".pk_tooltip", root).css({ "margin-left" : "20px", "margin-top" : "0px" }).hide();
						$(".pk_tooltip", root).show().stop().animate({ "margin-top" : "30px" }, 600, "easeOutExpo");
					} else {
						$(".pk_thumb_label", selected_thumb).stop().animate({ "margin-top" : settings.thumbsHeight + "px" }, 400, "easeOutExpo");
						$(".pk_tooltip", root).css({ "margin-left" : "20px", "margin-top" : "0px" }).hide();
						$(".pk_tooltip", root).show().stop().delay(80).animate({ "margin-top" : "30px" }, 600, "easeOutExpo");
						$(".pk_tooltip_wrapper", root).css("opacity" , "0").stop().delay(80).animate({ "opacity" : "1" }, 400, "linear");
					}

				}
				
				function hideTooltip() {

					$(".pk_tooltip_wrapper", root).remove();
					if(current_item_id != over_thumb_id) {
						$(".pk_thumb_label", selected_thumb).stop().animate({ "margin-left" : "0px", "margin-top" : "0px" }, 400, "easeOutExpo");
					}
					
				}

				function startSlideshow() {

					if(is_slideshow == false || is_video == true || $(".pk_tooltip_wrapper", root).length > 0) {
						return true;
					}
					
					clearInterval(slideshow_interval);
					
					function delay() {
						clearInterval(slideshow_interval);
						var thumb_to_click = current_item_id;

						if(thumb_to_click < (slider_tot_items - 1)) {
							is_loop = false;
							thumb_to_click++;
						} else {
							is_loop = true;
							thumb_to_click = 0;
						}

						$(".pk_thumb_button", root).filter(":eq(" + thumb_to_click + ")").trigger("click", [true]);
					}
					slideshow_interval = setInterval(delay, (settings.slideshowInterval * 1000));

				}

				function stopSlideshow() {

					clearInterval(slideshow_interval);

				}

				initSlider();
			});
		};
	})(jQuery);


/**
   * PK Slider
*/

	(function($) {
		$.fn.pk_slider = function(options) {
			var defaults = {
				sliderWidth:600,
				sliderHeight:320,
				buttonInfoOpenLabel:"info",
				buttonInfoCloseLabel:"close info",
				infoTextAlign:"left",
				infoBackgroundAlpha:0,
				slideshow:true,
				slideshowAutoStart:false,
				slideshowInterval:5,
				easing: "easeOutExpo",
				speedIn: 400,
				speedOut: 400
			};

			var settings = $.extend({}, defaults, options);

			return this.each(function() {
				var root = $(this);
				var content_width = (settings.sliderWidth - 12);
				var content_height = settings.sliderHeight;
				var is_slideshow = (settings.slideshow == true && settings.slideshowAutoStart == true) ? true : false;
				var tot_items = $(".pk_slider_item", root).length;
				var slideshow_interval = undefined;
				var is_loading = false;
				var is_video = false;
				var is_first = true;
				var info_open = false;
				var old_item = -1;
				var new_item = 0;

				var slider_media = [];
				var slider_descriptions = [];

				function initSlider() {

					root.css({ "width" : settings.sliderWidth + "px", "height" : (settings.sliderHeight + 40) + "px", "overflow" : "hidden" });
					$(".pk_slider_item", root).each(function(e) {
						slider_media[e] = $(".pk_slider_item_media", this).html();
						slider_descriptions[e] = $(".pk_slider_item_info_content", this).html();

						$(this).css({ "position" : "absolute", "overflow" : "hidden" });
						$(".pk_slider_item_media", this).empty();
						$(".pk_slider_item_info", this).hide();

						/* Position Info */

						$(".pk_slider_item_info", this).css({ "position" : "absolute", "padding" : "10px 20px", "width" : content_width + "px" });
						$(".pk_slider_item_info_content p", this).css({ "margin-bottom" : "5px" });

						var info_height = $(".pk_slider_item_info", this).outerHeight();

						$(".pk_slider_item_info", this).css({ "top" : settings.sliderHeight - info_height + "px", "text-align" : settings.infoTextAlign, "zIndex" : "10" }).hide();
						$(".pk_slider_item_info_content", this).css({ "position" : "absolute", "width" : (content_width - 40) + "px" });
						$(".pk_slider_item_info_background", this).css({ "position" : "absolute", "top" : "0", "left" : "0", "width" : content_width + "px", "height" : info_height });
						
						$(this).hide();
					});

					if(tot_items > 1) { createNavigation(); }
					createInfoButton();
					loadItem(new_item);
					
					$(".pk_slider_item_info_background", root).css({ "opacity" : settings.infoBackgroundAlpha });

				}

				function createNavigation() {

					var button_prev = '<span class="pk_button_circle pk_button_prev">prev</span>';
					var button_next = '<span class="pk_button_circle pk_button_next">next</span>';
					var button_slideshow = (settings.slideshow == true) ? '<span class="pk_button_circle pk_button_slideshow">play/pause</span>' : '';

					root.append('<div class="pk_slider_thumbs"></div>');

					$(".pk_slider_content", root).append(button_prev + button_next + button_slideshow);
					$(".pk_button_prev", root).css({ "margin-top" : ((content_height / 2) - ($(".pk_button_prev", root).height() / 2)) + "px", "margin-left" : "10px" });
					$(".pk_button_next", root).css({ "margin-top" : ((content_height / 2) - ($(".pk_button_next", root).height() / 2)) + "px", "margin-left" : (content_width - ($(".pk_button_next", root).width() + 10)) + "px" });
					$(".pk_button_slideshow", root).css({ "margin-top" : "10px", "margin-left" : "10px" });
					$(".pk_button_next, .pk_button_prev, .pk_button_slideshow", root).hide();
					
					for(i = 0; i < tot_items; i++) {
						$(".pk_slider_thumbs", root).append('<a href="#" title="" class="pk_button_circle pk_button_slider">' + (i + 1) + '</a>');
					}

					$(".pk_slider_thumbs a", root).each(function(e) {
						$(this).removeAttr("href").css({ "cursor" : "pointer" });
						$(this).click(function() {
							if(e == new_item || is_loading == true) {
								return true;	
							}

							is_loading = true;
							old_item = new_item;
							new_item = e;
							
							loadItem();
						});
					});

					$(".pk_button_prev", root).click(function() {
						var current_item = new_item;
						(current_item - 1 < 0) ? current_item = tot_items - 1 : current_item = current_item - 1;
						$(".pk_slider_thumbs a", root).filter(":eq("+ current_item +")").trigger("click", [true]);
					});

					$(".pk_button_next", root).click(function() {
						var current_item = new_item;
						(current_item + 1 > tot_items - 1) ? current_item = 0 : current_item = current_item + 1;
						$(".pk_slider_thumbs a", root).filter(":eq("+ current_item +")").trigger("click", [true]);
					});
					
					$(".pk_button_slideshow", root).click(function() {
						if(is_slideshow == false) {
							is_slideshow = true;
							$(".pk_button_next", root).trigger("click", [true]);
							$(this).addClass("pk_paused");
						} else {
							is_slideshow = false;
							stopSlideshow()
							$(this).removeClass("pk_paused");
						}
					});

					$(".pk_slider_content", root).mouseenter(function() {
						(jQuery.browser.msie && parseInt(jQuery.browser.version) < 9) ? $(".pk_button_next, .pk_button_prev, .pk_button_slideshow", root).show() : $(".pk_button_next, .pk_button_prev, .pk_button_slideshow", root).fadeIn(200);
					}).mouseleave(function() {
						(jQuery.browser.msie && parseInt(jQuery.browser.version) < 9) ? $(".pk_button_next, .pk_button_prev, .pk_button_slideshow", root).hide() : $(".pk_button_next, .pk_button_prev, .pk_button_slideshow", root).fadeOut(400);
					});

					if(is_slideshow == true) { 
						$(".pk_button_slideshow", root).addClass("pk_paused");
					}

				}

				function createInfoButton() {

					root.append('<span class="pk_slider_info_button">' + settings.buttonInfoOpenLabel + '</span>');

					$(".pk_slider_info_button", root).css({ "font-size" : "11px", "cursor" : "pointer"}).hide();
					$(".pk_slider_info_button", root).click(function() {
						if(info_open == false) {
							$(this).text(settings.buttonInfoCloseLabel);
							info_open = true;
							stopSlideshow();
							showInfo();
						} else {
							$(this).text(settings.buttonInfoOpenLabel);
							info_open = false;
							startSlideshow();
							hideInfo();
						}
					});

				}

				function loadItem() {

					var current_item = $(".pk_slider_item", root).filter(":eq(" + new_item + ")");
					$(".pk_slider_item_media", current_item).html(slider_media[new_item]);
					($(".pk_slider_item_media .pk_video", current_item).length >= 1) ? is_video = true : is_video = false;
					
					current_item.hide();
					stopSlideshow();

					if(is_video == true) {
						changeItem();
					} else {
						current_item.find(".pk_image img").pk_preloader({
							afterLoading:function() { 
								changeItem();
							},
							speedIn:0,
							delay:50
						});
					}

				}

				function changeItem() {

					var current_old_item = $(".pk_slider_item", root).filter(":eq(" + old_item + ")");
					var current_item = $(".pk_slider_item", root).filter(":eq(" + new_item + ")");
					
					if(is_first == false) {
						current_old_item.fadeOut(settings.speedOut, function() { $(".pk_slider_item_media", current_old_item).empty(); });
					}
					current_item.fadeIn(settings.speedIn, function() {
						$(".pk_button_slider", root).each(function(e) { $(this).removeClass("pk_selected"); });
						$(".pk_button_slider", root).filter(":eq(" + new_item + ")").addClass("pk_selected");
						$(".pk_zoom_icon, .pk_play_icon, .pk_page_icon, .pk_link_icon").pk_image_rollover();
						$("a[rel^='prettyPhoto']", root).prettyPhoto({
							default_width:800,
							default_height:450,
							allow_resize: true,
							autoplay_slideshow: false,
							slideshow: 5000,
							opacity: 0.8,
							theme: 'facebook'
						});

						startSlideshow();
						is_loading = false;
					});

					(slider_descriptions[new_item] == "" || slider_descriptions[new_item] == null) ? $(".pk_slider_info_button", root).fadeOut(200) : $(".pk_slider_info_button", root).fadeIn(200);
					if(info_open == true) { $(".pk_slider_info_button", root).trigger("click", [true]); }
					is_first = false;

				}

				function showInfo() {

					if(slider_descriptions[new_item] == "" || slider_descriptions[new_item] == null) {
						return true;
					}

					var current_item = $(".pk_slider_item", root).filter(":eq(" + new_item + ")");
					var current_info = $(".pk_slider_item_info", current_item);
					(jQuery.browser.msie && parseInt(jQuery.browser.version) < 9) ? current_info.show() : current_info.fadeIn(settings.speedOut);

				}

				function hideInfo() {

					(jQuery.browser.msie && parseInt(jQuery.browser.version) < 9) ? $(".pk_slider_item_info", root).hide() : $(".pk_slider_item_info", root).fadeOut(settings.speedOut);

				}
				
				function startSlideshow() {

					if(is_slideshow == false || is_video == true) {
						return true;
					}
					
					clearInterval(slideshow_interval);
					
					function delay() {

						clearInterval(slideshow_interval);
						$(".pk_button_next", root).trigger("click", [true]);
						
					}
					
					slideshow_interval = setInterval(delay, (settings.slideshowInterval * 1000));

				}

				function stopSlideshow() {

					clearInterval(slideshow_interval);

				}

				initSlider();
			});
		};
	})(jQuery);


/**
   * PK Titled Widget
*/

	(function($) {
		$.fn.pk_titled_widget = function() {
			return this.each(function() {
				var root = $(this);
				var root_width = root.width();
				var list_tot_items = $("li", root).length;
				var widget_type = root.attr("class").split(" ")[1];
				var current_id = 0;

				$("li", root).css({ "float" : "left", "width" : (root_width - 40) + "px" });
				$("ul", root).css({ "width" : (root_width * list_tot_items) + "px" });
				
				if(widget_type == "pk_testimonials" || widget_type == "pk_twitter" || $("li", root).filter(":eq(0)").find(".pk_image img").length == 0) {
					$(".pk_widget_content", root).css({ "height" :  $("li", root).filter(":eq(0)").outerHeight() + "px" });
					if(list_tot_items > 1) {
						$(".pk_button_next, .pk_button_prev", root).show();
					}
				} else {
					$("li", root).filter(":eq(0)").find(".pk_image img").pk_preloader({
						afterLoading: function() {
							$(".pk_widget_content", root).css({ "height" :  $("li", root).filter(":eq(0)").outerHeight() + "px" });
							if(list_tot_items > 1) {
								$(".pk_button_next, .pk_button_prev", root).show();
							} 
						},
						speedIn:600,
						delay:100
					});
				}
				
				function moveList(id) {
					
					var widget_height = $("li", root).filter(":eq(" + id + ")").outerHeight();
					
					$("ul", root).stop().animate({ "margin-left" : -(root_width * id) + "px" }, 600, "easeInOutExpo");
					$(".pk_widget_content", root).stop().animate({ "height" : widget_height + "px" }, 600, "easeOutExpo");

				}
				
				function addButton() {
					
					if(current_id >= 2 && widget_type != "pk_twitter") {
						$(".pk_call_to_action", root).show();
						$(".pk_call_to_action", root).click(function() {

							current_id = 0;
							removeButton();
							moveList(current_id);

						});
					}
					
				}
				
				function removeButton() {

					if(current_id < 2 && widget_type != "pk_twitter") {
						$(".pk_call_to_action", root).hide();
					}
					
				}
				
				$(".pk_button_next", root).click(function() {
					if(current_id + 1 > (list_tot_items - 1)) {
						return true;
					}

					current_id++;
					addButton();
					moveList(current_id);
				});

				$(".pk_button_prev", root).click(function() {
					if(current_id - 1 < 0) {
						return true;
					}

					current_id--;
					removeButton();
					moveList(current_id);
				});
			});
		};
	})(jQuery);


/**
   * PK Image Rollover
*/

	(function($) {
		$.fn.pk_image_rollover = function() {
			return this.each(function() {
				var root = $(this);
	
				$(".pk_image_button_overlay", this).css("background-position" , "right -60px");

				root.hover(function() {
					$(".pk_image_button_overlay", this).stop().animate({ backgroundPosition : "right 0px" }, 600, "easeOutExpo").show();
				}, function() {
					$(".pk_image_button_overlay", this).stop().animate({ backgroundPosition : "right -60px" }, 600, "easeInOutExpo", function() {
						$(this).hide();
					});
				}).click(function() {
					$(".pk_image_button_overlay", this).stop().animate({ backgroundPosition : "right -60px" }, 600, "easeInOutExpo", function() {
						$(this).hide();
					});
				});
			});
		};
	})(jQuery);


/**
   * PK Dropdown
*/

	(function($) {
		$.fn.pk_dropdown = function() {
			return this.each(function() {
				var root = $(this);
				var height = $(".pk_categories_list", root).height();

				$(".pk_categories_list", root).css("height" , "0px").hide();
				$(".pk_categories_list li", root).filter(":last").addClass("pk_last");

				$(".pk_dropdown_categories", root).hover(function() {
					$(".pk_categories_list", root).stop().animate({ "height" : height + "px" }, 600, "easeOutExpo").show();
				}, function() {
					$(".pk_categories_list", root).stop().animate({ "height" : "0px" }, 600, "easeOutExpo", function() {
						$(this).hide();
					});
				});
				$(".pk_categories_list li", root).click(function() {
					$(".pk_categories_list", root).stop().animate({ "height" : "0px" }, 600, "easeOutExpo", function() {
						$(this).hide();
					});
				});
			});
		};
	})(jQuery);


/**
   * PK Toggles
*/

	(function($) {
		$.fn.pk_toggles = function() {
			return this.each(function() {
				var root = $(this);
				var root_width = root.width();
				var buttons = $(".pk_toggle_button", root);
				var toggle_type = root.attr("class").split(" ")[0];
				var accordion = (root.attr("class").split(" ")[2] == "pk_accordion") ? true : false;

				//$(".pk_toggle:last", root).removeClass("pk_toggle_border");
				$(".pk_toggle_content_wrapper", root).css({ "display" : "none", "margin" : "0px", "width" : root_width + "px" });

				function pkAccordion(id) {
					buttons.each(function(i) {
						if(i != id) {
							if(this.is_open == true) {
								$(this).removeClass("pk_selected");
								$(this).next().slideToggle(600, "easeOutExpo");
							}
							this.is_open = false;
						}
					});
					buttons.filter(":eq(" + id +")").addClass("pk_selected");
					buttons.filter(":eq(" + id +")").next().slideToggle(600, "easeOutExpo");
				}

				buttons.each(function(i) {
					this.is_open = false;

					$(this).click(function() {
						if(accordion == true) {
							if(this.is_open == false) {
								this.is_open = true;
								pkAccordion(i);

								return true;
							}
						}

						if(this.is_open == false) {
							this.is_open = true;
							$(this).addClass("pk_selected");
						} else {
							this.is_open = false;
							$(this).removeClass("pk_selected");
						}
						$(this).next().slideToggle(600, "easeOutExpo");
					});
				});
			});
		};
	})(jQuery);


/**
   * PK Tabs
*/

	(function($) {
		$.fn.pk_tabs = function() {
			return this.each(function() {
				var root = $(this);
				var buttons = $(".pk_tabs_navigation a", root);

				$(".pk_tabs_label", root).show();
				$(".pk_tabs_navigation", root).show().css({ "margin-top" : "-1px", "right" : "0px" });
				$(".pk_tabs_navigation li:last", root).css({ "margin-right" : "0px" });
				$(".pk_tab", root).css({ "position" : "absolute" }).hide();
				$(".pk_tabs", root).css({ "top" : "39px" });

				if($(".pk_tabs_label", root).length == 0) {
					root.css("border-top" , "none");
				}

				buttons.each(function(i) {
					$(this).removeAttr("href").css({ "cursor" : "pointer", "padding-bottom" : "0px" });
					$(this).click(function() {
						$(".pk_tab", root).filter(":visible").hide();
						$(".pk_tab", root).filter(":eq(" + i + ")").show();
						$(".pk_tabs", root).css({ "height" : $(".pk_tab", root).filter(":eq(" + i + ")").outerHeight() + "px" });

						root.css({ "height" : $(".pk_tab", root).filter(":eq(" + i + ")").outerHeight() + $(".pk_tabs_navigation", root).outerHeight() + "px" });

						buttons.each(function(i) {
							$(this).parent().removeClass("pk_active_tab").css({ "height" : "39px" });
							$(this).css({ "padding-bottom" : "0px" });
						});

						$(this).parent().addClass("pk_active_tab").css({ "height" : "40px" });
					});
				});
				
				$(window).load(function() {
					buttons.filter(":eq(0)").trigger("click", [true]);
					setTimeout(function() {
						$(".pk_get_size", root).each(function() {
							$(this).text("Size: " + $(this).parent().width() + "px");
						});
					}, 300);
				});
			});
		};
	})(jQuery);


/**
   * PK Preloader
*/


	(function($) {
		$.fn.pk_preloader = function(options) {
			var defaults = {
				delay:400,
				speedIn:400,
				beforeLoading: function(){},
				afterLoading: function(){}
			};

			var settings = $.extend({}, defaults, options);

			return this.each(function() {
				var root = $(this);

				settings.beforeLoading.call(this);

				root.css({ "display" : "block", "opacity" : 0, "visibility" : "hidden" });

				function showImage(image) {

					if(image.data.url != undefined) { image = image.data.url; }

					if(settings.delay <= 0) {

						image.css({ "visibility" : "visible" }).animate({ "opacity" : 1 }, settings.speedIn, function() { 
							settings.afterLoading.call(this);
						});

					} else {

						setTimeout(function() {
							image.css({ "visibility" : "visible" }).animate({ "opacity" : 1 }, settings.speedIn, function() { 
								settings.afterLoading.call(this);
							});
						}, settings.delay);
					
					}

				}

				if(this.complete == true) {

					showImage(root);

				} else {

					root.bind("error load", { url:root }, showImage);

				}

			});
		};
	})(jQuery);


/**
   * PK Contact Form
*/

	(function($) {
		$.fn.pk_contact_form = function(options) {
			var defaults = {
				timer:4000,
				speedIn:400,
				speedOut:400
			};
		
			var settings = $.extend({}, defaults, options);
		
			return this.each(function () {
				var root = $(this);
				var button_send = $("input[type=submit]", root);
				var interval = undefined;
			
				function showResponse(message, type, timer) {

					if(interval) {
						clearInterval(interval);
						$(".pk_message_box", root).remove();
					}

					button_send.before('<div class="pk_message_box"><div class="pk_message_box_content_wrapper"><div class="pk_message_box_content"></div></div></div>');

					(type == "error") ? $(".pk_message_box", root).addClass("pk_error_box") : $(".pk_message_box", root).addClass("pk_success_box");

					$(".pk_message_box_content", root).html("<p>" + message + "</p>");
					$(".pk_message_box_content", root).css({ "padding-top" : "5px", "padding-bottom" : "5px" });
					$(".pk_message_box_content_wrapper", root).css({ "background-position" : "9px 0px" });
					$(".pk_message_box", root).css({ "display" : "none", "margin-bottom" : "10px"});
					$(".pk_message_box", root).fadeIn(settings.speedIn, function() {
						interval = setInterval(hideResponse, timer);
					});

				}
			
				function hideResponse() {

					clearInterval(interval);
					$(".pk_message_box", root).fadeOut(settings.speedOut, function() {
						$(".pk_message_box", root).remove();
					});

				}
			
				root.submit(function() {

					$.ajax({
						type: "POST",
						url: ajaxurl,
						data: $(this).serialize(),
						success: function(output) {
							root.find(".pk_form_success, .pk_form_error").remove();
							root.append(output).children(".pk_form_success, .pk_form_error").hide();

							if($("p", root).attr('class') == 'pk_form_success') {
								$("input[type=text], input[type=email], textarea", root).val('');
								showResponse($(".pk_form_success", root).text(), "success", settings.timer * 2);
							} else {
								showResponse($(".pk_form_error", root).text(), "error", settings.timer);
							}
						}

					});

					return false;
				});
			});
		}
	})(jQuery);


/**
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
* 
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* hoverIntent is currently available for use in all personal or commercial 
* projects under both MIT and GPL licenses. This means that you can choose 
* the license that best suits your project, and use it accordingly.
* 
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
* 
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
*	sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
*	interval: 100,   // number = milliseconds of polling interval
*	over: showNav,  // function = onMouseOver callback (required)
*	timeout: 0,   // number = milliseconds delay before onMouseOut function call
*	out: hideNav    // function = onMouseOut callback (required)
* });
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
	(function($) {
		$.fn.hoverIntent = function(f,g) {
			var cfg = {
				sensitivity: 7,
				interval: 100,
				timeout: 200
			};
			cfg = $.extend(cfg, g ? { over: f, out: g } : f );

			var cX, cY, pX, pY;
			var track = function(ev) {
				cX = ev.pageX;
				cY = ev.pageY;
			};

			var compare = function(ev,ob) {
				ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
				if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
					$(ob).unbind("mousemove",track);
					ob.hoverIntent_s = 1;
					return cfg.over.apply(ob,[ev]);
				} else {
					pX = cX; pY = cY;
					ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
				}
			};

			var delay = function(ev,ob) {
				ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
				ob.hoverIntent_s = 0;
				return cfg.out.apply(ob,[ev]);
			};

			var handleHover = function(e) {
				var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
				while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
				if ( p == this ) { return false; }

				var ev = jQuery.extend({},e);
				var ob = this;

				if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

				if (e.type == "mouseover") {
					pX = ev.pageX; pY = ev.pageY;
					$(ob).bind("mousemove",track);
					if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}
				} else {
					$(ob).unbind("mousemove",track);
					if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
				}
			};

			return this.mouseover(handleHover).mouseout(handleHover);
		};
	})(jQuery);

/**
 * @author Alexander Farkas
 * v. 1.22
 */

(function($) {
	if(!document.defaultView || !document.defaultView.getComputedStyle){ // IE6-IE8
		var oldCurCSS = $.curCSS;
		$.curCSS = function(elem, name, force){
			if(name === 'background-position'){
				name = 'backgroundPosition';
			}
			if(name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[ name ]){
				return oldCurCSS.apply(this, arguments);
			}
			var style = elem.style;
			if ( !force && style && style[ name ] ){
				return style[ name ];
			}
			return oldCurCSS(elem, 'backgroundPositionX', force) +' '+ oldCurCSS(elem, 'backgroundPositionY', force);
		};
	}
	
	var oldAnim = $.fn.animate;
	$.fn.animate = function(prop){
		if('background-position' in prop){
			prop.backgroundPosition = prop['background-position'];
			delete prop['background-position'];
		}
		if('backgroundPosition' in prop){
			prop.backgroundPosition = '('+ prop.backgroundPosition;
		}
		return oldAnim.apply(this, arguments);
	};
	
	function toArray(strg){
		strg = strg.replace(/left|top/g,'0px');
		strg = strg.replace(/right|bottom/g,'100%');
		strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
		var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
		return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
	}
	
	$.fx.step.backgroundPosition = function(fx) {
		if (!fx.bgPosReady) {
			var start = $.curCSS(fx.elem,'backgroundPosition');
			if(!start){//FF2 no inline-style fallback
				start = '0px 0px';
			}
			
			start = toArray(start);
			fx.start = [start[0],start[2]];
			var end = toArray(fx.end);
			fx.end = [end[0],end[2]];
			
			fx.unit = [end[1],end[3]];
			fx.bgPosReady = true;
		}
		//return;
		var nowPosX = [];
		nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
		nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];           
		fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];

	};
})(jQuery);
