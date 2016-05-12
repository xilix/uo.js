### Undefined is not an Object

Aims to solve the problem of this error. When there is a complex object such us:

```js
  let person = {
    name: 'Jhon',
    lastname: 'Smith',
    job: {
      name: 'butcher',
      salary: 20000,
      company: {
        name: 'meats && cows inc.',
        revenue: 30000000
      },
      perks: {
        insurance: [
          {
            name: 'health care insurance',
            amount: 1000
          },
          {
            name: 'travel insurance',
            amount: 500
          }
        ]
      }
    }
  };
```

if some operation over some nested key is need but we cannot
asure that any of the parent keys are set up then is need to 
check all the parent keys in order to avoid a undefined is not
wathever runtime error:

```js
var getJobInsurancesAmount = function (person) {
  if (
    person &&
    person.job &&
    person.job.perks &&
    person.job.perks.insurance
  ) {
    return person.job.perks.insurance.reduce((insurance, amount) => {
      return amount + insurance.amount;
    }); 
  }
};
```

Undefined is not an Object allows to safely get any nested value without
having to check every key. This allows to simplify this kind of checks:

```js
const uo = require('uo');

var getJobInsurancesAmount = function (person) {
  if (uo(person, 'job', 'perks', 'insurance')) {
    return person.job.perks.insurance.reduce((insurance, amount) => {
      return amount + insurance.amount;
    }); 
  }
};
```

also it can be used to safe get some nested value, for example:

```js
const uo = require('uo');

var getJobInsurancesAmount = function (person) {
    return (uo(person, 'job', 'perks', 'insurance') || [])
    .reduce((insurance, amount) => {
      return amount + insurance.amount;
    }); 
  }
};
```

or

```js
const uo = require('uo');

var getCompanyName = function (person) {
  return uo(person, 'job', 'company', 'name');
};
```

## Warnings

Sometimes it may be better to have a runtime error when tring to access
a property key of an undefined object following the principle
of crash early but in other controlled situation it may be useful
to be able to safely get this property. Use it wisely, you now better
than anybody your code.