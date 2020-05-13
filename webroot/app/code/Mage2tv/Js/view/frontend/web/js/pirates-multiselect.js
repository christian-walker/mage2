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
            arrayOfLines: ko.observableArray(),
            deletedPirates: ko.observableArray()
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

            this.deletedPirates = this.chosenPirates().filter(function (currentItem) {
                if(!this.arrayOfLines().includes(currentItem)){
                    return this.deletedPirates.push(currentItem);
                }
            }.bind(viewModel));

            for (var i = 0; i < this.deletedPirates.length; i++){
                let deletedItem = this.chosenPirates.indexOf(this.deletedPirates[i]);
                if (text > -1){
                    this.chosenPirates.splice(deletedItem, 1);
                }
            }



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
