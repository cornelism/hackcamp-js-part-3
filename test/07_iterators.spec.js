import { expect } from 'chai';

/**
 * The goal here is to implement an iterator function.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols
 * http://www.2ality.com/2015/03/es6-generators.html
 */

describe('iterator function', () => {

  describe('Iterable Protocol', () => {
    it('Should have @@iterator( Symbol.iterator) property', () => {
      // Implement a iterable below to satisfy all assertions
      let iterable = {
        next(){
          return {
            done: true,
            value: 42
          }
        }
      };

      // We use the reflection API to get all proper keys
      const keys = Reflect.ownKeys(iterable);

      expect(iterable)
        .to.be.an('object')
        .that.has.property(keys[0])
        .to.be.a('function');
    });
  });

  describe('Iterator Protocol ...', () => {
    let iterator = function(array) {
      let nextIndex = 0;
      return {
        next(){
          return nextIndex < array.length ? {
            done: false,
            value: array[nextIndex++]
          } : {done:true, value: undefined};
        }
      }
    };
    it('Should return an object that provides a next method/function', () => {
      // Implement a iterator below to satisfy all assertions

      expect(iterator([]))
        .to.be.an('object')
        .that.has.property('next')
        .to.be.a('function');

    });
    describe('next function', () => {
      it('Should return an object with two properties: done of type boolean and value', () => {
        let returnObject = iterator([]).next();
        expect(returnObject).to.have.a.property('value').to.equal(undefined);
        expect(returnObject).to.have.a.property('done').to.be.a('boolean').to.equal(true);
      });

      it('Should return the next item in the collection', () => {
        let items = iterator(['Maartens', 'Johan', 'Eric', 'Tom']);

        expect(items.next()).to.deep.equal({value: 'Maartens', done: false});
        expect(items.next()).to.deep.equal({value: 'Johan', done: false});
        expect(items.next()).to.deep.equal({value: 'Eric', done: false});
        expect(items.next()).to.deep.equal({value: 'Tom', done: false});
        expect(items.next()).to.deep.equal({value: undefined, done: true});
        expect(items.next()).to.deep.equal({value: undefined, done: true});
      });
    });
  });

  describe('In action ', () => {

    describe('Class iterable', () => {
      class Company {
        constructor(customers) {
          this.customers = customers;
        }

        // Create a function below to make this.customers iterable
        [Symbol.iterator](){
          let nextIndex = 0;
          return {
            next:() => {
              return nextIndex < this.customers.length ?
                {done: false, value: this.customers[nextIndex++]}:
                {done: true, value: undefined}
            }
          }
        }
      }

      it('Company should be iterable by customers', () => {
        let company = new Company(['Davy', 'Thomas', 'Lars']);

        // TODO Fix the Company class above.

        let actual = (() => {
          const result = [];

          for (let customer of company) {
            result.push(customer);
          }
          return result;
        })();

        expect(actual).to.deep.equal(['Davy', 'Thomas', 'Lars']);

        actual = [...company];

        expect(actual).to.deep.equal(['Davy', 'Thomas', 'Lars']);
      });
    });

    describe('Natural numbers', () => {

      it('Should return natural numbers ', () => {

        function naturalNumbers() {
          let n = 0;
          return {
            [Symbol.iterator]() {
              return this;
            },
            next() {
              return {done: false, value:n++};
            }
          }
        }

        const iterator = naturalNumbers()[Symbol.iterator]();

        let actual = iterator.next().value;
        expect(actual).equal(0);

        actual = iterator.next().value;
        expect(actual).equal(1);

        iterator.next();
        iterator.next();
        iterator.next();
        actual = iterator.next().value;
        expect(actual).equal(5);
      });
    });

    describe('ObjectEntries', () => {
      it('Should iterate over the properties of an object ', () => {
        function objectEntries(obj) {
          let propKeys = Reflect.ownKeys(obj);
          let index = 0;

          return {
            [Symbol.iterator]() {
              return this;
            },
            next() {
              // Implement the next function that will return the key and object value of the key
              if(index < propKeys.length){
                const key = propKeys[index];
                index++;
                return {done: false, value: [key, obj[key]]}
              } else return {done: true}
            }
          }
        }

        let jane = {first: 'Jane', last: 'Doe'};
        const actual = [];
        for (let [key, value] of objectEntries(jane)) {
          actual.push(`${key}: ${value}`);
        }
        expect(actual).deep.equal(['first: Jane', 'last: Doe']);
      });
    });
  });
});
