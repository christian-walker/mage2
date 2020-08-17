define(['jquery','ko','underscore'], function ($, ko, _) {
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
            chosenPirates: ko.observableArray(),
            itemToAdd: ko.observable(""),
            arrayOfLines: ko.observableArray()
        };

        viewModel.addItem = function(){
            if(this.pirates().includes(this.itemToAdd())){
                this.chosenPirates.push(this.itemToAdd())
            } else {
                this.pirates.push(this.itemToAdd());
            }
        }.bind(viewModel);

        viewModel.resetChosen = function(){
            let newChosen = [];
            let deletedPirates = [];

            // Adds each element to newChosen Array;
            newChosen = $('.textarea').val().split('\n');

            // Filters through the old list of pirates, if item is missing add to deletedPirates array;
            deletedPirates = _.filter(this.chosenPirates(), function (currentItem) {
                if(!newChosen.includes(currentItem)){
                    return deletedPirates.push(currentItem);
                }

            }.bind(viewModel));

            // Loops through deletedPirates array and finds each element's position in the chosenPirates array, then
            // removes items from chosenPirates

            _.each(deletedPirates, function (element) {
                let piratePosition = this.chosenPirates().indexOf(element);

                return this.chosenPirates.splice(piratePosition, 1);

            }.bind(viewModel));

        }.bind(viewModel);

        viewModel.pirateList = ko.computed(function(){
            let newPirateList = [];
            newPirateList = this.chosenPirates();
            newPirateList.forEach(function (pirate) {
                return pirate + '\n';
            });
            return newPirateList.join('\n');

        }.bind(viewModel));

        return viewModel;

    }

});
