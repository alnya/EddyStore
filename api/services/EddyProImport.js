module.exports = {

  importMetaData: function(file, user) {
    var metadata = {
      Name: 'Unknown',
      User: user,
      Instruments: [],
      Columns: []
    };

    EddyProImport.importFile(file, metadata);
    console.log(metadata);
    Data.create(metadata).then(function(data) {
      data.save();
    });
  },

  importProject: function(file, user) {
    var importDate = new Date();
    var importName = 'Imported ' + importDate.toString();

    var project = {
      Name: importName,
      User: user,
      SpectralCorrection: {Name: importName, User: user},
      ProcessingOption: {Name: importName, User: user},
      StatisticalAnalysis: {Name: importName, User: user},
      Output: {Name: importName, User: user}
    };

    EddyProImport.importFile(file, project);
    console.log(project);
    Report.create(project).then(function(report) {
      report.save();
    });
  },

  importFile: function(file, object) {
    var docLines = file.split("\n");
    console.log("Processing " + docLines.length + " lines");

    var currentSection = "";
    var itemNumber = 0;
    for (i = 0; i < docLines.length; i++) {
      var line = docLines[i];
      if (line.indexOf("[") === 0) {
        currentSection = line.replace("[","").replace("]","");
        itemNumber = 0;

        console.log("Processing " + currentSection);
      } else if (line.indexOf("=") > -1) {
        var keyValue = line.split("=");
        var re = /_(\d)_(.*)/i;
        var found = re.exec(keyValue[0]);
        if (found) {
          itemNumber = parseInt(found[1]);
          keyValue[0] = found[2];
        }

        EddyProImport.setValue(currentSection, object, keyValue[0], keyValue[1], itemNumber);
      }
    }
  },
  setValue: function(section, object, key, value, itemNumber) {

    var formatValue = function(value, format, defaultValue) {
      if (!value) {
        return defaultValue;
      }

      switch(format) {
        case "bool":
          return parseInt(value) == 1;
      }

      return value;
    };

    value = value.replace(/(\r\n|\n|\r)/gm,"");

    switch(section.toLowerCase().trim()) {
      case "project":
      {
        switch (key) {
          case "creation_date": object.createdAt = formatValue(value); break;
          case "last_change_date": object.updatedAt = formatValue(value); break;
          case "start_date": object.Date_From = formatValue(value); break;
          case "end_date": object.Date_To = formatValue(value); break;
          case "project_title": object.Name = formatValue(value); break;
          case "err_label": object.Error_Label = formatValue(value); break;
          case "out_mean_cosp": object.Spectral_Output_Averaged_Cospectra = formatValue(value, "bool"); break;
          case "file_name": object.Name = formatValue(value); break;
          case "foot_meth": object.ProcessingOption.Footprint_Method = EddyProImport.getLookupValue(key, value); break;

        }
        break;
      }
      case "files":
      {
        break;
      }
      case "site":
      {
        switch (key) {
          case "altitude":object.Altitude = formatValue(value);
            break;
          case "latitude":object.Latitude = formatValue(value);
            break;
          case "longitude":object.Longitude = formatValue(value);
            break;
          case "canopy_height":object.Canopy_Height = formatValue(value);
            break;
        }
        break;
      }
      case "station":
      {
        switch (key) {
          case "station_name":
            if (value) {
              object.Name = formatValue(value);
            }
            break;
        }
        break;
      }
      case "timing":
      {
        switch (key) {
          case "acquisition_frequency": object.Acquisition_Frequency = formatValue(value);
            break;
          case "file_duration":object.File_Duration = formatValue(value);
            break;
        }
        break;
      }
      case "instruments":
      {
        if (itemNumber > object.Instruments.length) {
          object.Instruments.push({Instrument_Type: 'Anemometer'});
        }
        var instrument = object.Instruments[object.Instruments.length - 1];

        switch (key) {
          case "manufacturer":
            instrument.Manufacturer = formatValue(value);
            break;
          case "model":
            instrument.Altitude = formatValue(value);
            break;
          case "sw_version":
            instrument.Software_Version = formatValue(value);
            instrument.Instrument_Type = 'Gas';
            break;
          case "id":
            instrument.Instrument_Id = formatValue(value);
            break;
          case "height":
            instrument.Height = formatValue(value);
            break;
          case "wformat":
            instrument.Wind_Data_Format = formatValue(value);
            break;
          case "north_offset":
            instrument.North_Offset = formatValue(value);
            break;
          case "northward_separation":
            instrument.Northward_Separation = formatValue(value);
            break;
          case "eastward_separation":
            instrument.Eastward_Separation = formatValue(value);
            break;
          case "vertical_separation":
            instrument.Vertical_Separation = formatValue(value);
            break;
          case "vpath_length":
            instrument.Longitudinal_Path_Length = formatValue(value);
            break;
          case "hpath_length":
            instrument.Transversal_Path_Length = formatValue(value);
            break;
          case "tau":
            instrument.Time_Response = formatValue(value);
            break;
          case "tube_length":
            instrument.Tube_Length = formatValue(value);
            break;
          case "tube_diameter":
            instrument.Tube_Inner_Diameter = formatValue(value);
            break;
          case "tube_flowrate":
            instrument.Nominal_Tube_Flow_Rate = formatValue(value);
            break;
          case "kw":
            instrument.Extinction_Coefficient_In_Water_KW = formatValue(value);
            break;
          case "ko":
            instrument.Extinction_Coefficient_In_Water_KO = formatValue(value);
            break;
        }
        break;
      }
      case "filedescription":
      {
        if (itemNumber > object.Columns.length) {
          object.Columns.push({});
        }
        var column = object.Columns[object.Columns.length - 1];

        switch (key) {
          case "variable":
            column.Numeric = formatValue(value);
            break;
          case "instrument":
            column.Instrument = formatValue(value);
            break;
          case "measure_type":
            column.Measurement_Type = formatValue(value);
            break;
          case "unit_in":
            column.Input_Unit = formatValue(value);
            break;
          case "unit_out":
            column.Output_Unit = formatValue(value);
            break;
          case "nom_timelag":
            column.Nominal_Time_Lag = formatValue(value);
            break;
          case "min_timelag":
            column.Minimum_Time_Lag = formatValue(value);
            break;
          case "max_timelag":
            column.Maximum_Time_Lag = formatValue(value);
            break;
        }
        break;
      }
      case "fluxcorrection_spectralanalysis_general":
      {
        switch (key) {
          case "sa_start_date": object.SpectralCorrection.Subperiod_Start = formatValue(value);break;
          case "sa_end_date": object.SpectralCorrection.Subperiod_End = formatValue(value);break;
          case "sa_min_smpl": object.SpectralCorrection.Minimum_Number_Of_Spectra = formatValue(value);break;
          case "sa_fmin_co2": object.SpectralCorrection.Lowest_Frequency_CO2 = formatValue(value);break;
          case "sa_fmin_h2o": object.SpectralCorrection.Lowest_Frequency_H20 = formatValue(value);break;
          case "sa_fmin_ch4": object.SpectralCorrection.Lowest_Frequency_CH4 = formatValue(value);break;
          case "sa_fmin_gas4": object.SpectralCorrection.Lowest_Frequency_Gas = formatValue(value);break;
          case "sa_fmax_co2": object.SpectralCorrection.Highest_Frequency_CO2 = formatValue(value);break;
          case "sa_fmax_h2o": object.SpectralCorrection.Highest_Frequency_H20 = formatValue(value);break;
          case "sa_fmax_ch4": object.SpectralCorrection.Highest_Frequency_CH4 = formatValue(value);break;
          case "sa_fmax_gas4": object.SpectralCorrection.Highest_Frequency_Gas = formatValue(value);break;
          case "sa_min_co2": object.SpectralCorrection.Minimum_CO2_Flux = formatValue(value);break;
          case "sa_min_ch4": object.SpectralCorrection.Minimum_CH4_Flux = formatValue(value);break;
          case "sa_min_gas4": object.SpectralCorrection.Minimum_Gas_Flux = formatValue(value);break;
          case "f10_co2_trshld": object.SpectralCorrection.Threshold_Flux_CO2 = formatValue(value);break;
          case "f10_ch4_trshld": object.SpectralCorrection.Threshold_Flux_CH4 = formatValue(value);break;
          case "f10_gas4_trshld": object.SpectralCorrection.Threshold_Flux_Gas = formatValue(value);break;
        }
        break;
      }
      case "rawprocess_general":
      {
        break;
      }
      case "rawprocess_settings":
      {
        switch (key) {
          case "cross_wind": object.ProcessingOption.Angle_Of_Attack_Correction_For_Wind_Components = formatValue(value);break;
          case "rot_meth": object.ProcessingOption.Rotation_Method = EddyProImport.getLookupValue(key, value);break;
          case "detrend_meth": object.ProcessingOption.Detrend_Method = EddyProImport.getLookupValue(key, value);break;
          case "timeconst": object.ProcessingOption.Turbulent_Fluctuations_Time_Constant = formatValue(value);break;
          case "tlag_meth": object.ProcessingOption.Time_Lag_Method = EddyProImport.getLookupValue(key, value);break;
          case "out_bin_sp" : object.Output.Spectral_Output_All = formatValue(value, "bool"); break;
          case "out_bin_og" : object.Output.Spectral_Output_All_Ogives = formatValue(value, "bool"); break;
          case "out_full_sp_u" : object.Output.Spectral_Output_U = formatValue(value, "bool"); break;
          case "out_full_sp_v" : object.Output.Spectral_Output_V = formatValue(value, "bool"); break;
          case "out_full_sp_w" : object.Output.Spectral_Output_W = formatValue(value, "bool"); break;
          case "out_full_sp_ts" : object.Output.Spectral_Output_TS = formatValue(value, "bool"); break;
          case "out_full_sp_co2" : object.Output.Spectral_Output_CO2 = formatValue(value, "bool"); break;
          case "out_full_sp_h2o" : object.Output.Spectral_Output_H20 = formatValue(value, "bool"); break;
          case "out_full_sp_ch4" : object.Output.Spectral_Output_CH4 = formatValue(value, "bool"); break;
          case "out_full_sp_n2o" : object.Output.Spectral_Output_4th_Gas = formatValue(value, "bool"); break;
          case "out_st_1" : object.Output.Process_Stats_1 = formatValue(value, "bool"); break;
          case "out_st_2" : object.Output.Process_Stats_2 = formatValue(value, "bool"); break;
          case "out_st_3" : object.Output.Process_Stats_3 = formatValue(value, "bool"); break;
          case "out_st_4" : object.Output.Process_Stats_4 = formatValue(value, "bool"); break;
          case "out_st_5" : object.Output.Process_Stats_5 = formatValue(value, "bool"); break;
          case "out_st_6" : object.Output.Process_Stats_6 = formatValue(value, "bool"); break;
          case "out_st_7" : object.Output.Process_Stats_7 = formatValue(value, "bool"); break;
          case "out_raw_2" : object.Output.Process_Time_2 = formatValue(value, "bool"); break;
          case "out_raw_3" : object.Output.Process_Time_3 = formatValue(value, "bool"); break;
          case "out_raw_4" : object.Output.Process_Time_4 = formatValue(value, "bool"); break;
          case "out_raw_5" : object.Output.Process_Time_5 = formatValue(value, "bool"); break;
          case "out_raw_6" : object.Output.Process_Time_6 = formatValue(value, "bool"); break;
          case "out_raw_7" : object.Output.Process_Time_7 = formatValue(value, "bool"); break;
          case "out_raw_u" : object.Output.Process_Time_U = formatValue(value, "bool"); break;
          case "out_raw_v" : object.Output.Process_Time_V = formatValue(value, "bool"); break;
          case "out_raw_w" : object.Output.Process_Time_W = formatValue(value, "bool"); break;
          case "out_raw_ts" : object.Output.Process_Time_TS = formatValue(value, "bool"); break;
          case "out_raw_co2" : object.Output.Process_Time_CO2 = formatValue(value, "bool"); break;
          case "out_raw_h2o" : object.Output.Process_Time_H20 = formatValue(value, "bool"); break;
          case "out_raw_ch4" : object.Output.Process_Time_CH4 = formatValue(value, "bool"); break;
          case "out_raw_gas4" : object.Output.Process_Time_4th = formatValue(value, "bool"); break;
          case "out_raw_t_air" : object.Output.Process_Time_T = formatValue(value, "bool"); break;
          case "out_raw_p_air" : object.Output.Process_Time_P = formatValue(value, "bool"); break;
          case "out_full_cosp_w_u" : object.Output.Spectral_Output_WU = formatValue(value, "bool"); break;
          case "out_full_cosp_w_v" : object.Output.Spectral_Output_WV = formatValue(value, "bool"); break;
          case "out_full_cosp_w_ts" : object.Output.Spectral_Output_WTS = formatValue(value, "bool"); break;
          case "out_full_cosp_w_co2" : object.Output.Spectral_Output_WC02 = formatValue(value, "bool"); break;
          case "out_full_cosp_w_h2o" : object.Output.Spectral_Output_WH20 = formatValue(value, "bool"); break;
          case "out_full_cosp_w_ch4" : object.Output.Spectral_Output_WCH4 = formatValue(value, "bool"); break;
          case "out_full_cosp_w_n2o" : object.Output.Spectral_Output_W4th_Gas = formatValue(value, "bool"); break;
          case "bu_corr" : object.StatisticalAnalysis.Add_Instrument_Sensible_Heat_Components = formatValue(value); break;
          case "bu_multi" : object.StatisticalAnalysis.Surface_Temperature_Estimations = EddyProImport.getLookupValue(key, value); break;
          case "l_day_bot_gain" : object.StatisticalAnalysis.Day_Bottom_Gain = formatValue(value); break;
          case "l_day_bot_offset" : object.StatisticalAnalysis.Day_Bottom_Offset = formatValue(value); break;
          case "l_day_top_gain" : object.StatisticalAnalysis.Day_Top_Gain = formatValue(value); break;
          case "l_day_top_offset" : object.StatisticalAnalysis.Day_Top_Offset = formatValue(value); break;
          case "l_day_spar_gain" : object.StatisticalAnalysis.Day_Spar_Gain = formatValue(value); break;
          case "l_day_spar_offset" : object.StatisticalAnalysis.Day_Spar_Offset = formatValue(value); break;
          case "l_night_bot_gain" : object.StatisticalAnalysis.Night_Bottom_Gain = formatValue(value); break;
          case "l_night_bot_offset" : object.StatisticalAnalysis.Night_Bottom_Offset = formatValue(value); break;
          case "l_night_top_gain" : object.StatisticalAnalysis.Night_Top_Gain = formatValue(value); break;
          case "l_night_top_offset" : object.ProcessingOption.Night_Top_Offset = formatValue(value); break;
          case "l_night_spar_gain" : object.StatisticalAnalysis.Night_Spar_Gain = formatValue(value); break;
          case "l_night_spar_offset" : object.StatisticalAnalysis.Night_Spar_Offset = formatValue(value); break;
          case "m_day_bot1" : object.StatisticalAnalysis.Day_Bottom_1 = formatValue(value); break;
          case "m_day_bot2" : object.StatisticalAnalysis.Day_Bottom_2 = formatValue(value); break;
          case "m_day_bot3" : object.StatisticalAnalysis.Day_Bottom_3 = formatValue(value); break;
          case "m_day_bot4" : object.StatisticalAnalysis.Day_Bottom_4 = formatValue(value); break;
          case "m_day_top1" : object.StatisticalAnalysis.Day_Top_1 = formatValue(value); break;
          case "m_day_top2" : object.StatisticalAnalysis.Day_Top_2 = formatValue(value); break;
          case "m_day_top3" : object.StatisticalAnalysis.Day_Top_3 = formatValue(value); break;
          case "m_day_top4" : object.StatisticalAnalysis.Day_Top_4 = formatValue(value); break;
          case "m_day_spar1" : object.StatisticalAnalysis.Day_Spar_1 = formatValue(value); break;
          case "m_day_spar2" : object.StatisticalAnalysis.Day_Spar_2 = formatValue(value); break;
          case "m_day_spar3" : object.StatisticalAnalysis.Day_Spar_3 = formatValue(value); break;
          case "m_day_spar4" : object.StatisticalAnalysis.Day_Spar_4 = formatValue(value); break;
          case "m_night_bot1" : object.StatisticalAnalysis.Night_Bottom_1 = formatValue(value); break;
          case "m_night_bot2" : object.StatisticalAnalysis.Night_Bottom_2 = formatValue(value); break;
          case "m_night_bot3" : object.StatisticalAnalysis.Night_Bottom_3 = formatValue(value); break;
          case "m_night_bot4" : object.StatisticalAnalysis.Night_Bottom_4 = formatValue(value); break;
          case "m_night_top1" : object.StatisticalAnalysis.Night_Top_1 = formatValue(value); break;
          case "m_night_top2" : object.StatisticalAnalysis.Night_Top_2 = formatValue(value); break;
          case "m_night_top3" : object.StatisticalAnalysis.Night_Top_3 = formatValue(value); break;
          case "m_night_top4" : object.StatisticalAnalysis.Night_Top_4 = formatValue(value); break;
          case "m_night_spar1" : object.StatisticalAnalysis.Night_Spar_1 = formatValue(value); break;
          case "m_night_spar2" : object.StatisticalAnalysis.Night_Spar_2 = formatValue(value); break;
          case "m_night_spar3" : object.StatisticalAnalysis.Night_Spar_3 = formatValue(value); break;
          case "m_night_spar4" : object.StatisticalAnalysis.Night_Spar_4 = formatValue(value); break;
          case "out_qc_details" : object.ProcessingOption.Quality_Check = formatValue(value); break;
          case "power_of_two" : object.ProcessingOption.Power_Of_Two_Samples = formatValue(value); break;
        }
        break;
      }
      case "rawprocess_tests":
      {
        switch (key) {
          case "test_sr": object.StatisticalAnalysis.Spike_count = formatValue(value,"bool");break;
          case "test_ar": object.StatisticalAnalysis.Amplitude_resolution = formatValue(value,"bool");break;
          case "test_do": object.StatisticalAnalysis.Drop_outs = formatValue(value,"bool");break;
          case "test_al": object.StatisticalAnalysis.Absolute_limits = formatValue(value,"bool");break;
          case "test_sk": object.StatisticalAnalysis.Skewness_Kurtosis = formatValue(value,"bool");break;
          case "test_ds": object.StatisticalAnalysis.Discontinuities = formatValue(value,"bool");break;
          case "test_tl": object.StatisticalAnalysis.Time_lags = formatValue(value,"bool");break;
          case "test_aa": object.StatisticalAnalysis.Angle_of_attack = formatValue(value,"bool");break;
          case "test_ns": object.StatisticalAnalysis.Steadiness_of_horizontal_wind = formatValue(value,"bool");break;
        }
        break;
      }
      case "rawprocess_parametersettings":
      {
        switch (key) {
          case "sr_num_spk": object.StatisticalAnalysis.Accepted_spikes = formatValue(value); break;
          case "sr_lim_w": object.StatisticalAnalysis.Plausibility_ranges_W = formatValue(value); break;
          case "sr_lim_co2": object.StatisticalAnalysis.Plausibility_ranges_CO2 = formatValue(value); break;
          case "sr_lim_h2o": object.StatisticalAnalysis.Plausibility_ranges_H20 = formatValue(value); break;
          case "sr_lim_ch4": object.StatisticalAnalysis.Plausibility_ranges_CH4 = formatValue(value); break;
          case "sr_lim_n2o": object.StatisticalAnalysis.Plausibility_ranges_4th = formatValue(value); break;
          case "sr_lim_hf": object.StatisticalAnalysis.Plausibility_ranges_Other = formatValue(value); break;
          case "ar_lim": object.StatisticalAnalysis.Range_of_variation = formatValue(value); break;
          case "ar_bins": object.StatisticalAnalysis.Number_of_bins = formatValue(value); break;
          case "ar_hf_lim": object.StatisticalAnalysis.Accepted_empty_bins = formatValue(value); break;
          case "do_extlim_dw": object.StatisticalAnalysis.Percentile_defining_extreme_bins = formatValue(value); break;
          case "do_hf1_lim": object.StatisticalAnalysis.Accepted_central_dropouts = formatValue(value); break;
          case "do_hf2_lim": object.StatisticalAnalysis.Accepted_extreme_dropouts = formatValue(value); break;
          case "al_u_max": object.StatisticalAnalysis.Absolute_limits_max_U = formatValue(value); break;
          case "al_w_max": object.StatisticalAnalysis.Absolute_limits_max_W = formatValue(value); break;
          case "al_tson_min": object.StatisticalAnalysis.Absolute_limits_min_TS = formatValue(value); break;
          case "al_tson_max": object.StatisticalAnalysis.Absolute_limits_max_TS = formatValue(value); break;
          case "al_co2_min": object.StatisticalAnalysis.Absolute_limits_min_C02 = formatValue(value); break;
          case "al_co2_max": object.StatisticalAnalysis.Absolute_limits_max_C02 = formatValue(value); break;
          case "al_h2o_min": object.StatisticalAnalysis.Absolute_limits_min_H20 = formatValue(value); break;
          case "al_h2o_max": object.StatisticalAnalysis.Absolute_limits_max_H20 = formatValue(value); break;
          case "al_ch4_min": object.StatisticalAnalysis.Absolute_limits_min_CH4 = formatValue(value); break;
          case "al_ch4_max": object.StatisticalAnalysis.Absolute_limits_max_CH4 = formatValue(value); break;
          case "al_n2o_min": object.StatisticalAnalysis.Absolute_limits_min_4th = formatValue(value); break;
          case "al_n2o_max": object.StatisticalAnalysis.Absolute_limits_max_4th = formatValue(value); break;
          case "sk_hf_skmin": object.StatisticalAnalysis.Hard_skewness_lower_limit = formatValue(value); break;
          case "sk_hf_skmax": object.StatisticalAnalysis.Hard_skewness_upper_limit = formatValue(value); break;
          case "sk_sf_skmin": object.StatisticalAnalysis.Soft_skewness_lower_limit = formatValue(value); break;
          case "sk_sf_skmax": object.StatisticalAnalysis.Soft_Skewness_upper_limit = formatValue(value); break;
          case "sk_hf_kumin": object.StatisticalAnalysis.Hard_kurtosis_lower_limit = formatValue(value); break;
          case "sk_hf_kumax": object.StatisticalAnalysis.Hard_kurtosis_upper_limit = formatValue(value); break;
          case "sk_sf_kumin": object.StatisticalAnalysis.Soft_Kurtosis_lower_limit = formatValue(value); break;
          case "sk_sf_kumax": object.StatisticalAnalysis.Soft_Kurtosis_upper_limit = formatValue(value); break;
          case "ds_hf_uv": object.StatisticalAnalysis.Hard_discontinuities_U = formatValue(value); break;
          case "ds_hf_w": object.StatisticalAnalysis.Hard_discontinuities_W = formatValue(value); break;
          case "ds_hf_t": object.StatisticalAnalysis.Hard_discontinuities_TS = formatValue(value); break;
          case "ds_hf_co2": object.StatisticalAnalysis.Hard_discontinuities_C02 = formatValue(value); break;
          case "ds_hf_h2o": object.StatisticalAnalysis.Hard_discontinuities_H20 = formatValue(value); break;
          case "ds_hf_ch4": object.StatisticalAnalysis.Hard_discontinuities_CH4 = formatValue(value); break;
          case "ds_hf_n2o": object.StatisticalAnalysis.Hard_discontinuities_4th = formatValue(value); break;
          case "ds_hf_var": object.StatisticalAnalysis.Hard_discontinuities_Variances = formatValue(value); break;
          case "ds_sf_uv": object.StatisticalAnalysis.Soft_discontinuities_U = formatValue(value); break;
          case "ds_sf_w": object.StatisticalAnalysis.Soft_discontinuities_W = formatValue(value); break;
          case "ds_sf_t": object.StatisticalAnalysis.Soft_discontinuities_TS = formatValue(value); break;
          case "ds_sf_co2": object.StatisticalAnalysis.Soft_discontinuities_C02 = formatValue(value); break;
          case "ds_sf_h2o": object.StatisticalAnalysis.Soft_discontinuities_H20 = formatValue(value); break;
          case "ds_sf_ch4": object.StatisticalAnalysis.Soft_discontinuities_CH4 = formatValue(value); break;
          case "ds_sf_n2o": object.StatisticalAnalysis.Soft_discontinuities_4th = formatValue(value); break;
          case "ds_sf_var": object.StatisticalAnalysis.Soft_discontinuities_Variances = formatValue(value); break;
          case "tl_hf_lim": object.StatisticalAnalysis.Accepted_covariance_difference_hard = formatValue(value); break;
          case "tl_sf_lim": object.StatisticalAnalysis.Accepted_covariance_difference_soft = formatValue(value); break;
          case "tl_def_co2": object.StatisticalAnalysis.Nominal_CO2_time_lag = formatValue(value); break;
          case "tl_def_h2o": object.StatisticalAnalysis.Nominal_H20_time_lag = formatValue(value); break;
          case "tl_def_ch4": object.StatisticalAnalysis.Nominal_CH4_time_lag = formatValue(value); break;
          case "tl_def_n2o": object.StatisticalAnalysis.Nominal_4th_time_lag = formatValue(value); break;
          case "aa_min": object.StatisticalAnalysis.Minimum_angle_of_attack = formatValue(value); break;
          case "aa_max": object.StatisticalAnalysis.Maximum_angle_of_attack = formatValue(value); break;
          case "aa_lim": object.StatisticalAnalysis.Accepted_amount_outliers = formatValue(value); break;
        }
        break;
      }
      case "rawprocess_tiltcorrection_settings":
      {
        switch (key) {
          case "pf_start_date": object.ProcessingOption.Planar_Start = formatValue(value); break;
          case "pf_end_date": object.ProcessingOption.Planar_End = formatValue(value); break;
          case "pf_mode": object.ProcessingOption.Time_Lag_Method = EddyProImport.getLookupValue(key, value); break;
          case "pf_north_offset": object.ProcessingOption.Planar_North_Offset_First_Sector = formatValue(value); break;
          case "pf_min_num_per_sec": object.ProcessingOption.Planar_Elements_Per_Sector = formatValue(value); break;
          case "pf_w_max": object.ProcessingOption.Planar_Max_Mean_Verticle_Wind_Component = formatValue(value); break;
          case "pf_u_min": object.ProcessingOption.Planar_Min_Mean_Horizontal_Wind_Component = formatValue(value); break;
        }
        break;
      }
      case "rawprocess_timelagoptimization_settings":
      {
        switch (key) {
          case "to_start_date": object.ProcessingOption.Time_Lag_Start = formatValue(value); break;
          case "to_end_date": object.ProcessingOption.Time_Lag_End = formatValue(value); break;
          case "to_mode": object.ProcessingOption.Time_Lag_Method = formatValue(value); break;
          case "to_h2o_nclass": object.ProcessingOption.Time_Lag_RH_Classes = formatValue(value); break;
          case "to_co2_min_flux": object.ProcessingOption.Time_Lag_Minimum_C02_Flux = formatValue(value); break;
          case "to_ch4_min_flux": object.ProcessingOption.Time_Lag_Minimum_CH4_Flux = formatValue(value); break;
          case "to_gas4_min_flux": object.ProcessingOption.Time_Lag_Minimum_Gas_Flux = formatValue(value); break;
          case "to_pg_range": object.ProcessingOption.Time_Lag_Plausibility_Range_Around_Median_Value = formatValue(value); break;
          case "to_co2_min_lag": object.ProcessingOption.Time_Lag_Searching_C02_Min = formatValue(value); break;
          case "to_co2_max_lag": object.ProcessingOption.Time_Lag_Searching_C02_Max = formatValue(value); break;
          case "to_h2o_min_lag": object.ProcessingOption.Time_Lag_Searching_H20_Min = formatValue(value); break;
          case "to_h2o_max_lag": object.ProcessingOption.Time_Lag_Searching_H20_Max = formatValue(value); break;
          case "to_ch4_min_lag": object.ProcessingOption.Time_Lag_Searching_CH4_Min = formatValue(value); break;
          case "to_ch4_max_lag": object.ProcessingOption.Time_Lag_Searching_CH4_Max = formatValue(value); break;
          case "to_gas4_min_lag": object.ProcessingOption.Time_Lag_Searching_Gas_Min = formatValue(value); break;
          case "to_gas4_max_lag": object.ProcessingOption.Time_Lag_Searching_Gas_Max = formatValue(value); break;
        }
        break;
      }
      case "rawprocess_randomuncertainty_settings":
      {
        switch (key) {
          case "ru_meth": object.StatisticalAnalysis.Random_uncertainty_estimation = formatValue(value); break;
          case "ru_its_meth": object.StatisticalAnalysis.Random_uncertainty_estimation_method = EddyProImport.getLookupValue(key, value); break;
          case "ru_tlag_max": object.StatisticalAnalysis.Maximum_correlation_period = formatValue(value); break;
        }
        break;
      }
      case "rawprocess_biometmeasurements":
      {
        break;
      }
    }
  },

  getLookupValue: function(field,value) {
    var lookups = {
      "Integral_turbulence_scale":["Cross-correlation first crossing 1/e","Cross-correlation first crossing zero","Integrate over the whole correlation period"],
      "ru_its_meth":["Finkelstein and Sims (2001)","Mann and Lenshcow (1994)"],
      "Correction_For_Instruments_Separation_Method":["Horst and Lenshow (2009), along-wind, crosswind and vertical","Horst and Lenshow (2009), only crosswind and vertical"],
      "Correction_Of_Low_Pass_Filtering_Effects_Method": ["Moncrieff et al. (1997) – Fully analytic","Massmann (2000, 2001) – Fully analytic","Horst (1997) – Analytic with in situ parameterization","Ibrom et al. (2007) – In situ / analytic","Fratini et al. (2012) – In situ/analytic"],
      "North_Reference": ["Use Magnetic North", "Use Geographic North"],
      "Angle_Of_Attach_Method": ["Field calibration (Nakai and Shimoyama 2012)", "Wind tunnel calibration (Nakai et al. 2006)"],
      "rot_meth":["Double rotation","Triple rotation","Planar fit (Wilczak et al. 2001)","Planar fit with not velocity bias (van Dijk et al. 2004)"],
      "detrend_meth": ["Block average","Linear detrending","Running mean","Exponential running mean"],
      "tlag_meth": ["Constant","Covariance maximization with default","Covariance maximization","Automatic time lag optimization"],
      "Compensate_Density_Fluctuations_Method": ["Use/convert to mixing ratio, if possible(Burba et al. 2012)","Webb et al. 1980 (open-path) / Ibrom et al. 2007 (closed-path)"],
      "bu_multi": ["Simple linear regressions", "Multiple regressions"],
      "Tapering_Window": ["Spared (no window)","Bartlett","Welch","Hamming","Hann"],
      "Quality_Check_Flagging_Policy": ["Mauder and Foken (2004) (0-1-2 system)","Foken (2003) (1 to 9 system)","Goeckede et al. (2004) (1 to 5 system)"],
      "Footprint_Method": ["Kljun et al. (2004)","Kormann and Meixner (2001)","Hsieh et al. (2000)"],
      "pf_mode": ["Use closest valid sector, clockwise)"]
    };

    var lookupArray = lookups[field];
    if (lookupArray != null) {
      return lookupArray[value];
    }
    return "";
  }
};
