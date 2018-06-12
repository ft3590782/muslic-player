import React from 'react';
import storeHelper from '../util/storeHelper';

function runTest() {
  let testData1 = {
    name: 'jay',
    age: 18
  };
  let testData2 = 'hello';

  storeHelper.setLocalStore('test1', testData1);
  storeHelper.setLocalStore('test2', testData2);

  console.log(storeHelper.getLocalStore('test1'));
  console.log(storeHelper.getLocalStore('test2'));
}

class Test extends React.Component {
  render() {
    runTest();
    return (
      <ul>
        <li>test</li>
      </ul>
    );
  }
}

export default Test;
