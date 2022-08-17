let libdocCodeMirror = {
    elements: {
        code: document.getElementById('libdoc-codemirror-code'),
        result: document.getElementById('libdoc-page-codemirror-result'),
        external_link: document.getElementById('libdoc-codemirror-external-link'),
        run_code: document.getElementById('libdoc-codemirror-run-code')
    },
    isJson(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return false;
        }
    },
    isBase64(str) {
        try {
            return atob(str);
        } catch (e) {
            return false;
        }
    },
    run: function() {
        const sentObject = {
            options: {
                title: ''
            },
            content: this.instance.getValue()
        }
        // Stringify the object to send
        const stringifiedSentObject = JSON.stringify(sentObject);
        // Set to base64
        const sentObject64 = btoa(stringifiedSentObject);
        // Iframe playground URL
        const iframeUrl = `${site.url}${site.baseurl}/assets/libdoc/playground.html#${sentObject64}`;
        // Build the iframe HTML string
        const iframeMarkup = `<iframe src="${iframeUrl}" class="u-transition-none u-absolute u-h-100 u-b-none u-w-100"></iframe>`;
        this.elements.result.innerHTML = iframeMarkup;
        this.elements.external_link.href = iframeUrl;
        libdocCodeMirror.elements.run_code.classList.add('disabled');
        // location.hash = sentObject64;
        // console.log('?html='+sentObject64);
    },
    update: function() {
        if (typeof CodeMirror == 'function' && libdocCodeMirror.elements.code !== null) {
            let hash = location.hash.replace('#', '');
            if (hash != '') {
                if (libdocCodeMirror.isBase64(hash)) {
                    // console.log('is base64');
                    const stringifiedSentObject = atob(hash);
                    // console.log(stringifiedSentObject);
                    if (libdocCodeMirror.isJson(stringifiedSentObject)) {
                        // console.log('is JSON');
                        const sentObject = JSON.parse(stringifiedSentObject);
                        libdoc_codemirror_default_value = sentObject.content;
                        console.log('code detected in hash');
                    }
                }
            }
            libdocCodeMirror.instance = CodeMirror(libdocCodeMirror.elements.code, {
                value: libdoc_codemirror_default_value,
                mode:  'htmlmixed',
                theme: 'material',
                lineNumbers: true,
                // tabSize: 4,
                autoCloseTags: true
            });
            libdocCodeMirror.run();
            libdocCodeMirror.elements.run_code.classList.add('disabled');
            libdocCodeMirror.instance.on('change', function() {
                libdocCodeMirror.elements.run_code.classList.remove('disabled');
            });
        }
    }
}

// Check if the DOMContentLoaded has already been completed
if (document.readyState !== 'loading') {
    libdocCodeMirror.update();
} else {
    document.addEventListener('DOMContentLoaded', libdocCodeMirror.update);
}