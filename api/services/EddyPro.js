var fs = require('fs');

module.exports = {

  buildFolderStructure: function(id) {
    var rootPath = EddyPro.getWorkingFolder(id);
    console.log("Building Eddy Pro Folders at " + rootPath);

    fs.mkdir(rootPath);
    fs.mkdir(rootPath + '/ini');
    fs.mkdir(rootPath + '/output');
    fs.mkdir(rootPath + '/raw_files');
  },

  getWorkingFolder: function(id) {
    return sails.config.eddyProConfig.directory + id;
  },

  getDataFolder: function(id) {
    return EddyPro.getWorkingFolder(id) + '/raw_files';
  },

  getMetadataFilePath: function(id) {
    return EddyPro.getWorkingFolder(id) + '/' + id + '.metadata';
  },

  getOutputFolder: function(id) {
    return EddyPro.getWorkingFolder(id) + '/output';
  },

  getEddyProFilePath: function(id) {
    return EddyPro.getWorkingFolder(id) + '/ini/processing.eddypro';
  },

  getMetadata: function(thisData) {

    var formatWDFValue = function(value) {
      if (value == null) return '';
      if (value == 'U, V & W') return 'uvw';
      return value;
    };

      var output = ';GHG_METADATA' +
        '\n[Project]' +
        '\ntitle=' +
        '\nid=' +
        '\ncreation_date=' + EddyPro.formatDateValue(thisData.createdAt) +
        '\nlast_change_date=' + EddyPro.formatDateValue(thisData.updatedAt) +
        '\nstart_date=' + EddyPro.formatDateValue(thisData.Date_From) +
        '\nend_date=' + EddyPro.formatDateValue(thisData.Date_To) +
        '\nfile_name=' + EddyPro.getMetadataFilePath(thisData.id) +
        '\nsw_version=5.1.1' +
        '\nini_version=3.1' +
        '\n' +
        '\n[Files]' +
        '\ndata_path=' + EddyPro.getDataFolder(thisData.id) +
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
        '\naltitude=' + EddyPro.formatValue(thisData.Altitude) +
        '\nlatitude=' + EddyPro.formatValue(thisData.Latitude) +
        '\nlongitude=' + EddyPro.formatValue(thisData.Longitude) +
        '\ncanopy_height=' + EddyPro.formatValue(thisData.Canopy_Height) +
        '\ndisplacement_height=' + EddyPro.formatValue(thisData.Displacement_Height) +
        '\nroughness_length=' + EddyPro.formatValue(thisData.Roughness_Length) +
        '\n' +
        '\n[Station]' +
        '\nstation_name=' + EddyPro.formatValue(thisData.Name) +
        '\nstation_id=' +
        '\n' +
        '\n[Timing]' +
        '\nacquisition_frequency=' + EddyPro.formatValue(thisData.Acquisition_Frequency) +
        '\nfile_duration=' + EddyPro.formatValue(thisData.File_Duration) +
        '\npc_time_settings=local' +
        '\n' +
        '\n[Instruments]';

    if (thisData.Instruments != null) {
      for (var i = 1; i <= thisData.Instruments.length; i++) {
        var instrument = thisData.Instruments[i-1];

        if (instrument.Instrument_Type == 'Anemometer') {
          output = output +
          '\ninstr_' + i + '_manufacturer=' + EddyPro.formatValue(instrument.Manufacturer) +
          '\ninstr_' + i + '_model=' + EddyPro.formatValue(instrument.Model) +
          '\ninstr_' + i + '_id=' + EddyPro.formatValue(instrument.Instrument_Id) +
          '\ninstr_' + i + '_height=' + EddyPro.formatValue(instrument.Height) +
          '\ninstr_' + i + '_wformat=' + formatWDFValue(instrument.Wind_Data_Format) +
          '\ninstr_' + i + '_wref=' +
          '\ninstr_' + i + '_north_offset=' + EddyPro.formatValue(instrument.North_Offset, true) +
          '\ninstr_' + i + '_northward_separation=' + EddyPro.formatValue(instrument.Northward_Separation, true) +
          '\ninstr_' + i + '_eastward_separation=' + EddyPro.formatValue(instrument.Eastward_Separation, true) +
          '\ninstr_' + i + '_vertical_separation=' + EddyPro.formatValue(instrument.Vertical_Separation, true) +
          '\ninstr_' + i + '_vpath_length=' + EddyPro.formatValue(instrument.Longitudinal_Path_Length, true) +
          '\ninstr_' + i + '_hpath_length=' + EddyPro.formatValue(instrument.Transversal_Path_Length, true) +
          '\ninstr_' + i + '_tau=' + EddyPro.formatValue(instrument.Time_Response, true);
        } else {
          output = output +
          '\ninstr_' + i + '_manufacturer=' + EddyPro.formatValue(instrument.Manufacturer) +
          '\ninstr_' + i + '_model=' + EddyPro.formatValue(instrument.Model) +
          '\ninstr_' + i + '_sw_version=' + EddyPro.formatValue(instrument.Software_Version) +
          '\ninstr_' + i + '_id=' + EddyPro.formatValue(instrument.Instrument_Id) +
          '\ninstr_' + i + '_tube_length=' + EddyPro.formatValue(instrument.Tube_Length) +
          '\ninstr_' + i + '_tube_diameter=' + EddyPro.formatValue(instrument.Tube_Inner_Diameter) +
          '\ninstr_' + i + '_tube_flowrate=' + EddyPro.formatValue(instrument.Nominal_Tube_Flow_Rate) +
          '\ninstr_' + i + '_northward_separation=' + EddyPro.formatValue(instrument.Northward_Separation) +
          '\ninstr_' + i + '_eastward_separation=' + EddyPro.formatValue(instrument.Eastward_Separation) +
          '\ninstr_' + i + '_vertical_separation=' +EddyPro.formatValue( instrument.Vertical_Separation) +
          '\ninstr_' + i + '_vpath_length=' + EddyPro.formatValue(instrument.Longitudinal_Path_Length) +
          '\ninstr_' + i + '_hpath_length=' + EddyPro.formatValue(instrument.Transversal_Path_Length) +
          '\ninstr_' + i + '_tau=' + EddyPro.formatValue(instrument.Time_Response) +
          '\ninstr_' + i + '_kw=' + EddyPro.formatValue(instrument.Extinction_Coefficient_In_Water_KW) +
          '\ninstr_' + i + '_ko=' + EddyPro.formatValue(instrument.Extinction_Coefficient_In_Water_KO);
        }
      }
    }

      output = output + '\n' + '\n[FileDescription]' +
      '\nseparator=' + thisData.Field_Separator_Character.toLowerCase() +
      '\nheader_rows=' + thisData.Number_Of_Header_Rows +
      '\ndata_label=Not set';

    if (thisData.Columns != null) {
      for (var i = 1; i <= thisData.Columns.length; i++) {
        var column = thisData.Columns[i-1];

        output = output +
        '\ncol_' + i + '_variable=' + (column.Numeric ? EddyPro.getVariable(column.Variable) : 'not_numeric') +
        '\ncol_' + i + '_instrument=' + EddyPro.formatValue(column.Instrument) +
        '\ncol_' + i + '_measure_type=' + EddyPro.getMeasureType(column.Measurement_Type) +
        '\ncol_' + i + '_unit_in=' + EddyPro.getInputUnit(column.Input_Unit) +
        '\ncol_' + i + '_min_value=0.000000' +
        '\ncol_' + i + '_max_value=0.000000' +
        '\ncol_' + i + '_conversion=' +
        '\ncol_' + i + '_unit_out=' + EddyPro.getInputUnit(column.Output_Unit) +
        '\ncol_' + i + '_a_value=1.000000' +
        '\ncol_' + i + '_b_value=0.000000' +
        '\ncol_' + i + '_nom_timelag=' + EddyPro.formatValue(column.Nominal_Time_Lag, true) +
        '\ncol_' + i + '_min_timelag=' + EddyPro.formatValue(column.Minimum_Time_Lag, true) +
        '\ncol_' + i + '_max_timelag=' + EddyPro.formatValue(column.Maximum_Time_Lag, true);
      }
    }

    return (output);
  },

  getReport: function(thisReport, thisData) {

    var spectral = thisReport.SpectralCorrection;
    if (spectral == null) spectral = SpectralCorrection.create();

    var processing = thisReport.ProcessingOption;
    if (processing == null) processing = ProcessingOption.create();

    var statistical = thisReport.StatisticalAnalysis;
    if (statistical == null) statistical = StatisticalAnalysis.create();

    var output = thisReport.Output;
    if (output == null) output = new Output._model();

    var getVariableColumn = function(val) {

      for (var i = 0; i < thisReport.Variables.length; i++) {
        var variable = thisReport.Variables[i];
        if (variable.Variable == val && variable.DataColumn != null) {
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
        '\ncreation_date=' + EddyPro.formatDateValue(thisReport.createdAt) +
        '\nlast_change_date=' + EddyPro.formatDateValue(thisReport.updatedAt) +
        '\nfile_name=' + EddyPro.getEddyProFilePath(thisData.id) +
        '\nrun_mode=0' +
        '\nrun_fcc=0' +
        '\nproject_title=' + thisReport.Name +
        '\nsw_version=5.2.0' +
        '\nini_version=4.3' +
        '\nproject_id=run1_Ibrom' +
        '\nfile_type=1' +
        '\nfile_prototype=EC_EB_yyyy_mm_dd_HH_MM.dat' +
        '\nuse_pfile=1' +
        '\nproj_file=' + EddyPro.getMetadataFilePath(thisData.id) +
        '\nuse_dyn_md_file=0' +
        '\ndyn_metadata_file=' +
        '\nbinary_hnlines=-1' +
        '\nbinary_eol=-1' +
        '\nbinary_nbytes=-1' +
        '\nbinary_little_end=-1' +
        '\nmaster_sonic=' + (thisReport.Master_Anemometer != null ? thisReport.Master_Anemometer.Model : '') +
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
        '\nout_ghg_eu=' + output.GHG_Europe +
        '\nout_amflux=' + output.AmeriFlux +
        '\nout_rich=0' +
        '\nout_metadata=' + output.Metadata +
        '\nout_biomet=' + output.Biomet_Measurements +
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
        '\nout_path=' + EddyPro.getOutputFolder(thisData.id) +
        '\nfix_out_format=' + (output.Output_Format == "Use standard output format" ? 1 : 0) +
        '\nerr_label=' + output.Error_Label +
        '\nqc_meth=1' +
        '\nuse_biom=0' +
        '\nbiom_file=' +
        '\nbiom_dir=' +
        '\nbiom_rec=0' +
        '\nbiom_ext=.txt' +
        '\nout_mean_cosp=' + output.Spectral_Output_Averaged_Cospectra +
        '\nbin_sp_avail=0' +
        '\nfull_sp_avail=0' +
        '\nfiles_found=14544' +
        '\n';

        if (spectral != null) {

          output = output + '\n[FluxCorrection_SpectralAnalysis_General]' +
          '\nsa_start_date=' + EddyPro.formatDateValue(spectral.Subperiod_Start) +
          '\nsa_end_date=' + EddyPro.formatDateValue(spectral.Subperiod_End) +
          '\nsa_mode=1' +
          '\nsa_file=' +
          '\nsa_min_smpl=' + EddyPro.formatValue(spectral.Minimum_Number_Of_Spectra) +
          '\nsa_fmin_co2=' + EddyPro.formatValue(spectral.Lowest_Frequency_CO2) +
          '\nsa_fmin_h2o=' + EddyPro.formatValue(spectral.Lowest_Frequency_H20) +
          '\nsa_fmin_ch4=' + EddyPro.formatValue(spectral.Lowest_Frequency_CH4) +
          '\nsa_fmin_gas4=' + EddyPro.formatValue(spectral.Lowest_Frequency_Gas) +
          '\nsa_fmax_co2=' + EddyPro.formatValue(spectral.Highest_Frequency_CO2) +
          '\nsa_fmax_h2o=' + EddyPro.formatValue(spectral.Highest_Frequency_H20) +
          '\nsa_fmax_ch4=' + EddyPro.formatValue(spectral.Highest_Frequency_CH4) +
          '\nsa_fmax_gas4=' + EddyPro.formatValue(spectral.Highest_Frequency_Gas) +
          '\nsa_hfn_co2_fmin=5' +
          '\nsa_hfn_h2o_fmin=5' +
          '\nsa_hfn_ch4_fmin=5' +
          '\nsa_hfn_gas4_fmin=5' +
          '\nsa_min_co2=' + EddyPro.formatValue(spectral.Minimum_CO2_Flux) +
          '\nsa_min_ch4=' + EddyPro.formatValue(spectral.Minimum_CH4_Flux) +
          '\nsa_min_gas4=' + EddyPro.formatValue(spectral.Minimum_Gas_Flux) +
          '\nsa_min_le=20' +
          '\nsa_min_h=20' +
          '\nadd_sonic_lptf=1' +
          '\nf10_co2_trshld=' + EddyPro.formatValue(spectral.Threshold_Flux_CO2) +
          '\nf10_ch4_trshld=' + EddyPro.formatValue(spectral.Threshold_Flux_CH4) +
          '\nf10_gas4_trshld=' + EddyPro.formatValue(spectral.Threshold_Flux_Gas) +
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
        '\ndata_path=' + EddyPro.getWorkingFolder(thisData.id) +
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
        '\nflag' + i + '_threshold=' + EddyPro.formatValue(flag.Threshold) +
        '\nflag' + i + '_upper=1';
      }
    }

    if (processing && output) {
      output = output + '\n[RawProcess_Settings]' +
      '\nnfiles=' +
      '\nmax_lack=' +
      '\nu_offset=' + processing.U +
      '\nv_offset=' + processing.V +
      '\nw_offset=' + processing.W +
      '\ncross_wind=' + processing.Angle_Of_Attack_Correction_For_Wind_Components +
      '\nflow_distortion=' +
      '\nrot_meth=' + EddyPro.getLookupValue("Rotation_Method", processing.Rotation_Method) +
      '\ndetrend_meth=' + EddyPro.getLookupValue("Detrend_Method", processing.Detrend_Method) +
      '\ntimeconst=' + processing.Turbulent_Fluctuations_Time_Constant +
      '\ntlag_meth=' + EddyPro.getLookupValue("Time_Lag_Method", processing.Time_Lag_Method) +
      '\ntap_win=' +
      '\nnbins=' +
      '\navrg_len=' +
      '\nout_bin_sp=' + EddyPro.formatBoolValue(output.Spectral_Output_All) +
      '\nout_bin_og=' + EddyPro.formatBoolValue(output.Spectral_Output_All_Ogives) +
      '\nout_full_sp_u=' + EddyPro.formatBoolValue(output.Spectral_Output_U) +
      '\nout_full_sp_v=' + EddyPro.formatBoolValue(output.Spectral_Output_V) +
      '\nout_full_sp_w=' + EddyPro.formatBoolValue(output.Spectral_Output_W) +
      '\nout_full_sp_ts=' + EddyPro.formatBoolValue(output.Spectral_Output_TS) +
      '\nout_full_sp_co2=' + EddyPro.formatBoolValue(output.Spectral_Output_CO2) +
      '\nout_full_sp_h2o=' + EddyPro.formatBoolValue(output.Spectral_Output_H20) +
      '\nout_full_sp_ch4=' + EddyPro.formatBoolValue(output.Spectral_Output_CH4) +
      '\nout_full_sp_n2o=' + EddyPro.formatBoolValue(output.Spectral_Output_4th_Gas) +
      '\nout_st_1=' + EddyPro.formatBoolValue(output.Process_Stats_1) +
      '\nout_st_2=' + EddyPro.formatBoolValue(output.Process_Stats_2) +
      '\nout_st_3=' + EddyPro.formatBoolValue(output.Process_Stats_3) +
      '\nout_st_4=' + EddyPro.formatBoolValue(output.Process_Stats_4) +
      '\nout_st_5=' + EddyPro.formatBoolValue(output.Process_Stats_5) +
      '\nout_st_6=' + EddyPro.formatBoolValue(output.Process_Stats_6) +
      '\nout_st_7=' + EddyPro.formatBoolValue(output.Process_Stats_7) +
      '\nout_raw_1=' +EddyPro.formatBoolValue( output.Process_Time_1) +
      '\nout_raw_2=' + EddyPro.formatBoolValue(output.Process_Time_2) +
      '\nout_raw_3=' + EddyPro.formatBoolValue(output.Process_Time_3) +
      '\nout_raw_4=' + EddyPro.formatBoolValue(output.Process_Time_4) +
      '\nout_raw_5=' + EddyPro.formatBoolValue(output.Process_Time_5) +
      '\nout_raw_6=' + EddyPro.formatBoolValue(output.Process_Time_6) +
      '\nout_raw_7=' + EddyPro.formatBoolValue(output.Process_Time_7) +
      '\nout_raw_u=' + EddyPro.formatBoolValue(output.Process_Time_U) +
      '\nout_raw_v=' + EddyPro.formatBoolValue(output.Process_Time_V) +
      '\nout_raw_w=' + EddyPro.formatBoolValue(output.Process_Time_W) +
      '\nout_raw_ts=' + EddyPro.formatBoolValue(output.Process_Time_TS) +
      '\nout_raw_co2=' + EddyPro.formatBoolValue(output.Process_Time_CO2) +
      '\nout_raw_h2o=' + EddyPro.formatBoolValue(output.Process_Time_H20) +
      '\nout_raw_ch4=' + EddyPro.formatBoolValue(output.Process_Time_CH4) +
      '\nout_raw_gas4=' + EddyPro.formatBoolValue(output.Process_Time_4th) +
      '\nout_raw_t_air=' + EddyPro.formatBoolValue(output.Process_Time_T) +
      '\nout_raw_p_air=' + EddyPro.formatBoolValue(output.Process_Time_P) +
      '\nout_full_cosp_w_u=' + EddyPro.formatBoolValue(output.Spectral_Output_WU) +
      '\nout_full_cosp_w_v=' + EddyPro.formatBoolValue(output.Spectral_Output_WV) +
      '\nout_full_cosp_w_ts=' + EddyPro.formatBoolValue(output.Spectral_Output_WTS) +
      '\nout_full_cosp_w_co2=' + EddyPro.formatBoolValue(output.Spectral_Output_WC02) +
      '\nout_full_cosp_w_h2o=' + EddyPro.formatBoolValue(output.Spectral_Output_WH20) +
      '\nout_full_cosp_w_ch4=' + EddyPro.formatBoolValue(output.Spectral_Output_WCH4) +
      '\nout_full_cosp_w_n2o=' + EddyPro.formatBoolValue(output.Spectral_Output_W4th_Gas) +
      '\nto_mixratio=' +
      '\nfilter_sr=' +
      '\nfilter_al=' +
      '\nbu_corr=' + statistical.Add_Instrument_Sensible_Heat_Components +
      '\nbu_multi=' + EddyPro.getLookupValue("Surface_Temperature_Estimations", statistical.Surface_Temperature_Estimations) +
      '\nl_day_bot_gain=' + EddyPro.formatValue(statistical.Day_Bottom_Gain, true) +
      '\nl_day_bot_offset=' + EddyPro.formatValue(statistical.Day_Bottom_Offset, true) +
      '\nl_day_top_gain=' + EddyPro.formatValue(statistical.Day_Top_Gain, true) +
      '\nl_day_top_offset=' + EddyPro.formatValue(statistical.Day_Top_Offset, true) +
      '\nl_day_spar_gain=' + EddyPro.formatValue(statistical.Day_Spar_Gain, true) +
      '\nl_day_spar_offset=' + EddyPro.formatValue(statistical.Day_Spar_Offset, true) +
      '\nl_night_bot_gain=' + EddyPro.formatValue(statistical.Night_Bottom_Gain, true) +
      '\nl_night_bot_offset=' + EddyPro.formatValue(statistical.Night_Bottom_Offset, true) +
      '\nl_night_top_gain=' + EddyPro.formatValue(statistical.Night_Top_Gain, true) +
      '\nl_night_top_offset=' + EddyPro.formatValue(statistical.Night_Top_Offset, true) +
      '\nl_night_spar_gain=' + EddyPro.formatValue(statistical.Night_Spar_Gain, true) +
      '\nl_night_spar_offset=' + EddyPro.formatValue(statistical.Night_Spar_Offset, true) +
      '\nm_day_bot1=' + EddyPro.formatValue(statistical.Day_Bottom_1, true) +
      '\nm_day_bot2=' +EddyPro.formatValue(statistical.Day_Bottom_2, true) +
      '\nm_day_bot3=' +EddyPro.formatValue(statistical.Day_Bottom_3, true) +
      '\nm_day_bot4=' +EddyPro.formatValue(statistical.Day_Bottom_4, true) +
      '\nm_day_top1=' +EddyPro.formatValue(statistical.Day_Top_1, true) +
      '\nm_day_top2=' +EddyPro.formatValue(statistical.Day_Top_2, true) +
      '\nm_day_top3=' +EddyPro.formatValue(statistical.Day_Top_3, true) +
      '\nm_day_top4=' +EddyPro.formatValue(statistical.Day_Top_4, true) +
      '\nm_day_spar1=' +EddyPro.formatValue(statistical.Day_Spar_1, true) +
      '\nm_day_spar2=' +EddyPro.formatValue(statistical.Day_Spar_2, true) +
      '\nm_day_spar3=' +EddyPro.formatValue(statistical.Day_Spar_3, true) +
      '\nm_day_spar4=' +EddyPro.formatValue(statistical.Day_Spar_4, true) +
      '\nm_night_bot1=' + EddyPro.formatValue(statistical.Night_Bottom_1, true) +
      '\nm_night_bot2=' + EddyPro.formatValue(statistical.Night_Bottom_2, true) +
      '\nm_night_bot3=' + EddyPro.formatValue(statistical.Night_Bottom_3, true) +
      '\nm_night_bot4=' + EddyPro.formatValue(statistical.Night_Bottom_4, true) +
      '\nm_night_top1=' + EddyPro.formatValue(statistical.Night_Top_1, true) +
      '\nm_night_top2=' + EddyPro.formatValue(statistical.Night_Top_2, true) +
      '\nm_night_top3=' + EddyPro.formatValue(statistical.Night_Top_3, true) +
      '\nm_night_top4=' + EddyPro.formatValue(statistical.Night_Top_4, true) +
      '\nm_night_spar1=' + EddyPro.formatValue(statistical.Night_Spar_1, true)+
      '\nm_night_spar2=' + EddyPro.formatValue(statistical.Night_Spar_2, true) +
      '\nm_night_spar3=' + EddyPro.formatValue(statistical.Night_Spar_3, true) +
      '\nm_night_spar4=' + EddyPro.formatValue(statistical.Night_Spar_4, true) +
      '\nout_qc_details=' + processing.Quality_Check +
      '\npower_of_two=' + processing.Power_Of_Two_Samples +
      '\n';
    }

    if (statistical != null) {
      output = output + '\n[RawProcess_Tests]' +
      '\ntest_sr=' + EddyPro.formatBoolValue(statistical.Spike_count) +
      '\ntest_ar=' + EddyPro.formatBoolValue(statistical.Amplitude_resolution) +
      '\ntest_do=' + EddyPro.formatBoolValue(statistical.Drop_outs) +
      '\ntest_al=' + EddyPro.formatBoolValue(statistical.Absolute_limits) +
      '\ntest_sk=' + EddyPro.formatBoolValue(statistical.Skewness_Kurtosis) +
      '\ntest_ds=' + EddyPro.formatBoolValue(statistical.Discontinuities) +
      '\ntest_tl=' + EddyPro.formatBoolValue(statistical.Time_lags) +
      '\ntest_aa=' + EddyPro.formatBoolValue(statistical.Angle_of_attack) +
      '\ntest_ns=' + EddyPro.formatBoolValue(statistical.Steadiness_of_horizontal_wind) +
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
      '\npf_start_date=' + EddyPro.formatDateValue(processing.Planar_Start) +
      '\npf_end_date=' + EddyPro.formatDateValue(processing.Planar_End) +
      '\npf_mode=' + EddyPro.getLookupValue("Planar_Calculations_Fail", processing.Time_Lag_Method) +
      '\npf_north_offset=' + processing.Planar_North_Offset_First_Sector +
      '\npf_min_num_per_sec=' + processing.Planar_Elements_Per_Sector +
      '\npf_w_max=' + processing.Planar_Max_Mean_Verticle_Wind_Component +
      '\npf_u_min=' + processing.Planar_Min_Mean_Horizontal_Wind_Component +
      '\npf_file=' +
      '\npf_fix=' +
      '\npf_subset=' +
      '\n';

    if (processing != null) {
      output = output + '\n[RawProcess_TimelagOptimization_Settings]' +
      '\nto_start_date=' + EddyPro.formatDateValue(processing.Time_Lag_Start) +
      '\nto_end_date=' + EddyPro.formatDateValue(processing.Time_Lag_End) +
      '\nto_mode=' + EddyPro.getLookupValue("Time_Lag_Method", processing.Time_Lag_Method) +
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
      '\nru_meth=' + EddyPro.formatBoolValue(statistical.Random_uncertainty_estimation) +
      '\nru_its_meth=' + EddyPro.getLookupValue("Random_uncertainty_estimation_method", statistical.Random_uncertainty_estimation_method) +
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
  },

  formatValue: function(value, decimal) {
    if (value == null && !decimal) return '';
    if (value == null && decimal) return '0.00';
    return value;
  },

  formatBoolValue : function(value) {
    return value ? 1 : 0;
  },

  formatDateValue : function(value) {
    if (value == null) return '';
    return new Date(value).toISOString().substr(0, 19);
  },

  getVariable: function(value) {
    switch (value) {
      case "w":return "w";
      case "u":return "u";
      case "v":return "v";
      case "p (pho)":return "v";
      case "Speed of Sound":return "sos";
      case "Sonic Temperature":return "ts";
      case "Sampling Line Flow Rate":return "flowrate";
      case "SO2":return "so2";
      case "O2":return "o2";
      case "NO2":return "no2";
      case "NO":return "no";
      case "NH4":return "nh4";
      case "N2O":return "n2o";
      case "LI-7700 Diagnostics":return "diag_77";
      case "LI-7500(A) Diagnostics":return "diag_75";
      case "LI-7200 Diagnostics":return "diag_72";
      case "H2O":return "h2o";
      case "Fast Ambient Temperature":return "fast_t";
      case "Cell Temperature Out":return "int_t_2";
      case "Cell Temperature In":return "int_t_1";
      case "Cell Pressure":return "int_p";
      case "CO2":return "co2";
      case "CO":return "co";
      case "CH4":return "ch4";
      case "Average Cell Temperature":return "cell_t";
      case "Ambient Temperature":return "air_t";
      case "Ambient Pressure":return "air_p";
      case "? (theta)":return "u";
    }
    return "";
  },

  getMeasureType: function(value) {
    switch(value) {
      case "Molar/Mass density": return "molar_density";
      case "Mole fraction": return "mole_fraction";
      case "Mixing ratio": return "mixing_ratio";
      case "Other": return "other";
    }
    return "";
  },

  getInputUnit: function(value) {
    switch(value) {
      case "mV":return "mvolt";
      case "V":return "volt";
      case "Mm/s":return "mm_sec";
      case "Cm/s":return "cm_sec";
      case "m/s":return "m_sec";
      case "K":return "kelvin";
      case "cK":return "ckelvin";
      case "°C":return "celsius";
      case "C°C":return "ccelsius";
      case "mmol/mol (ppt)":return "ppt";
      case "µmol/mol (ppm)":return "ppm";
      case "mmol/mol (ppb)":return "ppb";
      case "mmol/m3":return "mmol_m3";
      case "µmol/m3":return "umol_m3";
      case "g/m3":return "g_m3";
      case "mg/m3":return "mg_m3";
      case "ug/m3":return "ug_m3";
      case "Pa":return "pa";
      case "hPa":return "hpa";
      case "kPa":return "kpa";
      case "l/min":return "lit_m";
      case "m3/s":return "m3_s";
      case "cm3/s":return "cm3_s";
      case "ft3/s":return "ft3_s";
      case "in3/s":return "in3_s";
      case "Degrees":return "degrees";
      case "Other":return "none";
      case "Dimensionless":return "dimensionless";
    }
    return "";
  },

  getLookupValue: function(field,value) {
    var lookups = {
      "Integral_turbulence_scale":["Cross-correlation first crossing 1/e","Cross-correlation first crossing zero","Integrate over the whole correlation period"],
      "Random_uncertainty_estimation_method":["Finkelstein and Sims (2001)","Mann and Lenshcow (1994)"],
      "Correction_For_Instruments_Separation_Method":["Horst and Lenshow (2009), along-wind, crosswind and vertical","Horst and Lenshow (2009), only crosswind and vertical"],
      "Correction_Of_Low_Pass_Filtering_Effects_Method": ["Moncrieff et al. (1997) – Fully analytic","Massmann (2000, 2001) – Fully analytic","Horst (1997) – Analytic with in situ parameterization","Ibrom et al. (2007) – In situ / analytic","Fratini et al. (2012) – In situ/analytic"],
      "North_Reference": ["Use Magnetic North", "Use Geographic North"],
      "Angle_Of_Attach_Method": ["Field calibration (Nakai and Shimoyama 2012)", "Wind tunnel calibration (Nakai et al. 2006)"],
      "Rotation_Method":["Double rotation","Triple rotation","Planar fit (Wilczak et al. 2001)","Planar fit with not velocity bias (van Dijk et al. 2004)"],
      "Detrend_Method": ["Block average","Linear detrending","Running mean","Exponential running mean"],
      "Time_Lag_Method": ["Constant","Covariance maximization with default","Covariance maximization","Automatic time lag optimization"],
      "Compensate_Density_Fluctuations_Method": ["Use/convert to mixing ratio, if possible(Burba et al. 2012)","Webb et al. 1980 (open-path) / Ibrom et al. 2007 (closed-path)"],
      "Surface_Temperature_Estimations": ["Simple linear regressions", "Multiple regressions"],
      "Tapering_Window": ["Spared (no window)","Bartlett","Welch","Hamming","Hann"],
      "Quality_Check_Flagging_Policy": ["Mauder and Foken (2004) (0-1-2 system)","Foken (2003) (1 to 9 system)","Goeckede et al. (2004) (1 to 5 system)"],
      "Footprint_Method": ["Kljun et al. (2004)","Kormann and Meixner (2001)","Hsieh et al. (2000)"],
      "Planar_Calculations_Fail": ["Use closest valid sector, clockwise)"]
      };

    var lookupArray = lookups[field];
    if (lookupArray != null) {
      return lookupArray.indexOf(value);
    }
    return 0;
  }
}
