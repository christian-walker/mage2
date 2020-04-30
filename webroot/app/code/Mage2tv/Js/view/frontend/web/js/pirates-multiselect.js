define(['jquery','ko'], function ($, ko) {
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
            if(this.pirates.indexOf(this.itemToAdd()) > -1){
                console.log("Yes, this item exist");
                this.chosenPirates.push(this.itemToAdd())
            } else {
                this.pirates.push(this.itemToAdd());
            }
        }.bind(viewModel);

        viewModel.resetChosen = function(){
            let newChosen = [];
            let deletedPirates = [];

            newChosen = $('.textarea').val().split('\n');
            for (let i = 0; i < newShit.length; i++){
                this.arrayOfLines.push(newShit[i]);
            }

            deletedPirates = this.chosenPirates().filter(function (currentItem) {
                return !this.arrayOfLines().includes(currentItem);
            }.bind(viewModel));

            return this.chosenPirates.pop(deletedPirates);

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
