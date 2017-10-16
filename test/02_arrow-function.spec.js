import { expect, should } from 'chai';
should();

// You can implement your solution in another file or inline here
// You can find more information about arrow-function mdn by following the link below
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

describe('Arrow function', () => {
  describe('Invoked through call or apply', () => {
    it('Should not bind this through call', () => {
      const person = {
        age: 1,

        add: function (age) {
          const f = v => v + this.age;
          return f(age);
        },

        addThruCall: function (age) {
          let f = v => {
            return v + this.age;
          };

          const hidden = {
            age: 2
          };

          return f.call(hidden, age);
        },

        addThruApply: function (age) {
          let f = v => {
            return v + this.age;
          };

          const hidden = {
            age: 2
          };

          return f.apply(hidden, [age]);
        }
      };

      let actual = person.add(1);

      expect(actual).equal(2);

      actual = person.addThruCall(1);

      expect(actual).equal(2);

      actual = person.addThruApply(1);

      expect(actual).equal(2);
    });
  });
  describe('Used as methods', () => {
    it('Should return undefined', () => {
      const person = {
        age: 10,
        getAge: function () {
          return this.age;
        },
        getAgeByArrow: () => {
          return this ? this.age : undefined;
        }
      };

      Object.defineProperty(person, "getAgeProperty", {
        get: () => {
          return this ? this.age : undefined;
        }
      });

      let actual = person.getAge();

      expect(actual).equal(10);

      actual = person.getAgeByArrow();

      expect(actual).equal(undefined);

      actual = person.getAgeProperty;

      expect(actual).to.equal(undefined);

    });
  });

  describe('No binding of this & arguments ', () => {
    it("without its own 'this' context", (done) => {

      // TODO Modify the growUp function below to satisfy all the assertions below. Using '.bind' is forbidden
      function Person() {
        this.age = 10;

        setTimeout(() => {
          this.age++;
          expect(this.age).equal(11);

          done();// done is function used by mocha to manage the async call
        }, 0);
      }

      new Person();

    });
    describe("without its own 'argument' object ", () => {

      it('Should return the arguments variable', () => {

        function test(){
          return () => arguments[0];
        }

        let actual = test(42)();
        expect(actual).deep.equal(42);

      });
      it('Should override the argument object of foo()', () => {

        function foo(i) {
          const f = function () { return arguments[0] + i };
          return f(2);
        }

        let actual = foo(1);

        expect(actual).equal(3);

      });
      it('Should use the argument object of bar', () => {
        function bar(j) {
          const f = (i) => arguments[0] + i;
          return f(2);
        }

        let actual = bar(1);

        expect(actual).equal(3);

      });
    });
  });

  describe('Add function...', () => {

    // TODO Implement the add function below to satisfy all the assertions below.
    const add = function () {
      if(arguments.length <= 1)
        throw 'error';
      const ret = [...arguments].filter(arg => isNaN(arg)).length > 0;
      if(ret)
        throw 'error';
      return [...arguments].reduce((acc, val) => acc+val, 0);
    };

    it('Should return 5 when passing 2 and 3', () => {
      const actual = add(2, 3);

      actual.should.equal(5);
    });

    it('Should throw an error if only one argument is passed', () => {
      (() => {
        add(2);
      }).should.throw();
    });

    // TODO Usage of argument variable is forbidden
    it('Should accept more than 2 arguments', () => {
      const actual = add(1, 2, 3, 4);
      actual.should.equal(10);
    });

    it('Should throw an error if any of the arguments is not a number', () => {
      (() => {
        add(2, undefined, '2', 10);
      }).should.throw();
    });
  });

  describe('Lexical this', () => {
    it('Should return the list of fruits', () => {

      const cart = {
        owner: 'Davy',
        fruits: ['apple', 'banana'],
        printFruits: function () {

          // TODO Modify the function below to satisfy all the assertions below. '.bind' usage is forbidden
          const printFruits = (fruit) => {
            return this.owner + " bought " + fruit;
          };
          return this.fruits.map(printFruits);
        }
      };

      const actual = cart.printFruits();
      const result = ['Davy bought apple', 'Davy bought banana'];

      expect(actual).deep.equal(result);

    });
  });
});