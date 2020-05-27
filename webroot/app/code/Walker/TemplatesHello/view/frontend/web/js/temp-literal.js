define([
    "jquery",
    "mage/utils/template",
    "text!Walker_TemplatesHello/template/template-literal-hello-world.html",
        "jquery-ui-modules/widget",
    ]
, function ($, t, templateString) {

    $.widget('walker.tempLits', {

        _create: function () {

            const config = this.config;
            const element = this.element;

            var foo = {
                name: "Jack",
                fullname: "${$.name} ${$.$data.lastname}"
            };

            var bar = {
                lastname: "Sparrow"
            };

            var compiled = t.template(foo, bar);

            //console.log('My Walker widget has been created ' + element);

            console.log(compiled);
        }
    });

    return $.walker.tempLits;

});
