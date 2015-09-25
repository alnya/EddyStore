module.exports = {
  getMetadata: function(thisData) {

      var output = ';GHG_METADATA' +
        '\n[Project]' +
        '\ntitle=' +
        '\nid=' +
        '\ncreation_date=' + thisData.createdAt +
        '\nlast_change_date=' + thisData.updatedAt +
        '\nstart_date=' + thisData.Date_From +
        '\nend_date=' + thisData.Date_To +
        '\nfile_name=' + thisData.id + '.metadata' +
        '\nsw_version=5.1.1' +
        '\nini_version=3.1' +
        '\n' +
        '\n[Files]' +
        '\ndata_path=' + thisData.Folder_Path +
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
        '\naltitude=' + thisData.Altitude +
        '\nlatitude=' + thisData.Latitude +
        '\nlongitude=' + thisData.Longitude +
        '\ncanopy_height=' + thisData.Canopy_Height +
        '\ndisplacement_height=' + thisData.Displacement_Height +
        '\nroughness_length=' + thisData.Roughness_Length +
        '\n' +
        '\n[Station]' +
        '\nstation_name=' + thisData.Name +
        '\nstation_id=' +
        '\n' +
        '\n[Timing]' +
        '\nacquisition_frequency=' + thisData.Acquisition_Frequency +
        '\nfile_duration=' + thisData.File_Duration +
        '\npc_time_settings=local' +
        '\n' +
        '\n[Instruments]';

    if (thisData.Instruments != null) {
      for (var i = 0; i < thisData.Instruments.length; i++) {
        var instrument = thisData.Instruments[i];

        if (instrument.Instrument_Type = 'Anemometer') {
          output = output +
          '\ninstr_' + i + '_manufacturer=' + instrument.Manufacturer +
          '\ninstr_' + i + '_model=' + instrument.Model +
          '\ninstr_' + i + '_id=' + instrument.Instrument_Id +
          '\ninstr_' + i + '_height=' + instrument.Height +
          '\ninstr_' + i + '_wformat=' + instrument.Wind_Data_Format +
          '\ninstr_' + i + '_wref=' +
          '\ninstr_' + i + '_north_offset=' + instrument.North_Offset +
          '\ninstr_' + i + '_northward_separation=' + instrument.Northward_Separation +
          '\ninstr_' + i + '_eastward_separation=' + instrument.Eastward_Separation +
          '\ninstr_' + i + '_vertical_separation=' + instrument.Vertical_Separation +
          '\ninstr_' + i + '_vpath_length=' + instrument.Longitudinal_Path_Length +
          '\ninstr_' + i + '_hpath_length=' + instrument.Transversal_Path_Length +
          '\ninstr_' + i + '_tau=' + instrument.Time_Response;
        } else {
          output = output +
          '\ninstr_' + i + '_manufacturer=' + instrument.Manufacturer +
          '\ninstr_' + i + '_model=' + instrument.Model +
          '\ninstr_' + i + '_sw_version=' + instrument.Software_Version +
          '\ninstr_' + i + '_id=' + instrument.Instrument_Id +
          '\ninstr_' + i + '_tube_length=' + instrument.Tube_Length +
          '\ninstr_' + i + '_tube_diameter=' + instrument.Tube_Inner_Diameter +
          '\ninstr_' + i + '_tube_flowrate=' + instrument.Nominal_Tube_Flow_Rate +
          '\ninstr_' + i + '_northward_separation=' + instument.Northward_Separation +
          '\ninstr_' + i + '_eastward_separation=' + instrument.Eastward_Separation +
          '\ninstr_' + i + '_vertical_separation=' + instrument.Vertical_Separation +
          '\ninstr_' + i + '_vpath_length=' + instrument.Longitudinal_Path_Length +
          '\ninstr_' + i + '_hpath_length=' + instrument.Transversal_Path_Length +
          '\ninstr_' + i + '_tau=' + instrument.Time_Response +
          '\ninstr_' + i + '_kw=' + instrument.Extinction_Coefficient_In_Water_KW +
          '\ninstr_' + i + '_ko=' + instrument.Extinction_Coefficient_In_Water_KO;
        }
      }
    }

      output = output + '\n' + '\n[FileDescription]' +
      '\nseparator=' + thisData.Field_Separator_Character +
      '\nheader_rows=' + thisData.Number_Of_Header_Rows +
      '\ndata_label=Not set';

    if (thisData.Columns != null) {
      for (var i = 0; i < thisData.Columns.length; i++) {
        var column = thisData.Columns[i];

        output = output +
        '\ncol_' + i + '_variable=' + (column.Numeric ? column.Variable : 'not_numeric') +
        '\ncol_' + i + '_instrument=' + column.Instrument +
        '\ncol_' + i + '_measure_type=' + column.Measurement_Type +
        '\ncol_' + i + '_unit_in=' + column.Input_Unit +
        '\ncol_' + i + '_min_value=' +
        '\ncol_' + i + '_max_value=' +
        '\ncol_' + i + '_conversion=' +
        '\ncol_' + i + '_unit_out=' + column.Output_Unit +
        '\ncol_' + i + '_a_value=' +
        '\ncol_' + i + '_b_value=' +
        '\ncol_' + i + '_nom_timelag=' + column.Nominal_Time_Lag +
        '\ncol_' + i + '_min_timelag=' + column.Minimum_Time_Lag +
        '\ncol_' + i + '_max_timelag=' + column.Maximum_Time_Lag;
      }
    }

    return (output);
  },
  getReport: function(thisReport, folder_path, output_path) {

    var spectral = thisReport.SpectralCorrection;
    var processing = thisReport.ProcessingOption;
    var statistical = thisReport.StatisticalAnalysis;

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
        '\nmaster_sonic=usa1_standard_1' +
        '\ncol_co2=6' +
        '\ncol_h2o=7' +
        '\ncol_ch4=0' +
        '\ncol_n2o=0' +
        '\ncol_int_t_1=0' +
        '\ncol_int_t_2=0' +
        '\ncol_int_p=0' +
        '\ncol_air_t=0' +
        '\ncol_air_p=0' +
        '\ncol_cell_t=0' +
        '\ncol_diag_75=0' +
        '\ncol_diag_72=0' +
        '\ncol_diag_77=0' +
        '\ngas_mw=0.0000' +
        '\ngas_diff=0.00000' +
        '\ncol_ts=0' +
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
          '\nsa_start_date=' + spectral.Subperiod_Start +
          '\nsa_end_date=' + spectral.Subperiod_End +
          '\nsa_mode=1' +
          '\nsa_file=' +
          '\nsa_min_smpl=' + spectral.Minimum_Number_Of_Spectra +
          '\nsa_fmin_co2=' + spectral.Lowest_Frequency_CO2 +
          '\nsa_fmin_h2o=' + spectral.Lowest_Frequency_H20 +
          '\nsa_fmin_ch4=' + spectral.Lowest_Frequency_CH4 +
          '\nsa_fmin_gas4=' + spectral.Lowest_Frequency_Gas +
          '\nsa_fmax_co2=' + spectral.Highest_Frequency_CO2 +
          '\nsa_fmax_h2o=' + spectral.Highest_Frequency_H20 +
          '\nsa_fmax_ch4=' + spectral.Highest_Frequency_CH4 +
          '\nsa_fmax_gas4=' + spectral.Highest_Frequency_Gas +
          '\nsa_hfn_co2_fmin=5' +
          '\nsa_hfn_h2o_fmin=5' +
          '\nsa_hfn_ch4_fmin=5' +
          '\nsa_hfn_gas4_fmin=5' +
          '\nsa_min_co2=' + spectral.Minimum_CO2_Flux +
          '\nsa_min_ch4=' + spectral.Minimum_CH4_Flux +
          '\nsa_min_gas4=' + spectral.Minimum_Gas_Flux +
          '\nsa_min_le=20' +
          '\nsa_min_h=20' +
          '\nadd_sonic_lptf=1' +
          '\nf10_co2_trshld=' + spectral.Threshold_Flux_CO2 +
          '\nf10_ch4_trshld=' + spectral.Threshold_Flux_CH4 +
          '\nf10_gas4_trshld=' + spectral.Threshold_Flux_Gas +
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

      // flags
      if (thisReport.Flags != null) {
        for (var i = 0; i < thisReport.Flags.length; i++) {
          var flag = thisReport.Flags[i];

          output = output + '' +
          '\nflag' + i + '_column=' + flag.Variable +
          '\nflag' + i + '_threshold=' + flag.Threshold +
          '\nflag' + i + '_upper=' +
          '\n';
        }
      }

        output = output + '\n[RawProcess_Settings]' +
        '\nnfiles=' +
        '\nmax_lack=' +
        '\nu_offset=' +
        '\nv_offset=' +
        '\nw_offset=' +
        '\ncross_wind=' +
        '\nflow_distortion=' +
        '\nrot_meth=' +
        '\ndetrend_meth=' +
        '\ntimeconst=' +
        '\ntlag_meth=' +
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
        '\nbu_corr=' +
        '\nbu_multi=' +
        '\nl_day_bot_gain=' +
        '\nl_day_bot_offset=' +
        '\nl_day_top_gain=' +
        '\nl_day_top_offset=' +
        '\nl_day_spar_gain=' +
        '\nl_day_spar_offset=' +
        '\nl_night_bot_gain=' +
        '\nl_night_bot_offset=' +
        '\nl_night_top_gain=' +
        '\nl_night_top_offset=' +
        '\nl_night_spar_gain=' +
        '\nl_night_spar_offset=' +
        '\nm_day_bot1=' +
        '\nm_day_bot2=' +
        '\nm_day_bot3=' +
        '\nm_day_bot4=' +
        '\nm_day_top1=' +
        '\nm_day_top2=' +
        '\nm_day_top3=' +
        '\nm_day_top4=' +
        '\nm_day_spar1=' +
        '\nm_day_spar2=' +
        '\nm_day_spar3=' +
        '\nm_day_spar4=' +
        '\nm_night_bot1=' +
        '\nm_night_bot2=' +
        '\nm_night_bot3=' +
        '\nm_night_bot4=' +
        '\nm_night_top1=' +
        '\nm_night_top2=' +
        '\nm_night_top3=' +
        '\nm_night_top4=' +
        '\nm_night_spar1=' +
        '\nm_night_spar2=' +
        '\nm_night_spar3=' +
        '\nm_night_spar4=' +
        '\nout_qc_details=' +
        '\npower_of_two=' +
        '\n';

        output = output + '\n[RawProcess_Tests]' +
        '\ntest_sr=' +
        '\ntest_ar=' +
        '\ntest_do=' +
        '\ntest_al=' +
        '\ntest_sk=' +
        '\ntest_ds=' +
        '\ntest_tl=' +
        '\ntest_aa=' +
        '\ntest_ns=' +
        '\n';

    output = output + '\n[RawProcess_ParameterSettings]' +
        '\nsr_num_spk=' +
        '\nsr_lim_u=' +
        '\nsr_lim_w=' +
        '\nsr_lim_co2=' +
        '\nsr_lim_h2o=' +
        '\nsr_lim_ch4=' +
        '\nsr_lim_n2o=' +
        '\nsr_lim_hf=' +
        '\nar_lim=' +
        '\nar_bins=' +
        '\nar_hf_lim=' +
        '\ndo_extlim_dw=' +
        '\ndo_hf1_lim=' +
        '\ndo_hf2_lim=' +
        '\nal_u_max=' +
        '\nal_w_max=' +
        '\nal_tson_min=' +
        '\nal_tson_max=' +
        '\nal_co2_min=' +
        '\nal_co2_max=' +
        '\nal_h2o_min=' +
        '\nal_h2o_max=' +
        '\nal_ch4_min=' +
        '\nal_ch4_max=' +
        '\nal_n2o_min=' +
        '\nal_n2o_max=' +
        '\nsk_hf_skmin=' +
        '\nsk_hf_skmax=' +
        '\nsk_sf_skmin=' +
        '\nsk_sf_skmax=' +
        '\nsk_hf_kumin=' +
        '\nsk_hf_kumax=' +
        '\nsk_sf_kumin=' +
        '\nsk_sf_kumax=' +
        '\nds_hf_uv=' +
        '\nds_hf_w=' +
        '\nds_hf_t=' +
        '\nds_hf_co2=' +
        '\nds_hf_h2o=' +
        '\nds_hf_ch4=' +
        '\nds_hf_n2o=' +
        '\nds_hf_var=' +
        '\nds_sf_uv=' +
        '\nds_sf_w=' +
        '\nds_sf_t=' +
        '\nds_sf_co2=' +
        '\nds_sf_h2o=' +
        '\nds_sf_ch4=' +
        '\nds_sf_n2o=' +
        '\nds_sf_var=' +
        '\ntl_hf_lim=' +
        '\ntl_sf_lim=' +
        '\ntl_def_co2=' +
        '\ntl_def_h2o=' +
        '\ntl_def_ch4=' +
        '\ntl_def_n2o=' +
        '\naa_min=' +
        '\naa_max=' +
        '\naa_lim=' +
        '\nns_hf_lim=' +
        '\n';

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

    output = output + '\n[RawProcess_TimelagOptimization_Settings]' +
        '\nto_start_date=' +
        '\nto_end_date=' +
        '\nto_mode=' +
        '\nto_file=' +
        '\nto_h2o_nclass=' +
        '\nto_co2_min_flux=' +
        '\nto_ch4_min_flux=' +
        '\nto_gas4_min_flux=' +
        '\nto_le_min_flux=' +
        '\nto_pg_range=' +
        '\nto_co2_min_lag=' +
        '\nto_co2_max_lag=' +
        '\nto_h2o_min_lag=' +
        '\nto_h2o_max_lag=' +
        '\nto_ch4_min_lag=' +
        '\nto_ch4_max_lag=' +
        '\nto_gas4_min_lag=' +
        '\nto_gas4_max_lag=' +
        '\nto_subset=' +
        '\n';

    output = output + '\n[RawProcess_RandomUncertainty_Settings]' +
        '\nru_meth=' +
        '\nru_its_meth=' +
        '\nru_tlag_max=' +
        '\n';

    //output = output + '\n[RawProcess_BiometMeasurements]' +
    //    '\nbiom_use_native_header=' +
    //    '\nbiom_hlines=' +
    //    '\nbiom_separator=' +
    //    '\nbiom_tstamp_ref=' +
    //    '\nbiom_ta=' +
    //    '\nbiom_pa=' +
    //    '\nbiom_rh=' +
    //    '\nbiom_rg=' +
    //    '\nbiom_lwin=' +
    //    '\nbiom_ppfd=';

    return output;
  }
}
