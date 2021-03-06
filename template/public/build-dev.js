
(function (){
    if (document.getElementById('reload-script')) return;
    const script = document.createElement('script');
    script.id = 'reload-script';
    script.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':8081/livereload.js?snipver=1';
    document.head.appendChild(script);
}());
(function () {
    'use strict';

    function createWorker(file) {
        var WebWorker = /** @class */ (function () {
            function WebWorker() {
                this._url = URL.createObjectURL(new Blob([file]));
                this._worker = new Worker(this._url);
            }
            WebWorker.prototype.addEventListener = function (type, listener) {
                this._worker.addEventListener(type, listener);
            };
            WebWorker.prototype.removeEventListener = function (type, listener) {
                this._worker.removeEventListener(type, listener);
            };
            WebWorker.prototype.terminate = function () {
                this._worker.terminate();
                URL.revokeObjectURL(this._url);
            };
            WebWorker.prototype.postMessage = function (message, options) {
                this._worker.postMessage(message, options);
            };
            Object.defineProperty(WebWorker.prototype, "onmessage", {
                get: function () {
                    return this._worker.onmessage;
                },
                set: function (listener) {
                    this._worker.onmessage = listener;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(WebWorker.prototype, "onerror", {
                get: function () {
                    return this._worker.onerror;
                },
                set: function (listener) {
                    this._worker.onerror = listener;
                },
                enumerable: false,
                configurable: true
            });
            return WebWorker;
        }());
        return WebWorker;
    }

    var WebWorker = createWorker(
    "(function () {\n    'use strict';\n\n    function add(a, b) {\n        return a + b;\n    }\n\n    onmessage = function (e) {\n        console.log('worker receive message: ', e.data);\n        postMessage(add(1, 3));\n    };\n\n}());\n"
    );

    var dom = document.createElement('div');
    dom.textContent = 'hello rollup ts project';
    document.body.appendChild(dom);
    dom.style.color = '#29ccac';
    var worker = new WebWorker();
    worker.postMessage('hello worker');
    worker.onmessage = function (e) {
        console.log(e.data);
    };

}());
//# sourceMappingURL=build-dev.js.map
