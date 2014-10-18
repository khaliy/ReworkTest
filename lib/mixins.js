module.exports = {
    hidden: function (type) {
        switch (type) {
            case 'full':
                return {
                    'display': 'none'
                };
            case 'offscreen':
                return {
                    'position' : 'absolute',
                    'left' : '-10000px',
                    'top' : 'auto',
                    'width' : '1px',
                    'height' : '1px',
                    'overflow' : 'hidden'
                };
            default:
                return type;
        }
    }
};