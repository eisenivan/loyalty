# Loyalty.js

## About

Loyalty js is a lightweight jQuery library that keeps track of how many times a user has come to your web property. You can control the behavior by adding data-attribute tags to your DOM elements.

## Usage

### data-loyalty

The `data-loyalty` tag lets the script know that this tag should be targeted. It accepts an optional `int` value. If this value is defined this element will show when the user has visited the site exactly that number of times.

```
<div data-loyalty="2">
	<p>This DIV will show for any user on their second visit</p>
</div>
```

### data-loyalty-min / data-loyalty-max

The `data-loyalty-min` tag is used to define the minimum value of a range of valid visit counts. As you can probably guess, `data-loyalty-max` does the opposite. If either tag is left blank the value will be set to `0` or `infinite` respectively.

```
<div data-loyalty data-loyalty-min="2" data-loyalty-max="20">
	<p>This DIV will show for any user on their 2nd through 20th visits.</p>
</div>
```