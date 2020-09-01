# B-Scroll

B-Scroll is jQuery / Javascript plugin which has control over browser scroll event, website header and navigation bar. It comes with useful feature which allows you to add `scroll to top button` to your project. With this plugin, you have extra access on scroll event and you can easily add animations to your project, based on scroll position.
- [Online demo](http://www.b-codestudio.com/b-scroll-demo)

### Compatibility
B-Scroll is fully functional plugin with all modern browsers and even with old browsers like IE10 and Opera 12.1.

### How to use
- [How to install video](https://www.youtube.com/watch?v=DsJX0hELv-Q)

After files are downloaded, you need to go to `src` folder and copy **jquery.BScroll.js** file and paste it to your `js` folder. Now open your root file such as `index.html` and paste this line of code next to your other `<script></script>` codes:

```
//Your other script tags
<script src="your js folder path/jquery.BScroll.js"></script> 
```
### initialization
Initilize the plugin like other jQuery plugins, like below:

```
$(document).ready(function() {
  $("your nav bar id").BScroll({
    // Option goes here
  });			
});
```
**Notice:** You need to select your nav bar by id to use B-Scroll plugin.

### Options
- `scrollDuration:` (Default: 300) Set duration of scroll movement in milliseconds. If you set it zero, then it acts like normal browser behaviour.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800					
});
```

- `scrollDistance:` (Default: 0) Set the distance without any suffix like `px` or `%`, just numeric value. `Header` animation and `scroll to top button` action happen after this certain distance.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50
});
```

- `scrollEasing:` (Default: linear) Scroll easing has long range of variety and is compatible with all modern and old browsers. Make sure put scroll easing name between `""` when you set it. List of easing:
  - linear
  - easeInQuad
  - easeOutQuad
  - easeInOutQuad
  - easeInCubic
  - easeOutCubic
  - easeInOutCubic
  - easeInQuart
  - easeOutQuart
  - easeInOutQuart
  - easeInQuint
  - easeOutQuint
  - easeInOutQuint
  - easeInSine
  - easeOutSine
  - easeInOutSine
  - easeInExpo
  - easeOutExpo
  - easeInOutExpo
  - easeInCirc
  - easeOutCirc
  - easeInOutCirc
  - easeInElastic
  - easeOutElastic
  - easeInOutElastic
  - easeInBack
  - easeOutBack
  - easeInOutBack
  - easeInBounce
  - easeOutBounce
  - easeInOutBounce
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart"
});
```

- `onScrollMovement:` This is an empty anonymous function which allows you to add one/more script(s) inside of it and when scroll event is happening, your scripts will be run.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  }
});
```

- `navLinkList:` (Default: []) This is an array of navigation bar links. Defines yours links (#example) then the plugin can detect how many sections you have on your page.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4']
});
```
**Notice:** Make sure navLinkList values are exactly the same as your nav bar `links` and your sections `id`.

- `activeLink:` (Default: '') Set the active link to start your website from that section. For instance, if you set `section 2` then you website loads from section 2.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1'
});
```

- `activeNavLinkClass:` (Default: ["BScroll-active"]) Define your `active` class to show what section is currently active on your nav bar. If you have burger nav bar and classic nav but you need to use two different classes, then you can easily define them as an array.

```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active']
});
```
**Notice:** activeNavLinkClass is an array and you need to follow Javascript array structure.

- `hashIsOn:` (Default: true) To show `hash` on your URL, set it `true`.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true
});
```

- `headerID:` (Default: '') Set your header `id` to align section's top below the `header`. If you don't set it, then the section's top stay behind header.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header'
});
```

- `headerClassName:` (Default: '') To animate header, set `headerClassName` with your `animation class`. Plugin will toggle the class to run animation.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled'
});
```

- `upButtonIsOn:` (Default: true) To have `scroll to top` button, set `upButtonIsOn` true.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
});
```

- `makeButton:` (Default: true) If you set this `true` then the plugin create the `scroll to top` button and append it to body.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
  makeButton: true
});
```

- `upButtonID:` (Default: 'BScroll-upButton') You can set and `id` for `scroll top top` button to have more control on it.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
  makeButton: true,
  upButtonID: 'go-upButton'
});
```
**Notice:** If you already have `scroll to top` button and set `makeButton` false then you have to set `upButtonID`.

- `upButtonText:` (Default: 'top') You can use text, HTML tags or even both to customize `scroll to top` button.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
  makeButton: true,
  upButtonID: 'go-upButton',
  upButtonText: '<div><span></span></div>'
});
```

- `upButtonScrollTo:` (Default: '#') Set the destination for `scroll to top` button. You can set `id` or `#`. 
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
  makeButton: true,
  upButtonID: 'go-upButton',
  upButtonText: '<div><span></span></div>',
  upButtonScrollTo: "#section1"
});
```
**Notice:** If you set `#` then `scroll to top` button scroll to top of the page.

