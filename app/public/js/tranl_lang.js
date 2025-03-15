function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'fr',
        includedLanguages: 'en,zh-CN,ar,es,de,hi',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

function translatePage() {
    var lang = document.getElementById('google_translate_select').value;

    //LOAD TRANSL-LANG
    if (!window.google || !window.google.translate) {
        var script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
    }

    // Trigger Google Translate
    setTimeout(function() {
        var frame = document.querySelector('iframe.goog-te-menu-frame');
        if (frame) {
            frame.contentWindow.document.querySelector('select').value = lang;
            frame.contentWindow.document.querySelector('select').dispatchEvent(new Event('change'));
        } else {
            window.location.href = 'https://translate.google.com/translate?hl=' + lang + '&sl=fr&tl=' + lang + '&u=' + encodeURIComponent(window.location.href);
        }
    }, 200); 
}
