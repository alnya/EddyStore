module.exports = {
  getMetadata: function(thisData) {

    var formatValue = function(value, decimal) {
      if (value == null && !decimal) return '';
      if (value == null && decimal) return '0.00';
      return value;
    };

    var formatWDFValue = function(value) {
      if (value == null) return '';
      if (value == 'U, V & W') return 'uvw';
      return value;
    };

      var output = ';GHG_METADATA' +
        '\n[Project]' +
        '\ntitle=' +
        '\nid=' +
        '\ncreation_date=' + formatValue(thisData.createdAt) +
        '\nlast_change_date=' + formatValue(thisData.updatedAt) +
        '\nstart_date=' + formatValue(thisData.Date_From) +
        '\nend_date=' + formatValue(thisData.Date_To) +
        '\nfile_name=' + thisData.id + '.metadata' +
        '\nsw_version=5.1.1' +
        '\nini_version=3.1' +
        '\n' +
        '\n[Files]' +
        '\ndata_path=' + formatValue(thisData.Folder_Path) +
        '\nsaved_native=0' +
        '\ntimestamp=0' +
        '\niso_format=0' +
        '\nend_of_line=lf' +
        '\nenable_processing=1' +
        '\ntstamp_end=0' +
        '\n' +
        '\n[Site]' +
        '\nsite_name=' +
        '\nsite_id=' +
        '\naltitude=' + formatValue(thisData.Altitude) +
        '\nlatitude=' + formatValue(thisData.Latitude) +
        '\nlongitude=' + formatValue(thisData.Longitude) +
        '\ncanopy_height=' + formatValue(thisData.Canopy_Height) +
        '\ndisplacement_height=' + formatValue(thisData.Displacement_Height) +
        '\nroughness_length=' + formatValue(thisData.Roughness_Length) +
        '\n' +
        '\n[Station]' +
        '\nstation_name=' + formatValue(thisData.Name) +
        '\nstation_id=' +
        '\n' +
        '\n[Timing]' +
        '\nacquisition_frequency=' + formatValue(thisData.Acquisition_Frequency) +
        '\nfile_duration=' + formatValue(thisData.File_Duration) +
        '\npc_time_settings=local' +
        '\n' +
        '\n[Instruments]';

    if (thisData.Instruments != null) {
      for (var i = 1; i <= thisData.Instruments.length; i++) {
        var instrument = thisData.Instruments[i-1];

        if (instrument.Instrument_Type = 'Anemometer') {
          output = output +
          '\ninstr_' + i + '_manufacturer=' + formatValue(instrument.Manufacturer) +
          '\ninstr_' + i + '_model=' + formatValue(instrument.Model) +
          '\ninstr_' + i + '_id=' + formatValue(instrument.Instrument_Id) +
          '\ninstr_' + i + '_height=' + formatValue(instrument.Height) +
          '\ninstr_' + i + '_wformat=' + formatWDFValue(instrument.Wind_Data_Format) +
          '\ninstr_' + i + '_wref=' +
          '\ninstr_' + i + '_north_offset=' + formatValue(instrument.North_Offset, true) +
          '\ninstr_' + i + '_northward_separation=' + formatValue(instrument.Northward_Separation, true) +
          '\ninstr_' + i + '_eastward_separation=' + formatValue(instrument.Eastward_Separation, true) +
          '\ninstr_' + i + '_vertical_separation=' + formatValue(instrument.Vertical_Separation, true) +
          '\ninstr_' + i + '_vpath_length=' + formatValue(instrument.Longitudinal_Path_Length, true) +
          '\ninstr_' + i + '_hpath_length=' + formatValue(instrument.Transversal_Path_Length, true) +
          '\ninstr_' + i + '_tau=' + formatValue(instrument.Time_Response, true);
        } else {
          output = output +
          '\ninstr_' + i + '_manufacturer=' + formatValue(instrument.Manufacturer) +
          '\ninstr_' + i + '_model=' + formatValue(instrument.Model) +
          '\ninstr_' + i + '_sw_version=' + formatValue(instrument.Software_Version) +
          '\ninstr_' + i + '_id=' + formatValue(instrument.Instrument_Id) +
          '\ninstr_' + i + '_tube_length=' + formatValue(instrument.Tube_Length) +
          '\ninstr_' + i + '_tube_diameter=' + formatValue(instrument.Tube_Inner_Diameter) +
          '\ninstr_' + i + '_tube_flowrate=' + formatValue(instrument.Nominal_Tube_Flow_Rate) +
          '\ninstr_' + i + '_northward_separation=' + formatValue(instument.Northward_Separation) +
          '\ninstr_' + i + '_eastward_separation=' + formatValue(instrument.Eastward_Separation) +
          '\ninstr_' + i + '_vertical_separation=' +formatValue( instrument.Vertical_Separation) +
          '\ninstr_' + i + '_vpath_length=' + formatValue(instrument.Longitudinal_Path_Length) +
          '\ninstr_' + i + '_hpath_length=' + formatValue(instrument.Transversal_Path_Length) +
          '\ninstr_' + i + '_tau=' + formatValue(instrument.Time_Response) +
          '\ninstr_' + i + '_kw=' + formatValue(instrument.Extinction_Coefficient_In_Water_KW) +
          '\ninstr_' + i + '_ko=' + formatValue(instrument.Extinction_Coefficient_In_Water_KO);
        }
      }
    }

      output = output + '\n' + '\n[FileDescription]' +
      '\nseparator=' + thisData.Field_Separator_Character +
      '\nheader_rows=' + thisData.Number_Of_Header_Rows +
      '\ndata_label=Not set';

    if (thisData.Columns != null) {
      for (var i = 1; i <= thisData.Columns.length; i++) {
        var column = thisData.Columns[i-1];

        output = output +
        '\ncol_' + i + '_variable=' + (column.Numeric ? column.Variable : 'not_numeric') +
        '\ncol_' + i + '_instrument=' + formatValue(column.Instrument) +
        '\ncol_' + i + '_measure_type=' + formatValue(column.Measurement_Type) +
        '\ncol_' + i + '_unit_in=' + formatValue(column.Input_Unit) +
        '\ncol_' + i + '_min_value=0.000000' +
        '\ncol_' + i + '_max_value=0.000000' +
        '\ncol_' + i + '_conversion=' +
        '\ncol_' + i + '_unit_out=' + formatValue(column.Output_Unit) +
        '\ncol_' + i + '_a_value=' +
        '\ncol_' + i + '_b_value=' +
        '\ncol_' + i + '_nom_timelag=' + formatValue(column.Nominal_Time_Lag, true) +
        '\ncol_' + i + '_min_timelag=' + formatValue(column.Minimum_Time_Lag, true) +
        '\ncol_' + i + '_max_timelag=' + formatValue(column.Maximum_Time_Lag, true);
      }
    }

    return (output);
  },

  getReport: function(thisReport, folder_path, output_path) {

    var spectral = thisReport.SpectralCorrection;
    var processing = thisReport.ProcessingOption;
    var statistical = thisReport.StatisticalAnalysis;

    var formatValue = function(value, decimal) {
      if (value == null && !decimal) return '';
      if (value == null && decimal) return '0.00';
      return value;
    };

    var getVariableColumn = function(val) {

      for (var i = 0; i < thisReport.Variables.length; i++) {
        var variable = thisReport.Variables[i];
        if (variable.Variable == val) {
          DataColumn.findOne(variable.DataColumn)
            .exec(function (err, thisCol) {
              return thisCol.Column_Number;
            });
        }
      }

      return 0;
    };

    var output = ';EDDYPRO_PROCESSING' +
        '\n[Project]' +
        '\ncreation_date=' + thisReport.createdAt +
        '\nlast_change_date=' + thisReport.updatedAt +
        '\nfile_name=' + thisReport.id + '.eddypro' +
        '\nrun_mode=0' +
        '\nrun_fcc=0' +
        '\nproject_title=' + thisReport.Name +
        '\nsw_version=5.2.0' +
        '\nini_version=4.3' +
        '\nproject_id=run1_Ibrom' +
        '\nfile_type=1' +
        '\nfile_prototype=EC_EB_yyyy_mm_dd_HH_MM.dat' +
        '\nuse_pfile=1' +
        '\nproj_file=' + sails.config.eddyProConfig.directory + thisReport.id + '.metadata' +
        '\nuse_dyn_md_file=0' +
        '\ndyn_metadata_file=' +
        '\nbinary_hnlines=-1' +
        '\nbinary_eol=-1' +
        '\nbinary_nbytes=-1' +
        '\nbinary_little_end=-1' +
        '\nmaster_sonic=' + thisReport.Master_Anemometer +
        '\ncol_co2=' + getVariableColumn(9) +
        '\ncol_h2o=' + getVariableColumn(10) +
        '\ncol_ch4=' + getVariableColumn(11) +
        '\ncol_n2o=' + getVariableColumn(12) +
        '\ncol_int_t_1=' + getVariableColumn(21) +
        '\ncol_int_t_2=' + getVariableColumn(22) +
        '\ncol_int_p=' + getVariableColumn(23) +
        '\ncol_air_t=' + getVariableColumn(24) +
        '\ncol_air_p=' + getVariableColumn(25) +
        '\ncol_cell_t=' + getVariableColumn(7) +
        '\ncol_diag_75=' + getVariableColumn(26) +
        '\ncol_diag_72=' + getVariableColumn(27) +
        '\ncol_diag_77=' + getVariableColumn(28) +
        '\ngas_mw=0.0000' +
        '\ngas_diff=0.00000' +
        '\ncol_ts=' + getVariableColumn(6) +
        '\nout_ghg_eu=0' +
        '\nout_amflux=0' +
        '\nout_rich=1' +
        '\nout_metadata=1' +
        '\nout_biomet=0' +
        '\nmake_dataset=0' +
        '\npr_subset=0' +
        '\npr_start_date=2007-01-01' +
        '\npr_start_time=00:00' +
        '\npr_end_date=2007-12-19' +
        '\npr_end_time=11:30' +
        '\nhf_meth=1' +
        '\nlf_meth=1' +
        '\nwpl_meth=1' +
        '\nfoot_meth=0' +
        '\ntob1_format=0' +
        '\nout_path=' + output_path +
        '\nfix_out_format=0' +
        '\nerr_label=-9999.0' +
        '\nqc_meth=1' +
        '\nuse_biom=0' +
        '\nbiom_file=' +
        '\nbiom_dir=' +
        '\nbiom_rec=0' +
        '\nbiom_ext=.txt' +
        '\nout_mean_cosp=0' +
        '\nbin_sp_avail=0' +
        '\nfull_sp_avail=0' +
        '\nfiles_found=14544' +
        '\n';

        if (spectral != null) {

          output = output + '\n[FluxCorrection_SpectralAnalysis_General]' +
          '\nsa_start_date=' + formatValue(spectral.Subperiod_Start) +
          '\nsa_end_date=' + formatValue(spectral.Subperiod_End) +
          '\nsa_mode=1' +
          '\nsa_file=' +
          '\nsa_min_smpl=' + formatValue(spectral.Minimum_Number_Of_Spectra) +
          '\nsa_fmin_co2=' + formatValue(spectral.Lowest_Frequency_CO2) +
          '\nsa_fmin_h2o=' + formatValue(spectral.Lowest_Frequency_H20) +
          '\nsa_fmin_ch4=' + formatValue(spectral.Lowest_Frequency_CH4) +
          '\nsa_fmin_gas4=' + formatValue(spectral.Lowest_Frequency_Gas) +
          '\nsa_fmax_co2=' + formatValue(spectral.Highest_Frequency_CO2) +
          '\nsa_fmax_h2o=' + formatValue(spectral.Highest_Frequency_H20) +
          '\nsa_fmax_ch4=' + formatValue(spectral.Highest_Frequency_CH4) +
          '\nsa_fmax_gas4=' + formatValue(spectral.Highest_Frequency_Gas) +
          '\nsa_hfn_co2_fmin=5' +
          '\nsa_hfn_h2o_fmin=5' +
          '\nsa_hfn_ch4_fmin=5' +
          '\nsa_hfn_gas4_fmin=5' +
          '\nsa_min_co2=' + formatValue(spectral.Minimum_CO2_Flux) +
          '\nsa_min_ch4=' + formatValue(spectral.Minimum_CH4_Flux) +
          '\nsa_min_gas4=' + formatValue(spectral.Minimum_Gas_Flux) +
          '\nsa_min_le=20' +
          '\nsa_min_h=20' +
          '\nadd_sonic_lptf=1' +
          '\nf10_co2_trshld=' + formatValue(spectral.Threshold_Flux_CO2) +
          '\nf10_ch4_trshld=' + formatValue(spectral.Threshold_Flux_CH4) +
          '\nf10_gas4_trshld=' + formatValue(spectral.Threshold_Flux_Gas) +
          '\nf10_le_trshld=10' +
          '\nf10_h_trshld=10' +
          '\nhorst_lens=2' +
          '\nex_file=' +
          '\nsa_bin_spectra=' +
          '\nsa_full_spectra=' +
          '\nex_dir=' +
          '\nsa_subset=0' +
          '\nsa_co2_g1_start=1' +
          '\nsa_co2_g1_stop=12' +
          '\nsa_ch4_g1_start=1' +
          '\nsa_ch4_g1_stop=12' +
          '\nsa_gas4_g1_start=1' +
          '\nsa_gas4_g1_stop=12' +
          '\n';
        }

        output = output + '\n[RawProcess_General]' +
        '\ndata_path=' + folder_path +
        '\nrecurse=' +
        '\nuse_geo_north=' +
        '\nmag_dec=' +
        '\ndec_date=';

    var getVariableColumn = function(v) {
      if (flag.DataColumn == null) return 0;
      DataColumn.findOne(flag.DataColumn)
        .exec(function (err, thisCol) {
          return thisCol.Column_Number;
        });
    };

    // flags
    if (thisReport.Flags != null) {
      for (var i = 1; i <= thisReport.Flags.length; i++) {
        var flag = thisReport.Flags[i-1];

        output = output + '' +
        '\nflag' + i + '_column=' + getVariableColumn(flag.DataColumn) +
        '\nflag' + i + '_threshold=' + flag.Threshold +
        '\nflag' + i + '_upper=1' +
        '\n';
      }
    }

    if (processing) {
      output = output + '\n[RawProcess_Settings]' +
      '\nnfiles=' +
      '\nmax_lack=' +
      '\nu_offset=' + processing.U +
      '\nv_offset=' + processing.V +
      '\nw_offset=' + processing.W +
      '\ncross_wind=' + processing.Angle_Of_Attack_Correction_For_Wind_Components +
      '\nflow_distortion=' +
      '\nrot_meth=' + processing.Rotation_Method +
      '\ndetrend_meth=' + processing.Detrend_Method +
      '\ntimeconst=' + processing.Turbulent_Fluctuations_Time_Constant +
      '\ntlag_meth=' + processing.Time_Lag_Method +
      '\ntap_win=' +
      '\nnbins=' +
      '\navrg_len=' +
      '\nout_bin_sp=' +
      '\nout_bin_og=' +
      '\nout_full_sp_u=' +
      '\nout_full_sp_v=' +
      '\nout_full_sp_w=' +
      '\nout_full_sp_ts=' +
      '\nout_full_sp_co2=' +
      '\nout_full_sp_h2o=' +
      '\nout_full_sp_ch4=' +
      '\nout_full_sp_n2o=' +
      '\nout_st_1=' +
      '\nout_st_2=' +
      '\nout_st_3=' +
      '\nout_st_4=' +
      '\nout_st_5=' +
      '\nout_st_6=' +
      '\nout_st_7=' +
      '\nout_raw_1=' +
      '\nout_raw_2=' +
      '\nout_raw_3=' +
      '\nout_raw_4=' +
      '\nout_raw_5=' +
      '\nout_raw_6=' +
      '\nout_raw_7=' +
      '\nout_raw_u=' +
      '\nout_raw_v=' +
      '\nout_raw_w=' +
      '\nout_raw_ts=' +
      '\nout_raw_co2=' +
      '\nout_raw_h2o=' +
      '\nout_raw_ch4=' +
      '\nout_raw_gas4=' +
      '\nout_raw_t_air=' +
      '\nout_raw_p_air=' +
      '\nout_full_cosp_w_u=' +
      '\nout_full_cosp_w_v=' +
      '\nout_full_cosp_w_ts=' +
      '\nout_full_cosp_w_co2=' +
      '\nout_full_cosp_w_h2o=' +
      '\nout_full_cosp_w_ch4=' +
      '\nout_full_cosp_w_n2o=' +
      '\nto_mixratio=' +
      '\nfilter_sr=' +
      '\nfilter_al=' +
      '\nbu_corr=' + statistical.Add_Instrument_Sensible_Heat_Components +
      '\nbu_multi=' + statistical.Surface_Temperature_Estimations +
      '\nl_day_bot_gain=' + statistical.Day_Bottom_Gain +
      '\nl_day_bot_offset=' + statistical.Day_Bottom_Offset +
      '\nl_day_top_gain=' + statistical.Day_Top_Gain +
      '\nl_day_top_offset=' + statistical.Day_Top_Offset +
      '\nl_day_spar_gain=' + statistical.Day_Spar_Gain +
      '\nl_day_spar_offset=' + statistical.Day_Spar_Offset +
      '\nl_night_bot_gain=' + statistical.Night_Bottom_Gain +
      '\nl_night_bot_offset=' + statistical.Night_Bottom_Offset +
      '\nl_night_top_gain=' + statistical.Night_Top_Gain +
      '\nl_night_top_offset=' + statistical.Night_Top_Offset +
      '\nl_night_spar_gain=' + statistical.Night_Spar_Gain +
      '\nl_night_spar_offset=' + statistical.Night_Spar_Offset +
      '\nm_day_bot1=' + statistical.Day_Bottom_1 +
      '\nm_day_bot2=' +statistical.Day_Bottom_2 +
      '\nm_day_bot3=' +statistical.Day_Bottom_3 +
      '\nm_day_bot4=' +statistical.Day_Bottom_4 +
      '\nm_day_top1=' +statistical.Day_Top_1 +
      '\nm_day_top2=' +statistical.Day_Top_2 +
      '\nm_day_top3=' +statistical.Day_Top_3 +
      '\nm_day_top4=' +statistical.Day_Top_4 +
      '\nm_day_spar1=' +statistical.Day_Spar_1 +
      '\nm_day_spar2=' +statistical.Day_Spar_2 +
      '\nm_day_spar3=' +statistical.Day_Spar_3 +
      '\nm_day_spar4=' +statistical.Day_Spar_4 +
      '\nm_night_bot1=' + statistical.Night_Bottom_1 +
      '\nm_night_bot2=' + statistical.Night_Bottom_2 +
      '\nm_night_bot3=' + statistical.Night_Bottom_3 +
      '\nm_night_bot4=' + statistical.Night_Bottom_4 +
      '\nm_night_top1=' + statistical.Night_Top_1 +
      '\nm_night_top2=' + statistical.Night_Top_2 +
      '\nm_night_top3=' + statistical.Night_Top_3 +
      '\nm_night_top4=' + statistical.Night_Top_4 +
      '\nm_night_spar1=' + statistical.Night_Spar_1 +
      '\nm_night_spar2=' + statistical.Night_Spar_2 +
      '\nm_night_spar3=' + statistical.Night_Spar_3 +
      '\nm_night_spar4=' + statistical.Night_Spar_4 +
      '\nout_qc_details=' + processing.Quality_Check +
      '\npower_of_two=' + processing.Power_Of_Two_Samples +
      '\n';
    }

    if (statistical != null) {
      output = output + '\n[RawProcess_Tests]' +
      '\ntest_sr=' + statistical.Spike_count +
      '\ntest_ar=' + statistical.Amplitude_resolution +
      '\ntest_do=' + statistical.Drop_outs +
      '\ntest_al=' + statistical.Absolute_limits +
      '\ntest_sk=' + statistical.Skewness_Kurtosis +
      '\ntest_ds=' + statistical.Discontinuities +
      '\ntest_tl=' + statistical.Time_lags +
      '\ntest_aa=' + statistical.Angle_of_attack +
      '\ntest_ns=' + statistical.Steadiness_of_horizontal_wind +
      '\n';

      output = output + '\n[RawProcess_ParameterSettings]' +
      '\nsr_num_spk=' + statistical.Accepted_spikes +
      '\nsr_lim_u=' +
      '\nsr_lim_w=' + statistical.Plausibility_ranges_W +
      '\nsr_lim_co2=' + statistical.Plausibility_ranges_CO2 +
      '\nsr_lim_h2o=' + statistical.Plausibility_ranges_H20 +
      '\nsr_lim_ch4=' + statistical.Plausibility_ranges_CH4 +
      '\nsr_lim_n2o=' + statistical.Plausibility_ranges_4th +
      '\nsr_lim_hf=' + statistical.Plausibility_ranges_Other +
      '\nar_lim=' + statistical.Range_of_variation +
      '\nar_bins=' + statistical.Number_of_bins +
      '\nar_hf_lim=' + statistical.Accepted_empty_bins +
      '\ndo_extlim_dw=' + statistical.Percentile_defining_extreme_bins +
      '\ndo_hf1_lim=' + statistical.Accepted_central_dropouts +
      '\ndo_hf2_lim=' + statistical.Accepted_extreme_dropouts +
      '\nal_u_max=' + statistical.Absolute_limits_max_U +
      '\nal_w_max=' + statistical.Absolute_limits_max_W +
      '\nal_tson_min=' + statistical.Absolute_limits_min_TS +
      '\nal_tson_max=' + statistical.Absolute_limits_max_TS +
      '\nal_co2_min=' + statistical.Absolute_limits_min_C02 +
      '\nal_co2_max=' + statistical.Absolute_limits_max_C02 +
      '\nal_h2o_min=' + statistical.Absolute_limits_min_H20 +
      '\nal_h2o_max=' + statistical.Absolute_limits_max_H20 +
      '\nal_ch4_min=' + statistical.Absolute_limits_min_CH4 +
      '\nal_ch4_max=' + statistical.Absolute_limits_max_CH4 +
      '\nal_n2o_min=' + statistical.Absolute_limits_min_4th +
      '\nal_n2o_max=' + statistical.Absolute_limits_max_4th +
      '\nsk_hf_skmin=' + statistical.Hard_skewness_lower_limit +
      '\nsk_hf_skmax=' + statistical.Hard_skewness_upper_limit +
      '\nsk_sf_skmin=' + statistical.Soft_skewness_lower_limit +
      '\nsk_sf_skmax=' + statistical.Soft_Skewness_upper_limit +
      '\nsk_hf_kumin=' + statistical.Hard_kurtosis_lower_limit +
      '\nsk_hf_kumax=' + statistical.Hard_kurtosis_upper_limit +
      '\nsk_sf_kumin=' + statistical.Soft_Kurtosis_lower_limit +
      '\nsk_sf_kumax=' + statistical.Soft_Kurtosis_upper_limit +
      '\nds_hf_uv=' + statistical.Hard_discontinuities_U +
      '\nds_hf_w=' + statistical.Hard_discontinuities_W +
      '\nds_hf_t=' + statistical.Hard_discontinuities_TS +
      '\nds_hf_co2=' + statistical.Hard_discontinuities_C02 +
      '\nds_hf_h2o=' + statistical.Hard_discontinuities_H20 +
      '\nds_hf_ch4=' + statistical.Hard_discontinuities_CH4 +
      '\nds_hf_n2o=' + statistical.Hard_discontinuities_4th +
      '\nds_hf_var=' + statistical.Hard_discontinuities_Variances +
      '\nds_sf_uv=' + statistical.Soft_discontinuities_U +
      '\nds_sf_w=' + statistical.Soft_discontinuities_W +
      '\nds_sf_t=' + statistical.Soft_discontinuities_TS +
      '\nds_sf_co2=' + statistical.Soft_discontinuities_C02 +
      '\nds_sf_h2o=' + statistical.Soft_discontinuities_H20 +
      '\nds_sf_ch4=' + statistical.Soft_discontinuities_CH4 +
      '\nds_sf_n2o=' + statistical.Soft_discontinuities_4th +
      '\nds_sf_var=' + statistical.Soft_discontinuities_Variances +
      '\ntl_hf_lim=' + statistical.Accepted_covariance_difference_hard +
      '\ntl_sf_lim=' + statistical.Accepted_covariance_difference_soft +
      '\ntl_def_co2=' + statistical.Nominal_CO2_time_lag +
      '\ntl_def_h2o=' + statistical.Nominal_H20_time_lag +
      '\ntl_def_ch4=' + statistical.Nominal_CH4_time_lag +
      '\ntl_def_n2o=' + statistical.Nominal_4th_time_lag +
      '\naa_min=' + statistical.Minimum_angle_of_attack +
      '\naa_max=' + statistical.Maximum_angle_of_attack +
      '\naa_lim=' + statistical.Accepted_amount_outliers +
      '\nns_hf_lim=' +
      '\n';
    }

    output = output + '\n[RawProcess_TiltCorrection_Settings]' +
      '\npf_start_date=' +
      '\npf_end_date=' +
      '\npf_mode=' +
      '\npf_north_offset=' +
      '\npf_min_num_per_sec=' +
      '\npf_w_max=' +
      '\npf_u_min=' +
      '\npf_file=' +
      '\npf_fix=' +
      '\npf_subset=' +
      '\n';

    if (processing != null) {
      output = output + '\n[RawProcess_TimelagOptimization_Settings]' +
      '\nto_start_date=' + processing.Time_Lag_Start +
      '\nto_end_date=' + processing.Time_Lag_End +
      '\nto_mode=' + processing.Time_Lag_Method +
      '\nto_file=' +
      '\nto_h2o_nclass=' + processing.Time_Lag_RH_Classes +
      '\nto_co2_min_flux=' + processing.Time_Lag_Minimum_C02_Flux +
      '\nto_ch4_min_flux=' + processing.Time_Lag_Minimum_CH4_Flux +
      '\nto_gas4_min_flux=' + processing.Time_Lag_Minimum_Gas_Flux +
      '\nto_le_min_flux=' +
      '\nto_pg_range=' + processing.Time_Lag_Plausibility_Range_Around_Median_Value +
      '\nto_co2_min_lag=' + processing.Time_Lag_Searching_C02_Min +
      '\nto_co2_max_lag=' + processing.Time_Lag_Searching_C02_Max +
      '\nto_h2o_min_lag=' + processing.Time_Lag_Searching_H20_Min +
      '\nto_h2o_max_lag=' + processing.Time_Lag_Searching_H20_Max +
      '\nto_ch4_min_lag=' + processing.Time_Lag_Searching_CH4_Min +
      '\nto_ch4_max_lag=' + processing.Time_Lag_Searching_CH4_Max +
      '\nto_gas4_min_lag=' + processing.Time_Lag_Searching_Gas_Min +
      '\nto_gas4_max_lag=' + processing.Time_Lag_Searching_Gas_Max +
      '\nto_subset=' +
      '\n';
    }

    if (statistical != null) {
      output = output + '\n[RawProcess_RandomUncertainty_Settings]' +
      '\nru_meth=' + statistical.Random_uncertainty_estimation +
      '\nru_its_meth=' + statistical.Random_uncertainty_estimation_method +
      '\nru_tlag_max=' + statistical.Maximum_correlation_period +
      '\n';
    }

    output = output + '\n[RawProcess_BiometMeasurements]' +
      '\nbiom_use_native_header=' +
      '\nbiom_hlines=' +
      '\nbiom_separator=' +
      '\nbiom_tstamp_ref=' +
      '\nbiom_ta=' +
      '\nbiom_pa=' +
      '\nbiom_rh=' +
      '\nbiom_rg=' +
      '\nbiom_lwin=' +
      '\nbiom_ppfd=';

    return output;
  }
}
