define(['knockout', 'moment', 'webApiClient', 'validation'],
function (ko, moment, api) {

	"use strict";

	var outputVm = ko.validatedObservable({

    EntityName: "User",
    Url: "/User",
    Name: ko.observable().extend({required: true}),

    Full_Output: ko.observable(),
    Output_Format: ko.observable(),
    Continuous_Dataset: ko.observable(),
    Error_Label: {type:'float'},

    AmeriFlux: ko.observable(),
    GHG_Europe: ko.observable(),
    Biomet_Measurements: ko.observable(),
    Steady_State: ko.observable(),
    Metadata: ko.observable(),

    Spectral_Output_All: ko.observable(),
    Spectral_Output_All_Ogives: ko.observable(),
    Spectral_Output_Averaged_Spectra: ko.observable(),
    Spectral_Output_Averaged_Cospectra: ko.observable(),

    Spectral_Output_U: ko.observable(),
    Spectral_Output_V: ko.observable(),
    Spectral_Output_W: ko.observable(),
    Spectral_Output_TS: ko.observable(),
    Spectral_Output_CO2: ko.observable(),
    Spectral_Output_H20: ko.observable(),
    Spectral_Output_CH4: ko.observable(),
    Spectral_Output_4th_Gas: ko.observable(),

    Spectral_Output_WU: ko.observable(),
    Spectral_Output_WV: ko.observable(),
    Spectral_Output_WTS: ko.observable(),
    Spectral_Output_WC02: ko.observable(),
    Spectral_Output_WH20: ko.observable(),
    Spectral_Output_WCH4: ko.observable(),
    Spectral_Output_W4th_Gas: ko.observable(),

    Process_Stats_1: ko.observable(),
    Process_Stats_2: ko.observable(),
    Process_Stats_3: ko.observable(),
    Process_Stats_4: ko.observable(),
    Process_Stats_5: ko.observable(),
    Process_Stats_6: ko.observable(),
    Process_Stats_7: ko.observable(),

    Process_Time_1: ko.observable(),
    Process_Time_2: ko.observable(),
    Process_Time_3: ko.observable(),
    Process_Time_4: ko.observable(),
    Process_Time_5: ko.observable(),
    Process_Time_6: ko.observable(),
    Process_Time_7: ko.observable(),

    Process_Time_U: ko.observable(),
    Process_Time_V: ko.observable(),
    Process_Time_W: ko.observable(),
    Process_Time_TS: ko.observable(),
    Process_Time_CO2: ko.observable(),
    Process_Time_H20: ko.observable(),
    Process_Time_CH4: ko.observable(),
    Process_Time_4th: ko.observable(),
    Process_Time_T: ko.observable(),
    Process_Time_P: ko.observable(),

    SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.Name(objFromServer.Name);

      self.Full_Output(objFromServer.Full_Output);
      self.Output_Format(objFromServer.Output_Format);
      self.Continuous_Dataset(objFromServer.Continuous_Dataset);
      self.Error_Label(objFromServer.Error_Label);

      self.AmeriFlux(objFromServer.AmeriFlux);
      self.GHG_Europe(objFromServer.GHG_Europe);
      self.Biomet_Measurements(objFromServer.Biomet_Measurements);
      self.Steady_State(objFromServer.Steady_State);
      self.Metadata(objFromServer.Metadata);

      self.Spectral_Output_All(objFromServer.Spectral_Output_All);
      self.Spectral_Output_All_Ogives(objFromServer.Spectral_Output_All_Ogives);
      self.Spectral_Output_Averaged_Spectra(objFromServer.Spectral_Output_Averaged_Spectra);
      self.Spectral_Output_Averaged_Cospectra(objFromServer.Spectral_Output_Averaged_Cospectra);

      self.Spectral_Output_U(objFromServer.Spectral_Output_U);
      self.Spectral_Output_V(objFromServer.Spectral_Output_V);
      self.Spectral_Output_W(objFromServer.Spectral_Output_W);
      self.Spectral_Output_TS(objFromServer.Spectral_Output_TS);
      self.Spectral_Output_CO2(objFromServer.Spectral_Output_CO2);
      self.Spectral_Output_H20(objFromServer.Spectral_Output_H20);
      self.Spectral_Output_CH4(objFromServer.Spectral_Output_CH4);
      self.Spectral_Output_4th_Gas(objFromServer.Spectral_Output_4th_Gas);

      self.Spectral_Output_WU(objFromServer.Spectral_Output_WU);
      self.Spectral_Output_WV(objFromServer.Spectral_Output_WV);
      self.Spectral_Output_WTS(objFromServer.Spectral_Output_WTS);
      self.Spectral_Output_WC02(objFromServer.Spectral_Output_WC02);
      self.Spectral_Output_WH20(objFromServer.Spectral_Output_WH20);
      self.Spectral_Output_WCH4(objFromServer.Spectral_Output_WCH4);
      self.Spectral_Output_W4th_Gas(objFromServer.Spectral_Output_W4th_Gas);

      self.Process_Stats_1(objFromServer.Process_Stats_1);
      self.Process_Stats_2(objFromServer.Process_Stats_2);
      self.Process_Stats_3(objFromServer.Process_Stats_3);
      self.Process_Stats_4(objFromServer.Process_Stats_4);
      self.Process_Stats_5(objFromServer.Process_Stats_5);
      self.Process_Stats_6(objFromServer.Process_Stats_6);
      self.Process_Stats_7(objFromServer.Process_Stats_7);

      self.Process_Time_1(objFromServer.Process_Time_1);
      self.Process_Time_2(objFromServer.Process_Time_2);
      self.Process_Time_3(objFromServer.Process_Time_3);
      self.Process_Time_4(objFromServer.Process_Time_4);
      self.Process_Time_5(objFromServer.Process_Time_5);
      self.Process_Time_6(objFromServer.Process_Time_6);
      self.Process_Time_7(objFromServer.Process_Time_7);

      self.Process_Time_U(objFromServer.Process_Time_U);
      self.Process_Time_V(objFromServer.Process_Time_V);
      self.Process_Time_W(objFromServer.Process_Time_W);
      self.Process_Time_TS(objFromServer.Process_Time_TS);
      self.Process_Time_CO2(objFromServer.Process_Time_CO2);
      self.Process_Time_H20(objFromServer.Process_Time_H20);
      self.Process_Time_CH4(objFromServer.Process_Time_CH4);
      self.Process_Time_4th(objFromServer.Process_Time_4th);
      self.Process_Time_T(objFromServer.Process_Time_T);
      self.Process_Time_P(objFromServer.Process_Time_P);
    },

    GetEntityModel: function () {
      var self = this;

      var model= {
        Name : self.Name(),

        Full_Output:self.Full_Output(),
        Output_Format: self.Output_Format(),
        Continuous_Dataset:self.Continuous_Dataset(),
        Error_Label: self.Error_Label(),

        AmeriFlux:self.AmeriFlux(),
        GHG_Europe:self.GHG_Europe(),
        Biomet_Measurements:self.Biomet_Measurements(),
        Steady_State:self.Steady_State(),
        Metadata:self.Metadata(),

        Spectral_Output_All:self.Spectral_Output_All(),
        Spectral_Output_All_Ogives:self.Spectral_Output_All_Ogives(),
        Spectral_Output_Averaged_Spectra:self.Spectral_Output_Averaged_Spectra(),
        Spectral_Output_Averaged_Cospectra:self.Spectral_Output_Averaged_Cospectra(),

        Spectral_Output_U:self.Spectral_Output_U(),
        Spectral_Output_V:self.Spectral_Output_V(),
        Spectral_Output_W:self.Spectral_Output_W(),
        Spectral_Output_TS:self.Spectral_Output_TS(),
        Spectral_Output_CO2:self.Spectral_Output_CO2(),
        Spectral_Output_H20:self.Spectral_Output_H20(),
        Spectral_Output_CH4:self.Spectral_Output_CH4(),
        Spectral_Output_4th_Gas:self.Spectral_Output_4th_Gas(),

        Spectral_Output_WU:self.Spectral_Output_WU(),
        Spectral_Output_WV:self.Spectral_Output_WV(),
        Spectral_Output_WTS:self.Spectral_Output_WTS(),
        Spectral_Output_WC02:self.Spectral_Output_WC02(),
        Spectral_Output_WH20:self.Spectral_Output_WH20(),
        Spectral_Output_WCH4:self.Spectral_Output_WCH4(),
        Spectral_Output_W4th_Gas:self.Spectral_Output_W4th_Gas(),

        Process_Stats_1:self.Process_Stats_1(),
        Process_Stats_2:self.Process_Stats_2(),
        Process_Stats_3:self.Process_Stats_3(),
        Process_Stats_4:self.Process_Stats_4(),
        Process_Stats_5:self.Process_Stats_5(),
        Process_Stats_6:self.Process_Stats_6(),
        Process_Stats_7:self.Process_Stats_7(),

        Process_Time_1:self.Process_Time_1(),
        Process_Time_2:self.Process_Time_2(),
        Process_Time_3:self.Process_Time_3(),
        Process_Time_4:self.Process_Time_4(),
        Process_Time_5:self.Process_Time_5(),
        Process_Time_6:self.Process_Time_6(),
        Process_Time_7:self.Process_Time_7(),

        Process_Time_U:self.Process_Time_U(),
        Process_Time_V:self.Process_Time_V(),
        Process_Time_W:self.Process_Time_W(),
        Process_Time_TS:self.Process_Time_TS(),
        Process_Time_CO2:self.Process_Time_CO2(),
        Process_Time_H20:self.Process_Time_H20(),
        Process_Time_CH4:self.Process_Time_CH4(),
        Process_Time_4th:self.Process_Time_4th(),
        Process_Time_T:self.Process_Time_T(),
        Process_Time_P:self.Process_Time_P()
      };

      return model;
    },

    SetMinimal: function() {
      var self=this;
      self.Full_Output(true);
      self.Continuous_Dataset(false);
      self.AmeriFlux(false);
      self.GHG_Europe(false);
      self.Biomet_Measurements(false);
      self.Steady_State(false);
      self.Metadata(true);
      self.Spectral_Output_All(true);
      self.Spectral_Output_All_Ogives(false);
      self.Spectral_Output_Averaged_Spectra(false);
      self.Spectral_Output_Averaged_Cospectra(false);
      self.Spectral_Output_U(false);
      self.Spectral_Output_V(false);
      self.Spectral_Output_W(false);
      self.Spectral_Output_TS(false);
      self.Spectral_Output_CO2(false);
      self.Spectral_Output_H20(false);
      self.Spectral_Output_CH4(false);
      self.Spectral_Output_4th_Gas(false);
      self.Spectral_Output_WU(false);
      self.Spectral_Output_WV(false);
      self.Spectral_Output_WTS(true);
      self.Spectral_Output_WC02(false);
      self.Spectral_Output_WH20(false);
      self.Spectral_Output_WCH4(false);
      self.Spectral_Output_W4th_Gas(false);
      self.Process_Stats_1(true);
      self.Process_Stats_2(false);
      self.Process_Stats_3(false);
      self.Process_Stats_4(false);
      self.Process_Stats_5(false);
      self.Process_Stats_6(false);
      self.Process_Stats_7(false);
      self.Process_Time_1(false);
      self.Process_Time_2(false);
      self.Process_Time_3(false);
      self.Process_Time_4(false);
      self.Process_Time_5(false);
      self.Process_Time_6(false);
      self.Process_Time_7(false);
      self.Process_Time_U(false);
      self.Process_Time_V(false);
      self.Process_Time_W(false);
      self.Process_Time_TS(false);
      self.Process_Time_CO2(false);
      self.Process_Time_H20(false);
      self.Process_Time_CH4(false);
      self.Process_Time_4th(false);
      self.Process_Time_T(false);
      self.Process_Time_P(false);
    },
    SetTypical: function() {
      var self=this;
      self.Full_Output(true);
      self.Continuous_Dataset(true);
      self.AmeriFlux(false);
      self.GHG_Europe(false);
      self.Biomet_Measurements(true);
      self.Steady_State(false);
      self.Metadata(true);
      self.Spectral_Output_All(true);
      self.Spectral_Output_All_Ogives(true);
      self.Spectral_Output_Averaged_Spectra(true);
      self.Spectral_Output_Averaged_Cospectra(true);
      self.Spectral_Output_U(false);
      self.Spectral_Output_V(false);
      self.Spectral_Output_W(false);
      self.Spectral_Output_TS(false);
      self.Spectral_Output_CO2(false);
      self.Spectral_Output_H20(false);
      self.Spectral_Output_CH4(false);
      self.Spectral_Output_4th_Gas(false);
      self.Spectral_Output_WU(false);
      self.Spectral_Output_WV(false);
      self.Spectral_Output_WTS(true);
      self.Spectral_Output_WC02(false);
      self.Spectral_Output_WH20(false);
      self.Spectral_Output_WCH4(false);
      self.Spectral_Output_W4th_Gas(false);
      self.Process_Stats_1(true);
      self.Process_Stats_2(true);
      self.Process_Stats_3(true);
      self.Process_Stats_4(true);
      self.Process_Stats_5(true);
      self.Process_Stats_6(true);
      self.Process_Stats_7(true);
      self.Process_Time_1(false);
      self.Process_Time_2(false);
      self.Process_Time_3(false);
      self.Process_Time_4(false);
      self.Process_Time_5(false);
      self.Process_Time_6(false);
      self.Process_Time_7(false);
      self.Process_Time_U(false);
      self.Process_Time_V(false);
      self.Process_Time_W(false);
      self.Process_Time_TS(false);
      self.Process_Time_CO2(false);
      self.Process_Time_H20(false);
      self.Process_Time_CH4(false);
      self.Process_Time_4th(false);
      self.Process_Time_T(false);
      self.Process_Time_P(false);
    },
    SetThorough: function() {
      var self=this;

      self.Full_Output(true);
      self.Continuous_Dataset(true);
      self.AmeriFlux(true);
      self.GHG_Europe(true);
      self.Biomet_Measurements(true);
      self.Steady_State(true);
      self.Metadata(true);
      self.Spectral_Output_All(true);
      self.Spectral_Output_All_Ogives(true);
      self.Spectral_Output_Averaged_Spectra(true);
      self.Spectral_Output_Averaged_Cospectra(true);
      self.Spectral_Output_U(false);
      self.Spectral_Output_V(false);
      self.Spectral_Output_W(false);
      self.Spectral_Output_TS(false);
      self.Spectral_Output_CO2(false);
      self.Spectral_Output_H20(false);
      self.Spectral_Output_CH4(false);
      self.Spectral_Output_4th_Gas(false);
      self.Spectral_Output_WU(false);
      self.Spectral_Output_WV(false);
      self.Spectral_Output_WTS(true);
      self.Spectral_Output_WC02(false);
      self.Spectral_Output_WH20(false);
      self.Spectral_Output_WCH4(false);
      self.Spectral_Output_W4th_Gas(false);
      self.Process_Stats_1(true);
      self.Process_Stats_2(true);
      self.Process_Stats_3(true);
      self.Process_Stats_4(true);
      self.Process_Stats_5(true);
      self.Process_Stats_6(true);
      self.Process_Stats_7(true);
      self.Process_Time_1(false);
      self.Process_Time_2(false);
      self.Process_Time_3(false);
      self.Process_Time_4(false);
      self.Process_Time_5(false);
      self.Process_Time_6(false);
      self.Process_Time_7(false);
      self.Process_Time_U(false);
      self.Process_Time_V(false);
      self.Process_Time_W(false);
      self.Process_Time_TS(false);
      self.Process_Time_CO2(false);
      self.Process_Time_H20(false);
      self.Process_Time_CH4(false);
      self.Process_Time_4th(false);
      self.Process_Time_T(false);
      self.Process_Time_P(false);
    },

		Panels: []

  });

	return outputVm;
});

