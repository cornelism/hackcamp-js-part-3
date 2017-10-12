import {expect} from 'chai';
import axios from 'axios';

const url = 'http://35.176.79.9:3756/orgs';
//Documentation for Async functions :
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

describe('Async await', () => {
  describe('Basic async await', () => {
    it('Should display Resolved', (done) => {
      //TODO Fix this function in order to make the test pass with async/await
      function func() {
        const prom = () => new Promise((resolve) => {
          setTimeout(() => resolve('Resolved'), 100);
        });
        const res = prom();
        expect(res).to.equal('Resolved');
        done();
      }

      func();
    });

    it('Make this code work with async/await', (done) => {
      const organisationName = 'Hackages';
      let organisation = axios.get(`${url}/${organisationName}`);
      expect(organisation.email).to.equal('007@hackages.io');
      done();
    });

    it('Add results of async actions', (done) => {
      const prom1 = () => new Promise((resolve) => {
        setTimeout(() => resolve(2), 200);
      });
      const prom2 = () => new Promise((resolve) => {
        setTimeout(() => resolve(2), 200);
      });

      function addResultOfPromises(promise1, promise2){
        //TODO write code that will wait until both promises (written above) resolve and then sum their result
        const res = null;
        expect(res).to.equal(4);
        done();
      }
      addResultOfPromises(prom1, prom2);
    });
  });
});

