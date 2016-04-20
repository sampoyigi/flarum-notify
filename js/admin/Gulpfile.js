var gulp = require('flarum-gulp');

gulp({
    modules: {
        'moay/flarum-notify': [
            'src/**/*.js'
        ]
    }
});
