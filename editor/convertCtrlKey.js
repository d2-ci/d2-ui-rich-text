var state = {
    boldMode: false,
    italicMode: false,
    element: null
};

var markerMap = {
    italic: '_',
    bold: '*'
};

var toggleMode = function toggleMode(mode) {
    var prop = mode + 'Mode';

    state[prop] = !state[prop];
};

var insertMarkers = function insertMarkers(mode, cb) {
    toggleMode(mode);

    var marker = markerMap[mode] || null;
    if (!marker || !cb) {
        return;
    }

    var element = state.element;
    var selectionStart = element.selectionStart,
        selectionEnd = element.selectionEnd,
        value = element.value;

    var newValue = void 0;

    if (selectionStart >= 0 && selectionStart === selectionEnd) {
        var valueArr = value.split('');
        valueArr.splice(selectionStart, 0, marker);
        newValue = valueArr.join('');
    } else if (selectionStart >= 0) {
        newValue = [value.slice(0, selectionStart), value.slice(selectionStart, selectionEnd), value.slice(selectionEnd)].join(marker);

        toggleMode(mode);
    }

    cb(newValue);
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