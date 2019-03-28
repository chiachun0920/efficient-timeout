# efficient-timeout

Schedule a timeout job by efficiently using setTimeout"

## Installation

`$ npm install efficient-timeout` or  `$ yarn add efficient-timeout` 

## Usage

### public setTimeout(callback, milliseconds)

The `callback` is function.

The `milliseconds` is Date object or number.

```js
import EfficientTimeout from 'efficient-timeout';

let et = new EfficientTimeout();

et.setTimeout(() => {
  console.log('1');
}, 1000);

et.setTimeout(() => {
  console.log('2');
}, 2000);
```
### public schedule({ date: Date, callback: () => {} })

The `date` is a Date type object.

The `callback` is a work function will be executed when timer triggered.

```js
import EfficientTimeout from 'efficient-timeout';

let et = new EfficientTimeout();

et.schedule({
  date: new Date().getTime() + 4000,
  callback: () => {
    console.log('4');
  }
});

et.schedule({
  date: new Date(Date.now() + 5000),
  callback: () => {
    console.log('5');
  }
});
```