import chai from 'chai';
const expect = chai.expect;
chai.should();

// You can implement your solution in another file or inline here

describe('Class in ES6', () => {
  describe('Like a function ...', () => {
    // Declare the Human class below that will satisfy all assertions
    class Human {
    }
    ;
    it('should be a function', () => {

      expect(Human).to.be.a('function');
    });
    it('should not be hoisted like function', () => {
      let polyFunc;

      (() => {
        polyFunc = new PolygoneFunc(3, 5);
      }).should.not.throw(Error);

      function PolygoneFunc(height, width) {
        this.height = height;
        this.width = width;

        this.log = function () {
          return `H:${this.height} & W:${this.width}`;
        };
      }

      let actual = polyFunc.log();

      expect(actual).equal('H:3 & W:5');

      let polyClass;

      // Hint: the declaration position of PolygoneClass is not correct
      class PolygoneClass {
        constructor(height, width) {
          this.height = height;
          this.width = width;
        }

        log() {
          return `H:${this.height} & W:${this.width}`;
        }
      }
      (() => {
        polyClass = new PolygoneClass(3, 5);
      }).should.not.throw(Error);


      actual = polyClass.log();

      expect(actual).equal('H:3 & W:5');

    });
  });
  describe('Property ...', () => {
    // Declare and implement the Man class to satisfy all assertions below
    class Man {
      name = 'Man';
      static inject = [];

      walk = () => {
      };

      constructor(props) {
        if (!props)
          throw Error();
        this.name = props.fullName;
      };

      get fullName() {
        return this.name;
      }

      set fullName(newName) {
        if (typeof newName !== 'string') {
          throw Error();
        }
        this.name = newName;
      }
    }


    it('should have a name property called name', () => {
      expect(Man).has.property('name').equal('Man');
    });

    it('Should have a property prototype of type object', () => {
      expect(Man).has.property('prototype').is.a('object');
      expect(typeof Man.prototype).equal('object');
    });

    it('Should contain a property Walk of type function', () => {
      const davy = new Man({
        name: 'Davy'
      });
      expect(davy).has.property('walk').is.a('function');
    });

    it('Should contain a static property called inject of type array', () => {
      expect(Man).has.property('inject').is.an('array');
    });

    it('Should throw an error if no fullName is passed at the instantiation', () => {
      (() => {
        new Man();
      }).should.throw(Error);
    });
    describe('Getter and Setter in ES6 class', () => {

      it('Should have an instance property fullName', () => {
        let obj = new Man({
          fullName: 'Tom Thomas'
        });
        const actual = obj.fullName;

        expect(actual).to.be.defined;
        expect(actual).to.equal('Tom Thomas');
      });

      it('It should throw an error if fullName is set to anything else but a string', () => {
        (() => {
          const davy = new Man({
            name: 'Davy'
          });
          davy.fullName = 123;
        }).should.throw(Error);
      });
    });
  });
});

