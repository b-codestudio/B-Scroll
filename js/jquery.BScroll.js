/* 
*	B-Scroll jQuery/Javascript plugin
*	
*	https://github.com/b-codestudio/B-Scroll
*
*	Version 1.0.1
*	
*	Developed by B-Code Studio
*/
(function($, window, document) {
	'use strict';
	
	$.fn.BScroll = function(options) {		
		var BS = $.fn.BScroll;				
				
		/*
		*	Initialize default variables 
		*/
		var settings = $.extend({}, $.fn.BScroll.defaults, options),
		
			// The object											
			$this = this,
			$thisLength = $this.length,

			// Header	
			headerElem,			
			
			// Up button
			upButton,
			
			// URL
			clickedURL,
			currentURL,
			
			// Scroll 					
			prevElementTop,
			prevElementIndex,
			currentElementTop,
			currentElementIndex,
			nextElementTop,
			nextElementIndex,
			currentScrollPosition = 0,			
			isScrolling = false,			
			
			// Navigation bar
			navLinkListLength = settings.navLinkList.length,							
		
			/************************************************ Initialize *************************************************/
			init = function() {															
				
				// Make the plugin ready by reading pre-sets							
				setHeader();
				setUpButton();												
				scrollToHash();												
								
				// Trigger navigation bar link by click			
				$("a").on('click', function(event) {
					event.preventDefault();					
					clickedURL = this.href.split("#")[0];
					currentURL = window.location.href.split("#")[0];
										
					if(currentURL === clickedURL && !isScrolling) {
						isScrolling = true;													
						scrollToTarget(setTopTarget(this.hash));						
					}
					else if(currentURL !== clickedURL  && !isScrolling) {
						window.open(this.href, "_blank");	
					}
				});													
								
				window.addEventListener('scroll', scrollListener);
				window.addEventListener('hashchange', hashChangeHandler);															
			},		
			
			/************************************************** General **************************************************/														
			/*
			*	Set animation speed
			*/
			setAnimationSpeed = function() {
				var transition = 'all ' + settings.animationSpeed + 'ms ' + settings.css3Easing;
				return {'-webkit-transition': transition,					
						'transition': transition};
			},				
			
			/*
			*	Set floating point and convert it to number
			*/
			floatingPoint = function(num) {			
				return Number(num.toFixed(2));
			},						
			
			/************************************************** Scroll **************************************************/
			/*
			*	Easing formula to animate scroll
			*	http://gizma.com/easing/
			*	http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
			*/
			easing = {
				
				linear: function (t, b, c, d) {
					return c*t/d + b;
				},				
				
				easeInQuad: function (t, b, c, d) {
					return c*(t/=d)*t + b;
				},
				
				easeOutQuad: function (t, b, c, d) {
					return -c *(t/=d)*(t-2) + b;
				},
				
				easeInOutQuad: function (t, b, c, d) {
					if ((t/=d/2) < 1) return c/2*t*t + b;
					return -c/2 * ((--t)*(t-2) - 1) + b;
				},
				
				easeInCubic: function (t, b, c, d) {
					return c*(t/=d)*t*t + b;
				},
				
				easeOutCubic: function (t, b, c, d) {
					return c*((t=t/d-1)*t*t + 1) + b;
				},
				
				easeInOutCubic: function (t, b, c, d) {
					if ((t/=d/2) < 1) return c/2*t*t*t + b;
					return c/2*((t-=2)*t*t + 2) + b;
				},
				
				easeInQuart: function (t, b, c, d) {
					return c*(t/=d)*t*t*t + b;
				},
				
				easeOutQuart: function (t, b, c, d) {
					return -c * ((t=t/d-1)*t*t*t - 1) + b;
				},
				
				easeInOutQuart: function (t, b, c, d) {
					if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
					return -c/2 * ((t-=2)*t*t*t - 2) + b;
				},
				
				easeInQuint: function (t, b, c, d) {
					return c*(t/=d)*t*t*t*t + b;
				},
				
				easeOutQuint: function (t, b, c, d) {
					return c*((t=t/d-1)*t*t*t*t + 1) + b;
				},
				
				easeInOutQuint: function (t, b, c, d) {
					if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
					return c/2*((t-=2)*t*t*t*t + 2) + b;
				},
				
				easeInSine: function (t, b, c, d) {
					return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
				},
				
				easeOutSine: function (t, b, c, d) {
					return c * Math.sin(t/d * (Math.PI/2)) + b;
				},
				
				easeInOutSine: function (t, b, c, d) {
					return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
				},
				
				easeInExpo: function (t, b, c, d) {
					return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
				},
				
				easeOutExpo: function (t, b, c, d) {
					return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
				},
				
				easeInOutExpo: function (t, b, c, d) {
					if (t==0) return b;
					if (t==d) return b+c;
					if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
					return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
				},
				
				easeInCirc: function (t, b, c, d) {
					return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
				},
				
				easeOutCirc: function (t, b, c, d) {
					return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
				},
				
				easeInOutCirc: function (t, b, c, d) {
					if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
					return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
				},
				
				easeInElastic: function (t, b, c, d) {
					var s=1.70158;
					var p=0;
					var a=c;
					if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
					if (a < Math.abs(c)) { a=c; var s=p/4; }
					else var s = p/(2*Math.PI) * Math.asin (c/a);
					return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				},
				
				easeOutElastic: function (t, b, c, d) {
					var s=1.70158;
					var p=0;
					var a=c;
					if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
					if (a < Math.abs(c)) { a=c; var s=p/4; }
					else var s = p/(2*Math.PI) * Math.asin (c/a);
					return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
				},
				
				easeInOutElastic: function (t, b, c, d) {
					var s=1.70158;
					var p=0;
					var a=c;
					if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
					if (a < Math.abs(c)) { a=c; var s=p/4; }
					else var s = p/(2*Math.PI) * Math.asin (c/a);
					if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
					return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
				},
				
				easeInBack: function (t, b, c, d, s) {
					if (s == undefined) s = 1.70158;
					return c*(t/=d)*t*((s+1)*t - s) + b;
				},
				
				easeOutBack: function (t, b, c, d, s) {
					if (s == undefined) s = 1.70158;
					return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
				},
				
				easeInOutBack: function (t, b, c, d, s) {
					if (s == undefined) s = 1.70158; 
					if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
					return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
				},
				
				easeInBounce: function (t, b, c, d) {
					return c - easing.easeOutBounce (d-t, 0, c, d) + b;
				},
				
				easeOutBounce: function (t, b, c, d) {
					if ((t/=d) < (1/2.75)) {
						return c*(7.5625*t*t) + b;
					} else if (t < (2/2.75)) {
						return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			
					} else if (t < (2.5/2.75)) {
						return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
					} else {
						return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
					}
				},
				
				easeInOutBounce: function (t, b, c, d) {
					if (t < d/2) return easing.easeInBounce (t*2, 0, c, d) * .5 + b;
					return easing.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
				}				
			},
			
			/*
			*	Listen to scroll movement
			*/
			scrollListener = function() {				
				currentScrollPosition = getScrollTop();
				
				if(currentScrollPosition > settings.scrollDistance) {
						
					// change header style
					if(settings.headerID && settings.headerClassName) {						
						headerElem.addClass(settings.headerClassName);	
					}
					
					// Up button
					if(upButton){
						if(settings.upButtonClass) {
							upButton.addClass(settings.upButtonClass);
						}
						else {
							upButton.css(settings.upButtonEndingStyle).css(setAnimationSpeed());							
						}											
					}
				}
				else {
					if(settings.headerID && settings.headerClassName) {						
						headerElem.removeClass(settings.headerClassName);				
					}
					
					if(upButton) {
						if(settings.upButtonClass) {
							upButton.removeClass(settings.upButtonClass);
						}
						else {
							upButton.css(settings.upButtonStartingStyle).css(setAnimationSpeed());
						}												
					}
				}
				
				setNewActiveLink();				
				settings.onScrollMovement.call(this);								
			},
						
			/*
			*	Set target element or position to be scrolled to
			*/
			setTopTarget = function(target) {
				var topTarget;
				
				if(target) {
					if(typeof target === 'number') {
						topTarget = target;
					}
					else if (typeof target === 'string') {
						topTarget = $(target).offset().top;										
					}
				}
				else {
					topTarget = 0;
				}
				
				return Math.floor(floatingPoint(topTarget));
			},
					
			/*
			*	Get current scroll top
			*	https://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
			*/
			getScrollTop = function() {
				var doc = document.body;								
				return Math.ceil((window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0));
			},
					
			/*
			*	Scroll to target
			*	https://gist.github.com/andjosh/6764939 		
			*/		
			scrollToTarget = function(target) {
				var currentScrollTop = getScrollTop(),
					distance = target - currentScrollTop,
					currentTime = 0,
					increment = 20,
					duration = settings.scrollDuration;
								
				// If current scrolltop is the same as target
				// Just scroll to the target immediately	
				if(target !== 0 && target === (currentScrollTop + getHeaderHeight())) {
					duration = 100;
				}
				else if(target === 0 && currentScrollTop === 0) {
					duration = 100;
				}
					
				var animateScroll = function() {        
					currentTime += increment;										
													
					var val = easing[settings.scrollEasing](currentTime, currentScrollTop, (distance - getHeaderHeight()), duration);
					
					window.scrollTo(0, val);
					
					if(currentTime < duration) {
						setTimeout(animateScroll, increment);																	
					}
					else {
						isScrolling = false;	
					}
				};								
				
				animateScroll();
			},
																
			/********************************************** URL hash ***********************************************/
			/*
			*	Get hash and match hash with nav bar links
			*/
			getURLHash = function() {
				var hash = window.location.hash;
								
				if(!hash) {
					hash = settings.activeLink;
				}
				
				return hash;	
			},
				
			/*
			*	Get URL hash and scroll to it
			*/
			scrollToHash = function() {								
				if($.data(document.body, 'BScroll') && !isScrolling) {			
					var hash = getURLHash();
					
					window.scrollTo(0, currentScrollPosition);												
					getCurrentLink(hash);
					isScrolling = true;
					scrollToTarget(setTopTarget(hash));	
				}
			},
			
			/*
			*	If manually change the hash then scroll to the element
			*/
			hashChangeHandler = function() {				
				if(!isScrolling) {
					window.scrollTo(0, currentScrollPosition);																							
					scrollToTarget(setTopTarget(getURLHash()));	
				}				
			},
			
			/*
			*	Set URL hash
			*/
			setURLHash = function(currentHash) {							
				window.history.replaceState(undefined, undefined, currentHash);
			},
			
			/********************************************** Navigation bar ***********************************************/
			/*
			*	Set active link class
			*/
			setActiveLinkClass = function(currentElem) {							
				for(var i = 0; i < $thisLength; i++) {					
					$("#" + $this[i].id + ' a[href="' + currentElem + '"]').parent().addClass(settings.activeNavLinkClass[i]);
				}															
			},							 			
	
			/*
			*	Get index of navigation link
			*/
			getIndexByValue = function(value) {
				return settings.navLinkList.indexOf(value);	
			},
					
			/*
			*	Set previous and next link
			*/		
			setPrevNextLink = function() {			
				if(currentElementIndex === 0) {
									
					nextElementIndex = currentElementIndex + 1;
					nextElementTop = setTopTarget(settings.navLinkList[nextElementIndex]);				
				}
				else if(currentElementIndex > 0 && currentElementIndex < navLinkListLength) {
					
					prevElementIndex = currentElementIndex - 1;
					prevElementTop = setTopTarget(settings.navLinkList[prevElementIndex]);
					
					nextElementIndex = currentElementIndex + 1;
					nextElementTop = setTopTarget(settings.navLinkList[nextElementIndex]);					
				}
			},
					
			/*
			*	Get current active link
			*/
			getCurrentLink = function(currentActiveElem) {
				currentElementIndex = getIndexByValue(currentActiveElem);
				currentElementTop = setTopTarget(settings.navLinkList[currentElementIndex]);								
				
				// Set url hash if it's on
				if(settings.hashIsOn) {
					setURLHash(currentActiveElem);
				}
				else {
					setURLHash(' ');
				}
				
				setActiveLinkClass(currentActiveElem);
				setPrevNextLink();			
			},			
					
			/*
			*	Set new active link based on the current element
			*/
			setNewActiveLink = function() {
				// Get current scroll top with header height
				var currentScrollTop = getScrollTop() + getHeaderHeight();										
							
				if(currentScrollTop >= nextElementTop && nextElementIndex < navLinkListLength){															
														
					for(var i = 0; i < $thisLength; i++) {
						$("#" + $this[i].id + " a").parent().removeClass(settings.activeNavLinkClass[i]);
					}	
					getCurrentLink(settings.navLinkList[nextElementIndex]);				
				}
				else if(currentScrollTop < currentElementTop) {
																			
					for(var i = 0; i < $thisLength; i++) {
						$("#" + $this[i].id + " a").parent().removeClass(settings.activeNavLinkClass[i]);
					}																	
					getCurrentLink(settings.navLinkList[prevElementIndex]);			
				}							
			},		
					
			/*************************************************** Header **************************************************/						
			/*
			*	Check if header and header style type is set
			*/
			setHeader = function() {
				if(!settings.headerID) { return; }
				
				if(settings.headerID) {															
					headerElem = $("#" + settings.headerID + "");
				}										
			},
			
			/*
			*	Get header height
			*/
			getHeaderHeight = function() {
				if(settings.headerID) {			
					return headerElem[0].offsetHeight;
				}
				else {
					return 0;	
				}				
			},
								
			/************************************************ Up Button **************************************************/
			/*
			*	Minimum css to run up button
			*/
			upButtonCSS = function() {			
				return {zIndex: settings.upButtonZIndex, position: 'fixed'};
			},
			
			/*
			*	Create the up button
			*/
			createUpButton = function() {
				upButton = $('<a/>').attr({href: settings.upButtonScrollTo, id: settings.upButtonID})
									.css(upButtonCSS())
									.css(settings.upButtonInlineStyle)																
									.html(settings.upButtonText)
									.appendTo('body');
				
				// Add inline starting style to
				// Run animation
				if(!settings.upButtonClass) {
					upButton.css(settings.upButtonStartingStyle);	
				}
			},							
					
			/* 
			*	Check up button element does exist
			*	Or if not then create new one
			*/
			setUpButton = function() {
				if(settings.upButtonIsOn) {
					if(settings.makeButton) {
						createUpButton();
					}
					else {										
						upButton = $("#" + settings.upButtonID + "").css(upButtonCSS());					
					}
				}
			};
			
		/************************************************ Methods **************************************************/
		/* 
		*	Remove created elements and event listeners
		*/			
		BS.destroy = function() {
			$.removeData(document.body, 'BScroll');
			
			window.removeEventListener('hashchange', hashChangeHandler);
			window.removeEventListener('scroll', scrollListener);						
				
			$("a").off('click');			
			for(var i = 0; i < $thisLength; i++) {
				$("#" + $this[i].id + " a").parent().removeClass(settings.activeNavLinkClass[i]);
			}	
																	
			if(settings.makeButton) {
				upButton.remove();	
			}			
		};	
		
		// Start plugin	only once
		if(!$.data(document.body, 'BScroll')){
			$.data(document.body, 'BScroll', true);			
			init();						
		}							
	};
	
	// Default variables
	$.fn.BScroll.defaults = {
		
		// Scroll				
		scrollDuration: 300,
		scrollDistance: 0,
		scrollEasing: 'linear',
		onScrollMovement: function() {},
		
		// Navigation bar
		navLinkList: [],
		activeLink: '',
		activeNavLinkClass: "BScroll-active",
		hashIsOn: true,	
		
		// Header defaults		
		headerID: '',	
		headerClassName: '',
		
		// Animation
		animationSpeed: 300,
		css3Easing: 'ease',
		
		// Up button
		upButtonIsOn: true,
		makeButton: true,
		upButtonID: 'BScroll-upButton',
		upButtonClass: '',
		upButtonText: 'Top',
		upButtonScrollTo: '#',		
		upButtonInlineStyle: {bottom: '15px', right: '15px'},
		upButtonStartingStyle: {visibility: 'hidden', opacity: 0},
		upButtonEndingStyle: {visibility: 'visible', opacity: 1},		
		upButtonZIndex: 999999				
	};
}(jQuery, window, document));
