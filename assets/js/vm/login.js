define(['knockout', 'webApiClient', 'messageBox'],
    function (ko, webApiClient, messageBox) {

    "use strict";

    var loginPageViewModel = ko.validatedObservable({
        Email: ko.observable('').extend({ required: true }),
        Password: ko.observable('').extend({ required: true }),
        redirectUrl: "",
        Submit: function () {
            var self = this;
            messageBox.Hide();
            if (!this.isValid()) {
                messageBox.ShowError("Please correct the following:");
                this.errors.showAllMessages();
            } else {
                webApiClient.ajaxPost("/User/login", ko.toJSON(this), null, function (response) {
                    if (response) {
                      location.href = "/page/dashboard";
                    }
                }, function (errorResponse) { messageBox.ShowError("Login Failed: Incorrect details provided"); });
            }
        }
    });

    return loginPageViewModel;
});
