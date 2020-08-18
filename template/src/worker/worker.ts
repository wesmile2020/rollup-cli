import { add } from './utils';

onmessage = (e) => {
    console.log('worker receive message: ', e.data);
    postMessage(add(1, 3));
};
