module.exports = {

  importMetaData: function(file, user) {
    var metadata = {Name: 'Unknown', User: user, Instruments: [], Columns: []};
    EddyProImport.importFile(file, metadata);
    console.log(metadata);
    Data.create(metadata).then(function(data) {
      data.save();
    });
  },

  importProject: function(file, user) {
    var project = {User: user, SpectralCorrection: {}, ProcessingOption: {}, StatisticalAnalysis: {}, Output: {}};
    EddyProImport.importFile(file, project);
    console.log(project);
    //Report.create(project).then(function(report) {
      //report.save();
    //});
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

    switch(section) {
      case "Project":
      {
        switch (key) {
          case "creation_date":
            object.createdAt = value;
            break;
          case "last_change_date":
            object.updatedAt = value;
            break;
          case "start_date":
            object.Date_From = value;
            break;
          case "end_date":
            object.Date_To = value;
            break;
          case "project_title":
            object.Name = value;
            break;
          case "err_label":
            object.Error_Label = value;
            break;
          case "out_mean_cosp":
            object.Spectral_Output_Averaged_Cospectra = value;
            break;
        }
        break;
      }
      case "Files":
      {
        break;
      }
      case "Site":
      {
        switch (key) {
          case "altitude":
            object.Altitude = value;
            break;
          case "latitude":
            object.Latitude = value;
            break;
          case "longitude":
            object.Longitude = value;
            break;
          case "canopy_height":
            object.Canopy_Height = value;
            break;
        }
        break;
      }
      case "Station":
      {
        switch (key) {
          case "station_name":
            object.Name = value;
            break;
        }
        break;
      }
      case "Timing":
      {
        switch (key) {
          case "acquisition_frequency":
            object.Acquisition_Frequency = value;
            break;
          case "file_duration":
            object.File_Duration = value;
            break;
        }
        break;
      }
      case "Instruments":
      {
        if (itemNumber > object.Instruments.length) {
          object.Instruments.push({Instrument_Type: 'Anemometer'});
        }
        var instrument = object.Instruments[object.Instruments.length - 1];

        switch (key) {
          case "manufacturer":
            instrument.Manufacturer = value;
            break;
          case "model":
            instrument.Altitude = value;
            break;
          case "sw_version":
            instrument.Software_Version = value;
            instrument.Instrument_Type = 'Gas';
            break;
          case "id":
            instrument.Instrument_Id = value;
            break;
          case "height":
            instrument.Height = value;
            break;
          case "wformat":
            instrument.Wind_Data_Format = value;
            break;
          case "north_offset":
            instrument.North_Offset = value;
            break;
          case "northward_separation":
            instrument.Northward_Separation = value;
            break;
          case "eastward_separation":
            instrument.Eastward_Separation = value;
            break;
          case "vertical_separation":
            instrument.Vertical_Separation = value;
            break;
          case "vpath_length":
            instrument.Longitudinal_Path_Length = value;
            break;
          case "hpath_length":
            instrument.Transversal_Path_Length = value;
            break;
          case "tau":
            instrument.Time_Response = value;
            break;
          case "tube_length":
            instrument.Tube_Length = value;
            break;
          case "tube_diameter":
            instrument.Tube_Inner_Diameter = value;
            break;
          case "tube_flowrate":
            instrument.Nominal_Tube_Flow_Rate = value;
            break;
          case "kw":
            instrument.Extinction_Coefficient_In_Water_KW = value;
            break;
          case "ko":
            instrument.Extinction_Coefficient_In_Water_KO = value;
            break;
        }
        break;
      }
      case "FileDescription":
      {
        if (itemNumber > object.Columns.length) {
          object.Columns.push({});
        }
        var column = object.Columns[object.Columns.length - 1];

        switch (key) {
          case "variable":
            column.Numeric = value;
            break;
          case "instrument":
            column.Instrument = value;
            break;
          case "measure_type":
            column.Measurement_Type = value;
            break;
          case "unit_in":
            column.Input_Unit = value;
            break;
          case "unit_out":
            column.Output_Unit = value;
            break;
          case "nom_timelag":
            column.Nominal_Time_Lag = value;
            break;
          case "min_timelag":
            column.Minimum_Time_Lag = value;
            break;
          case "max_timelag":
            column.Maximum_Time_Lag = value;
            break;
        }
        break;
      }
      case "FluxCorrection_SpectralAnalysis_General":
      {
        switch (key) {
          case "sa_start_date": object.SpectralCorrection.Subperiod_Start = value;break;
          case "sa_end_date": object.SpectralCorrection.Subperiod_End = value;break;
          case "sa_min_smpl": object.SpectralCorrection.Minimum_Number_Of_Spectra = value;break;
          case "sa_fmin_co2": object.SpectralCorrection.Lowest_Frequency_CO2 = value;break;
          case "sa_fmin_h2o": object.SpectralCorrection.Lowest_Frequency_H20 = value;break;
          case "sa_fmin_ch4": object.SpectralCorrection.Lowest_Frequency_CH4 = value;break;
          case "sa_fmin_gas4": object.SpectralCorrection.Lowest_Frequency_Gas = value;break;
          case "sa_fmax_co2": object.SpectralCorrection.Highest_Frequency_CO2 = value;break;
          case "sa_fmax_h2o": object.SpectralCorrection.Highest_Frequency_H20 = value;break;
          case "sa_fmax_ch4": object.SpectralCorrection.Highest_Frequency_CH4 = value;break;
          case "sa_fmax_gas4": object.SpectralCorrection.Highest_Frequency_Gas = value;break;
          case "sa_min_co2": object.SpectralCorrection.Minimum_CO2_Flux = value;break;
          case "sa_min_ch4": object.SpectralCorrection.Minimum_CH4_Flux = value;break;
          case "sa_min_gas4": object.SpectralCorrection.Minimum_Gas_Flux = value;break;
          case "f10_co2_trshld": object.SpectralCorrection.Threshold_Flux_CO2 = value;break;
          case "f10_ch4_trshld": object.SpectralCorrection.Threshold_Flux_CH4 = value;break;
          case "f10_gas4_trshld": object.SpectralCorrection.Threshold_Flux_Gas = value;break;
        }
        break;
      }
      case "RawProcess_General":
      {
        break;
      }
      case "RawProcess_Settings":
      {
        switch (key) {
          case "cross_wind": object.ProcessingOption.Angle_Of_Attack_Correction_For_Wind_Components = value;break;
          case "rot_meth": object.ProcessingOption.Rotation_Method = value;break;
          case "detrend_meth": object.ProcessingOption.Detrend_Method = value;break;
          case "timeconst": object.ProcessingOption.Turbulent_Fluctuations_Time_Constant = value;break;
          case "tlag_meth": object.ProcessingOption.Time_Lag_Method = value;break;
          case "out_bin_sp" : object.Output.Spectral_Output_All = value; break;
          case "out_bin_og" : object.Output.Spectral_Output_All_Ogives = value; break;
          case "out_full_sp_u" : object.Output.Spectral_Output_U = value; break;
          case "out_full_sp_v" : object.Output.Spectral_Output_V = value; break;
          case "out_full_sp_w" : object.Output.Spectral_Output_W = value; break;
          case "out_full_sp_ts" : object.Output.Spectral_Output_TS = value; break;
          case "out_full_sp_co2" : object.Output.Spectral_Output_CO2 = value; break;
          case "out_full_sp_h2o" : object.Output.Spectral_Output_H20 = value; break;
          case "out_full_sp_ch4" : object.Output.Spectral_Output_CH4 = value; break;
          case "out_full_sp_n2o" : object.Output.Spectral_Output_4th_Gas = value; break;
          case "out_st_1" : object.Output.Process_Stats_1 = value; break;
          case "out_st_2" : object.Output.Process_Stats_2 = value; break;
          case "out_st_3" : object.Output.Process_Stats_3 = value; break;
          case "out_st_4" : object.Output.Process_Stats_4 = value; break;
          case "out_st_5" : object.Output.Process_Stats_5 = value; break;
          case "out_st_6" : object.Output.Process_Stats_6 = value; break;
          case "out_st_7" : object.Output.Process_Stats_7 = value; break;
          case "out_raw_2" : object.Output.Process_Time_2 = value; break;
          case "out_raw_3" : object.Output.Process_Time_3 = value; break;
          case "out_raw_4" : object.Output.Process_Time_4 = value; break;
          case "out_raw_5" : object.Output.Process_Time_5 = value; break;
          case "out_raw_6" : object.Output.Process_Time_6 = value; break;
          case "out_raw_7" : object.Output.Process_Time_7 = value; break;
          case "out_raw_u" : object.Output.Process_Time_U = value; break;
          case "out_raw_v" : object.Output.Process_Time_V = value; break;
          case "out_raw_w" : object.Output.Process_Time_W = value; break;
          case "out_raw_ts" : object.Output.Process_Time_TS = value; break;
          case "out_raw_co2" : object.Output.Process_Time_CO2 = value; break;
          case "out_raw_h2o" : object.Output.Process_Time_H20 = value; break;
          case "out_raw_ch4" : object.Output.Process_Time_CH4 = value; break;
          case "out_raw_gas4" : object.Output.Process_Time_4th = value; break;
          case "out_raw_t_air" : object.Output.Process_Time_T = value; break;
          case "out_raw_p_air" : object.Output.Process_Time_P = value; break;
          case "out_full_cosp_w_u" : object.Output.Spectral_Output_WU = value; break;
          case "out_full_cosp_w_v" : object.Output.Spectral_Output_WV = value; break;
          case "out_full_cosp_w_ts" : object.Output.Spectral_Output_WTS = value; break;
          case "out_full_cosp_w_co2" : object.Output.Spectral_Output_WC02 = value; break;
          case "out_full_cosp_w_h2o" : object.Output.Spectral_Output_WH20 = value; break;
          case "out_full_cosp_w_ch4" : object.Output.Spectral_Output_WCH4 = value; break;
          case "out_full_cosp_w_n2o" : object.Output.Spectral_Output_W4th_Gas = value; break;
          case "bu_corr" : object.StatisticalAnalysis.Add_Instrument_Sensible_Heat_Components = value; break;
          case "bu_multi" : object.StatisticalAnalysis.Surface_Temperature_Estimations = value; break;
          case "l_day_bot_gain" : object.StatisticalAnalysis.Day_Bottom_Gain = value; break;
          case "l_day_bot_offset" : object.StatisticalAnalysis.Day_Bottom_Offset = value; break;
          case "l_day_top_gain" : object.StatisticalAnalysis.Day_Top_Gain = value; break;
          case "l_day_top_offset" : object.StatisticalAnalysis.Day_Top_Offset = value; break;
          case "l_day_spar_gain" : object.StatisticalAnalysis.Day_Spar_Gain = value; break;
          case "l_day_spar_offset" : object.StatisticalAnalysis.Day_Spar_Offset = value; break;
          case "l_night_bot_gain" : object.StatisticalAnalysis.Night_Bottom_Gain = value; break;
          case "l_night_bot_offset" : object.StatisticalAnalysis.Night_Bottom_Offset = value; break;
          case "l_night_top_gain" : object.StatisticalAnalysis.Night_Top_Gain = value; break;
          case "l_night_top_offset" : object.ProcessingOption.Night_Top_Offset = value; break;
          case "l_night_spar_gain" : object.StatisticalAnalysis.Night_Spar_Gain = value; break;
          case "l_night_spar_offset" : object.StatisticalAnalysis.Night_Spar_Offset = value; break;
          case "m_day_bot1" : object.StatisticalAnalysis.Day_Bottom_1 = value; break;
          case "m_day_bot2" : object.StatisticalAnalysis.Day_Bottom_2 = value; break;
          case "m_day_bot3" : object.StatisticalAnalysis.Day_Bottom_3 = value; break;
          case "m_day_bot4" : object.StatisticalAnalysis.Day_Bottom_4 = value; break;
          case "m_day_top1" : object.StatisticalAnalysis.Day_Top_1 = value; break;
          case "m_day_top2" : object.StatisticalAnalysis.Day_Top_2 = value; break;
          case "m_day_top3" : object.StatisticalAnalysis.Day_Top_3 = value; break;
          case "m_day_top4" : object.StatisticalAnalysis.Day_Top_4 = value; break;
          case "m_day_spar1" : object.StatisticalAnalysis.Day_Spar_1 = value; break;
          case "m_day_spar2" : object.StatisticalAnalysis.Day_Spar_2 = value; break;
          case "m_day_spar3" : object.StatisticalAnalysis.Day_Spar_3 = value; break;
          case "m_day_spar4" : object.StatisticalAnalysis.Day_Spar_4 = value; break;
          case "m_night_bot1" : object.StatisticalAnalysis.Night_Bottom_1 = value; break;
          case "m_night_bot2" : object.StatisticalAnalysis.Night_Bottom_2 = value; break;
          case "m_night_bot3" : object.StatisticalAnalysis.Night_Bottom_3 = value; break;
          case "m_night_bot4" : object.StatisticalAnalysis.Night_Bottom_4 = value; break;
          case "m_night_top1" : object.StatisticalAnalysis.Night_Top_1 = value; break;
          case "m_night_top2" : object.StatisticalAnalysis.Night_Top_2 = value; break;
          case "m_night_top3" : object.StatisticalAnalysis.Night_Top_3 = value; break;
          case "m_night_top4" : object.StatisticalAnalysis.Night_Top_4 = value; break;
          case "m_night_spar1" : object.StatisticalAnalysis.Night_Spar_1 = value; break;
          case "m_night_spar2" : object.StatisticalAnalysis.Night_Spar_2 = value; break;
          case "m_night_spar3" : object.StatisticalAnalysis.Night_Spar_3 = value; break;
          case "m_night_spar4" : object.StatisticalAnalysis.Night_Spar_4 = value; break;
          case "out_qc_details" : object.ProcessingOption.Quality_Check = value; break;
          case "power_of_two" : object.ProcessingOption.Power_Of_Two_Samples = value; break;
        }
        break;
      }
      case "RawProcess_Tests":
      {
        switch (key) {
          case "test_sr": object.StatisticalAnalysis.Spike_count = value;break;
          case "test_ar": object.StatisticalAnalysis.Amplitude_resolution = value;break;
          case "test_do": object.StatisticalAnalysis.Drop_outs = value;break;
          case "test_al": object.StatisticalAnalysis.Absolute_limits = value;break;
          case "test_sk": object.StatisticalAnalysis.Skewness_Kurtosis = value;break;
          case "test_ds": object.StatisticalAnalysis.Discontinuities = value;break;
          case "test_tl": object.StatisticalAnalysis.Time_lags = value;break;
          case "test_aa": object.StatisticalAnalysis.Angle_of_attack = value;break;
          case "test_ns": object.StatisticalAnalysis.Steadiness_of_horizontal_wind = value;break;
        }
        break;
      }
      case "RawProcess_ParameterSettings":
      {
        switch (key) {
          case "sr_num_spk": object.StatisticalAnalysis.Accepted_spikes = value; break;
          case "sr_lim_w": object.StatisticalAnalysis.Plausibility_ranges_W = value; break;
          case "sr_lim_co2": object.StatisticalAnalysis.Plausibility_ranges_CO2 = value; break;
          case "sr_lim_h2o": object.StatisticalAnalysis.Plausibility_ranges_H20 = value; break;
          case "sr_lim_ch4": object.StatisticalAnalysis.Plausibility_ranges_CH4 = value; break;
          case "sr_lim_n2o": object.StatisticalAnalysis.Plausibility_ranges_4th = value; break;
          case "sr_lim_hf": object.StatisticalAnalysis.Plausibility_ranges_Other = value; break;
          case "ar_lim": object.StatisticalAnalysis.Range_of_variation = value; break;
          case "ar_bins": object.StatisticalAnalysis.Number_of_bins = value; break;
          case "ar_hf_lim": object.StatisticalAnalysis.Accepted_empty_bins = value; break;
          case "do_extlim_dw": object.StatisticalAnalysis.Percentile_defining_extreme_bins = value; break;
          case "do_hf1_lim": object.StatisticalAnalysis.Accepted_central_dropouts = value; break;
          case "do_hf2_lim": object.StatisticalAnalysis.Accepted_extreme_dropouts = value; break;
          case "al_u_max": object.StatisticalAnalysis.Absolute_limits_max_U = value; break;
          case "al_w_max": object.StatisticalAnalysis.Absolute_limits_max_W = value; break;
          case "al_tson_min": object.StatisticalAnalysis.Absolute_limits_min_TS = value; break;
          case "al_tson_max": object.StatisticalAnalysis.Absolute_limits_max_TS = value; break;
          case "al_co2_min": object.StatisticalAnalysis.Absolute_limits_min_C02 = value; break;
          case "al_co2_max": object.StatisticalAnalysis.Absolute_limits_max_C02 = value; break;
          case "al_h2o_min": object.StatisticalAnalysis.Absolute_limits_min_H20 = value; break;
          case "al_h2o_max": object.StatisticalAnalysis.Absolute_limits_max_H20 = value; break;
          case "al_ch4_min": object.StatisticalAnalysis.Absolute_limits_min_CH4 = value; break;
          case "al_ch4_max": object.StatisticalAnalysis.Absolute_limits_max_CH4 = value; break;
          case "al_n2o_min": object.StatisticalAnalysis.Absolute_limits_min_4th = value; break;
          case "al_n2o_max": object.StatisticalAnalysis.Absolute_limits_max_4th = value; break;
          case "sk_hf_skmin": object.StatisticalAnalysis.Hard_skewness_lower_limit = value; break;
          case "sk_hf_skmax": object.StatisticalAnalysis.Hard_skewness_upper_limit = value; break;
          case "sk_sf_skmin": object.StatisticalAnalysis.Soft_skewness_lower_limit = value; break;
          case "sk_sf_skmax": object.StatisticalAnalysis.Soft_Skewness_upper_limit = value; break;
          case "sk_hf_kumin": object.StatisticalAnalysis.Hard_kurtosis_lower_limit = value; break;
          case "sk_hf_kumax": object.StatisticalAnalysis.Hard_kurtosis_upper_limit = value; break;
          case "sk_sf_kumin": object.StatisticalAnalysis.Soft_Kurtosis_lower_limit = value; break;
          case "sk_sf_kumax": object.StatisticalAnalysis.Soft_Kurtosis_upper_limit = value; break;
          case "ds_hf_uv": object.StatisticalAnalysis.Hard_discontinuities_U = value; break;
          case "ds_hf_w": object.StatisticalAnalysis.Hard_discontinuities_W = value; break;
          case "ds_hf_t": object.StatisticalAnalysis.Hard_discontinuities_TS = value; break;
          case "ds_hf_co2": object.StatisticalAnalysis.Hard_discontinuities_C02 = value; break;
          case "ds_hf_h2o": object.StatisticalAnalysis.Hard_discontinuities_H20 = value; break;
          case "ds_hf_ch4": object.StatisticalAnalysis.Hard_discontinuities_CH4 = value; break;
          case "ds_hf_n2o": object.StatisticalAnalysis.Hard_discontinuities_4th = value; break;
          case "ds_hf_var": object.StatisticalAnalysis.Hard_discontinuities_Variances = value; break;
          case "ds_sf_uv": object.StatisticalAnalysis.Soft_discontinuities_U = value; break;
          case "ds_sf_w": object.StatisticalAnalysis.Soft_discontinuities_W = value; break;
          case "ds_sf_t": object.StatisticalAnalysis.Soft_discontinuities_TS = value; break;
          case "ds_sf_co2": object.StatisticalAnalysis.Soft_discontinuities_C02 = value; break;
          case "ds_sf_h2o": object.StatisticalAnalysis.Soft_discontinuities_H20 = value; break;
          case "ds_sf_ch4": object.StatisticalAnalysis.Soft_discontinuities_CH4 = value; break;
          case "ds_sf_n2o": object.StatisticalAnalysis.Soft_discontinuities_4th = value; break;
          case "ds_sf_var": object.StatisticalAnalysis.Soft_discontinuities_Variances = value; break;
          case "tl_hf_lim": object.StatisticalAnalysis.Accepted_covariance_difference_hard = value; break;
          case "tl_sf_lim": object.StatisticalAnalysis.Accepted_covariance_difference_soft = value; break;
          case "tl_def_co2": object.StatisticalAnalysis.Nominal_CO2_time_lag = value; break;
          case "tl_def_h2o": object.StatisticalAnalysis.Nominal_H20_time_lag = value; break;
          case "tl_def_ch4": object.StatisticalAnalysis.Nominal_CH4_time_lag = value; break;
          case "tl_def_n2o": object.StatisticalAnalysis.Nominal_4th_time_lag = value; break;
          case "aa_min": object.StatisticalAnalysis.Minimum_angle_of_attack = value; break;
          case "aa_max": object.StatisticalAnalysis.Maximum_angle_of_attack = value; break;
          case "aa_lim": object.StatisticalAnalysis.Accepted_amount_outliers = value; break;
        }
        break;
      }
      case "RawProcess_TiltCorrection_Settings":
      {
        switch (key) {
          case "pf_start_date": object.ProcessingOption.Planar_Start = value; break;
          case "pf_end_date": object.ProcessingOption.Planar_End = value; break;
          case "pf_mode": object.ProcessingOption.Time_Lag_Method = value; break;
          case "pf_north_offset": object.ProcessingOption.Planar_North_Offset_First_Sector = value; break;
          case "pf_min_num_per_sec": object.ProcessingOption.Planar_Elements_Per_Sector = value; break;
          case "pf_w_max": object.ProcessingOption.Planar_Max_Mean_Verticle_Wind_Component = value; break;
          case "pf_u_min": object.ProcessingOption.Planar_Min_Mean_Horizontal_Wind_Component = value; break;
        }
        break;
      }
      case "RawProcess_TimelagOptimization_Settings":
      {
        switch (key) {
          case "to_start_date": object.ProcessingOption.Time_Lag_Start = value; break;
          case "to_end_date": object.ProcessingOption.Time_Lag_End = value; break;
          case "to_mode": object.ProcessingOption.Time_Lag_Method = value; break;
          case "to_h2o_nclass": object.ProcessingOption.Time_Lag_RH_Classes = value; break;
          case "to_co2_min_flux": object.ProcessingOption.Time_Lag_Minimum_C02_Flux = value; break;
          case "to_ch4_min_flux": object.ProcessingOption.Time_Lag_Minimum_CH4_Flux = value; break;
          case "to_gas4_min_flux": object.ProcessingOption.Time_Lag_Minimum_Gas_Flux = value; break;
          case "to_pg_range": object.ProcessingOption.Time_Lag_Plausibility_Range_Around_Median_Value = value; break;
          case "to_co2_min_lag": object.ProcessingOption.Time_Lag_Searching_C02_Min = value; break;
          case "to_co2_max_lag": object.ProcessingOption.Time_Lag_Searching_C02_Max = value; break;
          case "to_h2o_min_lag": object.ProcessingOption.Time_Lag_Searching_H20_Min = value; break;
          case "to_h2o_max_lag": object.ProcessingOption.Time_Lag_Searching_H20_Max = value; break;
          case "to_ch4_min_lag": object.ProcessingOption.Time_Lag_Searching_CH4_Min = value; break;
          case "to_ch4_max_lag": object.ProcessingOption.Time_Lag_Searching_CH4_Max = value; break;
          case "to_gas4_min_lag": object.ProcessingOption.Time_Lag_Searching_Gas_Min = value; break;
          case "to_gas4_max_lag": object.ProcessingOption.Time_Lag_Searching_Gas_Max = value; break;
        }
        break;
      }
      case "RawProcess_RandomUncertainty_Settings":
      {
        switch (key) {
          case "ru_meth": object.StatisticalAnalysis.Random_uncertainty_estimation = value; break;
          case "ru_its_meth": object.StatisticalAnalysis.Random_uncertainty_estimation_method = value; break;
          case "ru_tlag_max": object.StatisticalAnalysis.Maximum_correlation_period = value; break;
        }
        break;
      }
      case "RawProcess_BiometMeasurements":
      {
        break;
      }
    }
  }

};
