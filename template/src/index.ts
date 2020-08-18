import WebWorker from 'worker!./worker/worker.ts';

const dom = document.createElement('div');
dom.textContent = 'hello rollup ts project';

document.body.appendChild(dom);
dom.style.color = '#29ccac';

const worker = new WebWorker();
worker.postMessage('hello worker');

worker.onmessage = (e) => {
    console.log(e.data);
};
