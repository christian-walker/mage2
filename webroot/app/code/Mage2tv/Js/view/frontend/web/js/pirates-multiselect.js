define(['ko'], function (ko) {
    "use strict";

    return function (config) {
        const viewModel = {
            pirates: ko.observableArray([
                'Chris',
                'Karina',
                'Eric',
                'Tinkerbell',
                'Captain Hook',
                'Peter Pan',
                'Chesary'
            ]),
            chosenPirates: ko.observableArray(['Chris']),
            itemToAdd: ko.observable(""),
        };

        viewModel.addItem = function(){
            if(this.pirates.indexOf(this.itemToAdd()) > -1){
                console.log("Yes, this item exist");
                this.chosenPirates.push(this.itemToAdd())
            } else {
                this.pirates.push(this.itemToAdd());
            }
        }.bind(viewModel);

        viewModel.pirateList = ko.computed(function(){
            var newPirateList = [];
            newPirateList = this.chosenPirates();
            newPirateList.forEach(function (pirate) {
                return pirate + '\n';
            });
            return newPirateList.join('\n');

        }.bind(viewModel));

        return viewModel;

    }

});
