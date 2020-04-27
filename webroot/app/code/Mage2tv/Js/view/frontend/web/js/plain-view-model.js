define(['jquery','ko'], function($, ko){
    'use stgrict';

    return function(config) {
        // const title = ko.observable('This is a very fine title for a simple but good view model');
        // title.subscribe(function (newValue) {
        //     console.log('Change to', newValue)
        // });
        // title.subscribe(function (oldValue) {
        //     console.log('Will be changed from', oldValue)
        // }, this, 'beforeChange');
        //
        // return {
        //     title: title
        //
        // }

        // let currencyInfo = ko.observable();
        // $.getJSON(config.base_url + '/rest/V1/directory/currency', currencyInfo);
        //
        // const viewModel = {
        //     //firstName: ko.observable("Chris"),
        //     //lastName: ko.observable("Walker"),
        //     label: ko.observable('Currency Info')
        // };
        //
        // viewModel.output = ko.computed(function () {
        //     //return this.firstName() + " " + this.lastName();
        //     if(currencyInfo()){
        //         return this.label() + ':\n' + JSON.stringify(currencyInfo(), null, 2);
        //     }
        //     return '...loading';
        //
        // }.bind(viewModel));

        const viewModel = ko.track({
            exchange_rates: [
                {
                    currency_to: 'USD',
                    rate: 1.0,
                },
                {
                    currency_to: 'EUR',
                    rate: 0.83
                },
                {
                    currency_to: 'NZD',
                    rate: 1.43
                }
            ]
        });

        ko.getObservable(viewModel,'exchange_rates').subscribe(function (newValue) {
            console.log('The new value changed to: ', newValue);
        });


        return viewModel;
    }
});
