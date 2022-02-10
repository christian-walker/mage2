define(['jquery', 'domReady!'], function ($) {
    "use strict";

    return function(config, element)
    {
        if ($(element).hasClass('osc-datepicker')){
            if($(element).val()){
                $("label[for='" + element.name + "']").addClass("animate-label");
            }

            $(element).focus(function() {
                let label = $("label[for='" + element.name + "']");

                if(!label.hasClass("animate-label")){
                    label.addClass("animate-label");
                }
            }).focusout(function() {
                if(!element.value){
                    $("label[for='" + element.name + "']").removeClass("animate-label");
                }
            });
        } else if ($(element).hasClass('input-text') || $(element).hasClass('select')){
            if($(element).val()){
                $("label[for='" + element.id + "']").addClass("animate-label");
            }

            $(element).focus(function() {
                let label = $("label[for='" + element.id + "']");

                if(!label.hasClass("animate-label")){
                    label.addClass("animate-label");
                }
            }).focusout(function() {
                if(!element.value){
                    $("label[for='" + element.id + "']").removeClass("animate-label");
                }
            });

        } else{
            let inputText = $(".input-text");

            for (var input in inputText){
                if(inputText[input].val()){
                    $("label[for='" + inputText[input].id + "']").addClass("animate-label");
                }
            }

            inputText.focus(function() {
                let label = $("label[for='" + this.id + "']");

                if(!label.hasClass('animate-label')){
                    label.addClass("animate-label");
                }
            }).focusout(function() {
                if(!this.value){
                    $("label[for='" + this.id + "']").removeClass("animate-label");
                }
            });
        }

    };

});
