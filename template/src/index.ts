import WebWorker from 'worker!./worker/worker.ts';
import { version } from '../package.json';

const dom = document.createElement('div');
dom.textContent = 'hello rollup ts project';

document.body.appendChild(dom);
dom.style.color = '#29ccac';

const worker = new WebWorker();
worker.postMessage('hello worker');

worker.onmessage = (e) => {
    console.log(e.data);
};

export { version };

export default {
    version,
};
