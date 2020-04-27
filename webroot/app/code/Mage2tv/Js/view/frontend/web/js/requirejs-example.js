define(['jquery'],function($){
    'use strict';

    return function (config, element) {
        //console.log('I\'m a RequireJS AMD Module function test', config);
        console.log('The base url is ' + config.base_url);
        console.log(element);
    }
});
