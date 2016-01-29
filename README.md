# collapsible
Pretty print JSON while auto-collapsing short JSON segments

## Options
Collapsible is configurable:
* **maxLength** (default: *200*) collapses any JSON segments smaller than this length
* **doubleSpaceDepth** (default: *1*) double spaces array and object elements at or below this depth
* **spaceBeforeColon** (default: *false*) inserts a space before colons in an object
* **spaceAfterColon** (default: *true*) inserts a space after colons in an object
* **spaceAfterComma** (default: *true*) inserts a space after commas in an object or array
* **spaceInsideBraces** (default: *true*) inserts space after an openening and before a closing brace for an object
* **spaceInsideBrackets** (default: *true*) inserts space after an openening and before a closing bracket for an array
* **sameLineBraces** (default: *false*) insets a newline between an array of objects
* **sameLineBrackets** (default: *false*) inserts a newline between an array of arrays
* **typeOrder** (defult: *{ boolean: 1, number: 2, string: 3, default: 99 }*) sets the ordering of keys in an object

## Install
```bash
npm install --save collapsible
```

## Examples

Collapsible's Output:
```js
var collapsible = require('collapsible');

var obj = {"id":"3901","type":"donut","name":"Cake","ppu":0.55,"batters":{"batter":[{"id":"1001","type":"Regular"},{"id":"1002","type":"Chocolate"},{"id":"1003","type":"Blueberry"}]},"topping":[{"id":"5001","type":"None"},{"id":"5002","type":"Glazed"},{"id":"5005","type":"Sugar"},{"id":"5007","type":"Powdered Sugar"}],"aisle":12};

var options = {
  maxLength: 100
};

collapsible.stringify(obj, options);

// Output
{
	"aisle": 12,

	"ppu": 0.55,

	"id": "3901",

	"name": "Cake",

	"type": "donut",

	"batters": {
		"batter": [
			{ "id": "1001", "type": "Regular" },
			{ "id": "1002", "type": "Chocolate" },
			{ "id": "1003", "type": "Blueberry" }
		]
	},

	"topping": [
		{ "id": "5001", "type": "None" },
		{ "id": "5002", "type": "Glazed" },
		{ "id": "5005", "type": "Sugar" },
		{ "id": "5007", "type": "Powdered Sugar" }
	]
}
```
Note the collapsed "batter" and "topping" sections; double spaced root elements; spaces around braces; and the numerical, string, and object values are clustered together.

Basic pretty print:
```js
JSON.stringify(obj, null, '\t');

// output
{
	"id": "3901",
	"type": "donut",
	"name": "Cake",
	"ppu": 0.55,
	"batters": {
		"batter": [
			{
				"id": "1001",
				"type": "Regular"
			},
			{
				"id": "1002",
				"type": "Chocolate"
			},
			{
				"id": "1003",
				"type": "Blueberry"
			}
		]
	},
	"topping": [
		{
			"id": "5001",
			"type": "None"
		},
		{
			"id": "5002",
			"type": "Glazed"
		},
		{
			"id": "5005",
			"type": "Sugar"
		},
		{
			"id": "5007",
			"type": "Powdered Sugar"
		}
	],
	"aisle": 12
}
```
Note how standard pretty printing has longer total length (58% longer) and non-grouping of similar types.
