module.exports = {
  get: function(thisData) {

      var output = ';GHG_METADATA' +
        '\n[Project]' +
        '\ntitle=' +
        '\nid=' +
        '\ncreation_date=' + thisData.createdAt +
        '\nlast_change_date=' + thisData.updatedAt +
        '\nstart_date=' + thisData.Date_From +
        '\nend_date=' + thisData.Date_To +
        '\nfile_name=' + thisData.Name + '.metadata' +
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
          '\ninstr_' + i + '_northward_separation=' + instument.Northward_Separation +
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

      output = output + '\n' + '\n[FileDescription]' +
      '\nseparator=' + thisData.Field_Separator_Character +
      '\nheader_rows=' + thisData.Number_Of_Header_Rows +
      '\ndata_label=Not set';

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

      return (output);
  }
}
