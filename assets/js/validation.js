define(['knockout'], function (ko) {

    ko.validation.rules['nullableInt'] = {
        validator: function (val, validate) {
            return val === null || val === "" || (validate && /^-?\d*$/.test(val));
        },
        message: 'Must be an integer value.'
    };

    ko.validation.rules['lessThanEqualTo'] = {
        validator: function (val, otherVal) {

            return parseInt(val) <= parseInt(otherVal);
        },
        message: 'This field must be less or equal to {0}.'
    };

    ko.validation.rules['greaterThan'] = {
        validator: function (val, otherVal) {

            return parseInt(val) > parseInt(otherVal);
        },
        message: 'This field must be greater than {0}.'
    };

    ko.validation.rules['notZero'] = {
        validator: function (val) {

            return parseInt(val) != 0;
        },
        message: 'This field must not be 0.'
    };

    ko.validation.rules['passwordConfirm'] = {
        validator: function (confirm, password) {

            return confirm === password;
        },
        message: 'Must be the same as password.'
    };

    ko.validation.rules['greaterThanToday'] = {
        validator: function (val) {

            if (ko.validation.utils.isEmptyVal(val))
                return true;

            var tomorrow = moment().add(1, 'days').format("YYYY-MM-DD");
            var selectedDate = moment(val).format("YYYY-MM-DD");
                
            return selectedDate >= tomorrow;
        },
        message: 'Date must be greater than today.'
    };

    ko.validation.registerExtenders();
});