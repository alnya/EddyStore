define(['knockout', 'knockout.validation'], function (ko) {
    
    ko.validation.init({
        errorElementClass: 'has-error',
        errorMessageClass: 'help-block',
        decorateElement: true
    });

    return function() {

    };
});