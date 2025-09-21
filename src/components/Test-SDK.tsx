import { useEffect } from 'react';
import { PrintControl } from 'sdk-v1';

const printControl = new PrintControl();

export default function TestSDK() {
  console.log(printControl);
  useEffect(() => {
    console.log('프린트 테스트 대기');

    setTimeout(() => {
      console.log('프린트 테스트 시작');

      printControl.toPrint('#root');
    }, 3000);
  }, []);

  return <div>Test-SDK</div>;
}