- `upButtonClass:` (Default: '') If you need to animate `scroll to top` button by class then set it by your animation class name.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
  makeButton: true,
  upButtonID: 'go-upButton',
  upButtonText: '<div><span></span></div>',
  upButtonScrollTo: "#section1",
  upButtonClass: 'animateScrollToTop'
});
```

- `upButtonInlineStyle:` (Default: {bottom: '15px', right: '15px'}) Use this option to add inline `css style`.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
  makeButton: true,
  upButtonID: 'go-upButton',
  upButtonText: '<div><span></span></div>',
  upButtonScrollTo: "#section1",
  upButtonClass: 'animateScrollToTop',
  upButtonInlineStyle: {bottom: '25px', right: '25px'}
});
```
**Notice:** If you set `makeButton` false then you can not use `upButtonInlineStyle`.

- `upButtonStartingStyle:` (Default: {visibility: 'hidden', opacity: 0}) To animate `scroll to top` button with `inline` style not `css`, use this option. This option is for starting point styles such as `visibility: hidden`.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
  makeButton: true,
  upButtonID: 'go-upButton',
  upButtonText: '<div><span></span></div>',
  upButtonScrollTo: "#section1", 
  upButtonInlineStyle: {bottom: '25px', right: '25px'},
  upButtonStartingStyle: {visibility: 'hidden', right: "-100px"}
});
```
**Notice:** If you use `upButtonClass` then you can not use `upButtonStartingStyle`. You need to use `upButtonStartingStyle` with `upButtonEndingStyle` to run inline animation.

- `upButtonEndingStyle:` (Default: {visibility: 'visible', opacity: 1}) To animate `scroll to top` button with `inline` style not `css`, use this option. This option and `upButtonStartingStyle` need to work together to run inline animation. This option is for ending point styles such as `visibility: visible`.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
  makeButton: true,
  upButtonID: 'go-upButton',
  upButtonText: '<div><span></span></div>',
  upButtonScrollTo: "#section1", 
  upButtonInlineStyle: {bottom: '25px', right: '25px'},
  upButtonStartingStyle: {visibility: 'hidden', right: "-100px"},
  upButtonEndingStyle: {visibility: 'visible', right: '25px'}
});
```
**Notice:** If you use `upButtonClass` then you can not use `upButtonEndingStyle`.

- `upButtonZIndex:` (Default: 999999) Set `z-index` based on you desing.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
  makeButton: true,
  upButtonID: 'go-upButton',
  upButtonText: '<div><span></span></div>',
  upButtonScrollTo: "#section1", 
  upButtonInlineStyle: {bottom: '25px', right: '25px'},
  upButtonStartingStyle: {visibility: 'hidden', right: "-100px"},
  upButtonEndingStyle: {visibility: 'visible', right: '25px'},
  upButtonZIndex: 999
});
```

- `animationSpeed:` (Default: 300) Set transition speed for `scroll to top` button. Animation speed is in millisecond.
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
  makeButton: true,
  upButtonID: 'go-upButton',
  upButtonText: '<div><span></span></div>',
  upButtonScrollTo: "#section1", 
  upButtonInlineStyle: {bottom: '25px', right: '25px'},
  upButtonStartingStyle: {visibility: 'hidden', right: "-100px"},
  upButtonEndingStyle: {visibility: 'visible', right: '25px'},
  upButtonZIndex: 999,
  
  animationSpeed: 300
});
```
**Notice:** This option only works with `upButtonStartingStyle` and `upButtonEndingStyle`.

- `css3Easing:` (Default: 'ease') Set transition timing function for `scroll to top` button. This is css transition easing. List of easing:
  - ease
  - linear
  - ease-in
  - ease-out
  - ease-in-out
  - cubic-bezier(n,n,n,n)
  
```
$("#nav-bar").BScroll({		
  scrollDuration: 800,
  scrollDistance: 50,
  scrollEasing: "easeOutQuart",
  onScrollMovement: function() {				
	  // Your script				
  },
  
  navLinkList: ['#section1','#section2','#section3','#section4'],
  activeLink: '#section1',
  activeNavLinkClass: ['active'],
  hashIsOn: true,
  
  headerID: 'header',
  headerClassName: 'header-scrolled',
  
  upButtonIsOn: true,
  makeButton: true,
  upButtonID: 'go-upButton',
  upButtonText: '<div><span></span></div>',
  upButtonScrollTo: "#section1", 
  upButtonInlineStyle: {bottom: '25px', right: '25px'},
  upButtonStartingStyle: {visibility: 'hidden', right: "-100px"},
  upButtonEndingStyle: {visibility: 'visible', right: '25px'},
  upButtonZIndex: 999,
  
  animationSpeed: 300,
  css3Easing: 'ease'
});
```
**Notice:** This option only works with `upButtonStartingStyle` and `upButtonEndingStyle`.

### Reporting issues
If you have any issues or any code improvement, please feel free to share it with me.
