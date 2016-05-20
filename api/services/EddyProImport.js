module.exports = {

  importMetaData: function(file, user) {
    var metadata = {Name: 'Unknown', User: user, Instruments: [], Columns: []};
    EddyProImport.importFile(file, metadata);
    console.log(metadata);
    Data.create(metadata).then(function(data) {
      data.save();
    });
  },

  importProject: function(file) {
    var project = Report.create();
    project.user = user;
    EddyProImport.importFile(file, project);
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
        switch(key) {
          case "creation_date": object.createdAt = value; break;
          case "last_change_date": object.updatedAt = value; break;
          case "start_date": object.Date_From = value; break;
          case "end_date": object.Date_To = value; break;
        }
        break;
      }
      case "Files":
      {
        break;
      }
      case "Site":
      {
        switch(key) {
          case "altitude": object.Altitude = value; break;
          case "latitude": object.Latitude = value; break;
          case "longitude": object.Longitude = value; break;
          case "canopy_height": object.Canopy_Height = value; break;
        }
        break;
      }
      case "Station":
      {
        switch(key) {
          case "station_name": object.Name = value; break;
        }
        break;
      }
      case "Timing":
      {
        switch(key) {
          case "acquisition_frequency": object.Acquisition_Frequency = value; break;
          case "file_duration": object.File_Duration = value; break;
        }
        break;      }
      case "Instruments":
      {
        if (itemNumber > object.Instruments.length) {
          object.Instruments.push({Instrument_Type: 'Anemometer'});
        }
        var instrument = object.Instruments[object.Instruments.length-1];

        switch(key) {
          case "manufacturer": instrument.Manufacturer = value; break;
          case "model": instrument.Altitude = value; break;
          case "sw_version": instrument.Software_Version = value; instrument.Instrument_Type = 'Gas'; break;
          case "id": instrument.Instrument_Id = value; break;
          case "height": instrument.Height = value; break;
          case "wformat": instrument.Wind_Data_Format = value; break;
          case "north_offset": instrument.North_Offset = value; break;
          case "northward_separation": instrument.Northward_Separation = value; break;
          case "eastward_separation": instrument.Eastward_Separation = value; break;
          case "vertical_separation": instrument.Vertical_Separation = value; break;
          case "vpath_length": instrument.Longitudinal_Path_Length = value; break;
          case "hpath_length": instrument.Transversal_Path_Length = value; break;
          case "tau": instrument.Time_Response = value; break;
          case "tube_length": instrument.Tube_Length = value; break;
          case "tube_diameter": instrument.Tube_Inner_Diameter = value; break;
          case "tube_flowrate": instrument.Nominal_Tube_Flow_Rate = value; break;
          case "kw": instrument.Extinction_Coefficient_In_Water_KW = value; break;
          case "ko": instrument.Extinction_Coefficient_In_Water_KO = value; break;
        }
        break;
      }
      case "FileDescription":
      {
        if (itemNumber > object.Columns.length) {
          object.Columns.push({});
        }
        var column = object.Columns[object.Columns.length-1];

        switch(key) {
          case "variable": column.Numeric = value; break;
          case "instrument": column.Instrument = value; break;
          case "measure_type": column.Measurement_Type = value; break;
          case "unit_in": column.Input_Unit = value; break;
          case "unit_out": column.Output_Unit = value; break;
          case "nom_timelag": column.Nominal_Time_Lag = value; break;
          case "min_timelag": column.Minimum_Time_Lag = value; break;
          case "max_timelag": column.Maximum_Time_Lag = value; break;
        }
        break;
      }
    }
  }

};
