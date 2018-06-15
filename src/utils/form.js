import 'jquery/dist/jquery.js'
import 'block-ui/jquery.blockUI.js'
import $ from 'jquery';

export function blockUI() {
    $.blockUI({
        message: '<img src="../assets/img/loading.gif" alt="Wait...">',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: 'transparent',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: 0.5,
            color: '#fff',
            'z-index': 9999999999999999
        },
        overlayCSS: {
            backgroundColor: '#000',
            opacity: 0.6,
            cursor: 'wait',
            'z-index': 9999999999999999
        }
    })
}

export function unBlockUI() {
    $.unblockUI()
}

