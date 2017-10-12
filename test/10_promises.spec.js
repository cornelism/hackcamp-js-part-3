import  { expect } from 'chai';
import axios from 'axios';

const url = 'http://35.176.79.9:3756/orgs';
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
describe('Promises', () => {
  describe('Simple promises', () => {

    it('Promise resolving normally', (done) => {
      new Promise((resolve) => {
        resolve(3);
      }).then(
        (result) => {
          expect(__).to.equal(result);
          done();
        }
      );
    });

    it('Promise fail to resolve', (done) => {
      new Promise((resolve, reject) => {
        reject(new Error('Promise rejected'));
      }).then(
        error => {
          //TODO The test doesn't pass, why?
          //There are a few ways to fix this test, either you use another keyword than 'then'
          //Or you can look at the arguments that 'then' takes
          expect('Promise rejected').to.equal(error.message);
          done();
        }
      );
    });

    it('Turn this code into promise', (done) => {
      //Hint : the axios.get request return a promise, how can we get the data out of it?
      const organisationName = 'Hackages';
      let organisation = axios.get(`${url}/${organisationName}`);
      expect(organisation.email).to.equal('007@hackages.io');
      done();
    });
  });

  describe('Write your own promises', () => {

    it('Should pass the test after 1 second', () => {
      function delay(ms) {
        //TODO This function should return a promise that will resolve with the value 1 after ms milliseconds
      }

      delay(100).then(result => expect(result).to.equal(1));
    });
  });

  describe('Chain multiple promises', () => {

    it('Multiple promises chained', (done) => {
      new Promise((resolve) => {
        setTimeout(() => resolve(), 100);
      }).then(() => {
          //TODO You should return a promise that resolves with the value 1
        }
      ).then(result => {
        expect(result).to.equal(1);
        done();
      });
    });

  });

  describe('Custom promises', () => {
    class Custom {
      constructor(num) {
        this.num = num;
      }

      then(resolve) {
        setTimeout(() => resolve(this.num * 2), 100);
      }
    }
    it('Use a promise with custom object', (done) => {
      new Custom(2).then(res => {
        expect(__).to.equal(res);
        done();
      });
    });
  });

  describe('Promise.all', () => {
    const promise1 = () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(1), 100);
      })
      .then((result) => result);
    };
    const promise2 = () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(2), 100);
      })
      .then((result) => result);
    };
    const promise3 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Error')), 200);
      })
      .catch(() => 'error');
    };
    const promise4 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Error')), 100);
      });
    };

    it('Should return the result of the 2 promises in an array', (done) => {
      const queue = [promise1(), promise2()];
      Promise.all(queue)
      .then((result) => {
        expect([__, __]).deep.equal(result);
        done();
      });
    });

    it('What happens when a promise reject but is caught before getting to all when called with all?', (done) => {
      const queue = [promise1(), promise3()];
      Promise.all(queue)
      .then((result) => {
        expect([__, __]).deep.equal(result);
        done();
      });
    });
    it('What happens when a promise reject when called with all?', (done) => {
      const queue = [promise1(), promise4()];
      Promise.all(queue)
      .then((result) => {
        expect([__, __]).deep.equal(result);
        done();
      }).catch(
        (error) => {
          expect(__).to.equal(error.message);
          done();
        });
    });

    it('Use Promise.all', (done) => {
      const urls = [
        `${url}/Hackages`,
        `${url}/SomeDummyOrganisationThatDoesntExist`
      ];
      //TODO Use Promise.all to wrap the map
      urls.map(url => axios.get(url))
      .catch(({response:{status}}) =>{
        expect(404).equal(status);
        done();
      })
    });
  });

});
