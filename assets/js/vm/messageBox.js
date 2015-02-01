define(['knockout', 'jquery'], function (ko, $) {

    var messageBoxViewModel = {
        Icon: ko.observable(''),
        Message: ko.observable(''),
        Type: ko.observable('hidden'),

        ShowSuccess: function(message) {
            this.Type("alert-success");
            this.Icon("glyphicon-ok");
            this.Message(message);
        },
        ShowError: function(message) {
            this.Type("alert-danger");
            this.Icon("glyphicon-remove");
            this.Message(message);
        },
        Hide: function() {
            this.Type("hidden");
        }
    };

    ko.applyBindings(messageBoxViewModel, $("#messageBox")[0]);
    return messageBoxViewModel;
});