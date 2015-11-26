/**
* ProcessingOption.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    User: { model: 'User' },
    Name: {type: 'string'},

    U: {type: 'float'},
    V: {type: 'float'},
    W: {type: 'float'},
    Angle_Of_Attack_Correction_For_Wind_Components: {type: 'boolean'},
    Angle_Of_Attach_Method: {type: 'string'},
    Axis_Rotation_For_Tilt_Correction: {type: 'boolean'},
    Rotation_Method: {type: 'string'},
    Detrend_Method: {type: 'string'},
    Turbulent_Fluctuations_Time_Constant: {type: 'float'},
    Time_Lag_Compensation: {type: 'boolean'},
    Time_Lag_Method: {type: 'string'},
    Compensate_Density_Fluctuations: {type: 'boolean'},
    Compensate_Density_Fluctuations_Method: {type: 'string'},
    Add_Instrument_Sensible_Heat_Components: {type: 'boolean'},
    Surface_Temperature_Estimations: {type: 'string'},
    Tapering_Window:{type: 'string'},
    Frequency_Bins: {type:'float'},

    Power_Of_Two_Samples: {type: 'boolean'},
    Quality_Check: {type: 'boolean'},
    Quality_Check_Flagging_Policy:{type: 'string'},
    Footprint_Estimation: {type: 'boolean'},
    Footprint_Method:{type: 'string'},

    Time_Lag_Start: {type: 'datetime'},
    Time_Lag_End: {type: 'datetime'},
    Time_Lag_Plausibility_Range_Around_Median_Value: {type: 'float'},
    Time_Lag_RH_Classes: {type: 'float'},
    Time_Lag_Minimum_Heat_Flux: {type: 'float'},
    Time_Lag_Minimum_C02_Flux: {type: 'float'},
    Time_Lag_Minimum_CH4_FLuX: {type: 'float'},
    Time_Lag_Minimum_Gas_Flux: {type: 'float'},

    Time_Lag_Searching_C02_Min: {type: 'float'},
    Time_Lag_Searching_C02_Max: {type: 'float'},
    Time_Lag_Searching_H20_Min: {type: 'float'},
    Time_Lag_Searching_H20_Max: {type: 'float'},
    Time_Lag_Searching_CH4_Min: {type: 'float'},
    Time_Lag_Searching_CH4_Max: {type: 'float'},
    Time_Lag_Searching_Gas_Min: {type: 'float'},
    Time_Lag_Searching_Gas_Max: {type: 'float'},

    Planar_Start: {type: 'datetime'},
    Planar_End: {type: 'datetime'},
    Planar_Elements_Per_Sector: {type: 'float'},
    Planar_Max_Mean_Verticle_Wind_Component: {type: 'float'},
    Planar_Min_Mean_Horizontal_Wind_Component: {type: 'float'},
    Planar_Calculations_Fail:{type: 'string'},
    Planar_North_Offset_First_Sector:{type: 'float'},

    Day_Bottom_Gain:  {type: 'float'},
    Day_Bottom_Offset:  {type: 'float'},
    Day_Top_Gain:  {type: 'float'},
    Day_Top_Offset:  {type: 'float'},
    Day_Spar_Gain:  {type: 'float'},
    Day_Spar_Offset:  {type: 'float'},

    Night_Bottom_Gain:  {type: 'float'},
    Night_Bottom_Offset:  {type: 'float'},
    Night_Top_Gain:  {type: 'float'},
    Night_Top_Offset:  {type: 'float'},
    Night_Spar_Gain:  {type: 'float'},
    Night_Spar_Offset:  {type: 'float'},

    Day_Bottom_1:  {type: 'float'},
    Day_Bottom_2:  {type: 'float'},
    Day_Bottom_3:  {type: 'float'},
    Day_Bottom_4:  {type: 'float'},
    Day_Top_1:  {type: 'float'},
    Day_Top_2:  {type: 'float'},
    Day_Top_3:  {type: 'float'},
    Day_Top_4:  {type: 'float'},
    Day_Spar_1:  {type: 'float'},
    Day_Spar_2:  {type: 'float'},
    Day_Spar_3:  {type: 'float'},
    Day_Spar_4:  {type: 'float'},

    Night_Bottom_1:  {type: 'float'},
    Night_Bottom_2:  {type: 'float'},
    Night_Bottom_3:  {type: 'float'},
    Night_Bottom_4:  {type: 'float'},
    Night_Top_1:  {type: 'float'},
    Night_Top_2:  {type: 'float'},
    Night_Top_3:  {type: 'float'},
    Night_Top_4:  {type: 'float'},
    Night_Spar_1:  {type: 'float'},
    Night_Spar_2:  {type: 'float'},
    Night_Spar_3:  {type: 'float'},
    Night_Spar_4:  {type: 'float'},

    Planar_Wind_Sectors: {
      collection: 'PlanarWindSector',
      via: 'ProcessingOption'
    }
  }
};

