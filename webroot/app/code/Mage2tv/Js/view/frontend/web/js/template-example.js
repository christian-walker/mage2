define(['underscore', 'text!Mage2tv_Js/template/test.html'], function (_, templateString) {
    "use strict";

    return function (config, element) {
        let pirates = {
                rows: [
                    {name: 'Jack', lastname: 'Sparrow'},
                    {name: 'Hecto', lastname: 'Barbossa'},
                    {name: 'Joshamee', lastname: 'Gibbs'}
                ]
            },
            compiled = _.template(templateString);


            console.log(compiled(pirates));
            // compiled is now a function that passes data through as a parameter and uses the template

            element.innerHTML = compiled(pirates);
    }

});
