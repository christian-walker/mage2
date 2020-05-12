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
            if(this.pirates.indexOf(this.itemToAdd()) > -1){
                console.log("Yes, this item exist");
                this.chosenPirates.push(this.itemToAdd())
            } else {
                this.pirates.push(this.itemToAdd());
            }
        }.bind(viewModel);

        viewModel.resetChosen = function(){
            let newChosen = [];

            newChosen = $('.textarea').val().split('\n');
            for (let i = 0; i < newChosen.length; i++){
                this.arrayOfLines.push(newChosen[i]);
            }

            let deletedPirates = _.filter(this.chosenPirates(), function (currentItem) {
                if(!this.arrayOfLines().includes(currentItem)){
                    return currentItem;
                }

            }.bind(viewModel));

            return this.chosenPirates().pop(deletedPirates);

        }.bind(viewModel);

        viewModel.pirateList = ko.computed(function(){
            let newPirateList = [];
            newPirateList = this.chosenPirates();
            newPirateList.forEach(function (pirate) {
                return pirate + '\n';
            });
            return newPirateList.join('\n');

        }.bind(viewModel));

        viewModel.listPirates = ko.computed(function () {
            _.each(this.pirates(), function (element, key, list) {
                console.log(element, key, list);
            });
        }.bind(viewModel));

        return viewModel;

    }

});
