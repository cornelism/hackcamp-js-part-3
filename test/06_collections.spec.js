import {expect} from 'chai';

/**
 * This set of koans focuses on collections from es6.
 * You can find more information at:
 */
describe('ES6 Collections', () => {
  /**
   * ES6 introduced the Map object
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
   */
  describe('Map', () => {
    let amap;

    beforeEach(function() {
      amap = new Map();
    });

    it('Setting keys in a Map', function() {
      // TODO Add some code above to satisfy all the assertions below.
      amap.set('key', 'value');
      expect(amap.size).to.equal(1);
      expect(amap.has('key')).to.be.true;
      expect(amap.get('key')).to.equal('value');
    });

    it('forEach', function() {
      amap.set('firstname', 'John');
      amap.set('lastname', 'Doe');
      amap.set('age', 42);
      // TODO Use the forEach loop to satisfy the assertion below
      let actual = '';
      for(let mapEntry of amap){
        actual += `(${mapEntry[0]}:${mapEntry[1]})`
      }
      expect(actual).to.equal('(firstname:John)(lastname:Doe)(age:42)');
    });

    it('clears', function() {
      Array(500).fill().map((_,i) => amap.set('key' + i, 'value'+i));

      // TODO Add some code here to satisfy the assertion below.
      amap.clear();
      expect(amap.size).to.equal(0);
    });

    it('clears without clear', function() {
      Array(500).fill().map((_,i) => amap.set('key' + i, 'value'+i));

      // TODO Now try to achieve the same without using the clear function.
      amap.forEach((val, key, map) => map.delete(key));
      expect(amap.size).to.equal(0);
    });
  });

  describe('Set', () => {
    /*
     * The Set object lets you store unique values of any type
     * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set
     */
    it('can receive elements', function() {
      const myset = new Set();

      // TODO Add some code below to satisfy the assertions
      myset.add('apple');
      expect(myset.size).to.equal(1);
      expect(myset.has('apple')).to.be.true;
    });

    it('behaves as a set', function() {
      const myset = new Set();
      myset.add('one');
      myset.add('one');
      myset.add('one');
      // TODO What is the size of the Set?
      const expected = 1;

      expect(myset.size).to.equal(expected);
    });
  });
});
