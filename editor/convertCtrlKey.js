var state = {
    boldMode: false,
    italicMode: false,
    element: null
};

var markerMap = {
    italic: '_',
    bold: '*'
};

var trim = function trim(str) {
    var leftSpaces = /^\s+/;
    var rightSpaces = /\s+$/;

    return str.replace(leftSpaces, '').replace(rightSpaces, '');
};

var toggleMode = function toggleMode(mode) {
    var prop = mode + 'Mode';

    state[prop] = !state[prop];
};

var insertMarkers = function insertMarkers(mode, cb) {
    var _state$element = state.element,
        start = _state$element.selectionStart,
        end = _state$element.selectionEnd,
        value = _state$element.value;

    var marker = markerMap[mode] || null;
    if (!marker || !cb || start < 0) {
        return;
    }

    toggleMode(mode);

    var newValue = void 0;
    var caretPos = end + 1;

    var padMarkers = function padMarkers(text) {
        if (value.length && start > 0 && value[start - 1] !== ' ') {
            text = ' ' + text;
            ++caretPos;
        }

        if (value.length && end !== value.length && value[end] !== ' ') {
            text = text + ' ';
        }

        return text;
    };

    if (start === end) {
        //no text
        var valueArr = value.split('');

        valueArr.splice(start, 0, padMarkers('' + marker + marker));
        newValue = valueArr.join('');
    } else {
        var text = value.slice(start, end);
        var trimmedText = trim(text);

        // adjust caretPos based on trimmed text selection
        caretPos = caretPos - (text.length - trimmedText.length) + 1;

        newValue = [value.slice(0, start), padMarkers('' + marker + trimmedText + marker), value.slice(end)].join('');

        toggleMode(mode);
    }

    cb(newValue, caretPos);
};

var convertCtrlKey = function convertCtrlKey(event, cb) {
    var key = event.key,
        ctrlKey = event.ctrlKey,
        metaKey = event.metaKey;


    var element = event.target;

    state.element = element;

    if (key === "b" && (ctrlKey || metaKey)) {
        insertMarkers("bold", cb);
    } else if (key === "i" && (ctrlKey || metaKey)) {
        insertMarkers("italic", cb);
    }
};

export default convertCtrlKey;