define(['jquery', 'underscore', 'text!Walker_Underscore/template/helloworld-temp.html'], function ($, _, templateString) {
    "use strict";

    $.widget('walker.hello', {

        options: {
            template: templateString
        },

        _init: function (){
            var _self = this;

            this.logtest();
        },

        logtest: function () {
            var self = this,
                source = self.options.template,
                template = _.template(templateString),
                artists = {
                    musicians: [
                        {name: "John Legend"},
                        {name: "Beyonce"},
                        {name: "Drake"}
                    ]
                },
                html;

            html = template(artists);

            //console.log(html);

            $("#musician").append(html);

            // $.each(this.options.musicians, function (key, value) {
            //     html = template({key: key, value: value});
            //     console.log(html);
            //     $('#musician').append(html);
            // });

        },


    });

    return $.walker.hello;

});
