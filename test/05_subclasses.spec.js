import { expect } from 'chai';

describe('Sub classing ', () => {
  it(' Should extends a class declaration/expression', () => {
    class Animal {
      constructor(name) {
        this.name = name;
      }

      eat() {
        return 'Eating ...';
      }

      speak() {
        return this.name + ' makes a noise.';
      }
    }
    //When uncommenting the animal class below, you have to comment the animal class above
    /*const Animal = class {
     constructor(name) {
     this.name = name;
     }

     eat() {
     return 'Eating ...';
     }

     speak() {
     return this.name + ' makes a noise.';
     }
     };*/
    class Dog extends Animal {
      speak() {
        return [super.speak(), this.name + ' barks.'];
      }
    }

    const d = new Dog('Mu');
    let actual = d.eat();

    expect(actual).equal('Eating ...');

    actual = d.speak();

    expect(actual).deep.equal(['Mu makes a noise.', 'Mu barks.']);
  });

  it('Should extends traditional function-based "classes" ', () => {
    function Animal(name) {
      this.name = name;
    }

    Animal.prototype.eat = function () {
      return 'Eating ...';
    };
    Animal.prototype.speak = function () {
      return this.name + ' makes a noise.';
    };

    class Dog extends Animal {
      speak() {
        return this.name + ' barks.';
      }
    }

    const d = new Dog('Mu');
    let actual = d.eat();

    expect(actual).equal('Eating ...');

    actual = d.speak();

    expect(actual).equal('Mu barks.');
  });

  it('Should not extend non constructive object', () => {
    const Animal = {
      eat() {
        return 'Eating ...';
      },
      speak() {
        return this.name + ' makes a noise.';
      }
    };
    // Uncomment this class below
    // class Dog extends Animal {
    //   constructor(name) {
    //     this.name = name;
    //   }
    //   speak() {
    //     return this.name + ' barks.';
    //   }
    // }

    // You can see that this statement above is not valid, so comment it then
    // Create a Dog class below that will inherit Animal class using  Object.setPrototypeOf()

    // Write Dog class here :)

    class Dog{
      constructor(name){
        this.name = name;
      }

      speak(){
        return this.name + ' barks.'
      }
    }

    Object.setPrototypeOf(Dog.prototype, Animal);

    const d = new Dog('Mu');

    let actual = d.eat();

    expect(actual).equal('Eating ...');

    actual = d.speak();

    expect(actual).equal('Mu barks.');

  });
});
