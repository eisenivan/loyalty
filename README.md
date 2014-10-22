# Loyalty.js

## About

Loyalty js is a lightweight jQuery plugin that keeps track of how many times a user has come to your web property and allows you to craft a different experience based on that count. You can control the behavior by adding data-attribute tags to your DOM elements. Now, rather than having content rotate for every user at the same time, you will be able to "tell a story" that always starts at the beginning and progresses as a user becomes more engaged.

## Installation

Include `jquery.loyalty.min.js` or `jquery.loyalty.js` in your project after jQuery.

Initialize with:

```javascript
$("html").loyalty({
	antiflickercss: true, // Dynamically add css to prevent "flicker"
	delay: 30, // Minimum time (in minutes) between valid site views
	debug: false, // Set true to print debugging info in the console

	runbefore: function(){
		console.log('this function will fire before the plugin fires.');
	},
	runafter: function(){
		console.log('this function will fire after the plugin fires.');
	}
});
```
That's it! Enjoy.

## Usage

### data-loyalty

The `data-loyalty` tag lets the script know that this tag should be targeted. It accepts an optional `int` value. If this value is defined this element will show when the user has visited the site exactly that number of times.

```html
<div data-loyalty="2">
	<p>This DIV will show for any user on their second visit</p>
</div>
```

### data-loyalty-min / data-loyalty-max

The `data-loyalty-min` tag is used to define the minimum value of a range of valid visit counts. As you can probably guess, `data-loyalty-max` does the opposite. If either tag is left blank the value will be set to `0` or `infinite` respectively.

```html
<div data-loyalty data-loyalty-min="2" data-loyalty-max="20">
	<p>This DIV will show for any user on their 2nd through 20th visits.</p>
</div>
```

### Options

```javascript
antiflickercss: true, // Dynamically add css to prevent "flicker". Default: true
delay:          30, // Minimum time (in minutes) between valid site views. Default: 30
debug:          false // Set true to print debugging info in the console. Default: false
runbefore:      function(){}, // Code to run before the plugin fires
runafter:       function(){} // Code to run after the plugin fires
```