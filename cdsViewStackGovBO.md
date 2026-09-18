---
layout: default
title: CDS View Hierarchy for Product Governance BO
---

# CDS View Hierarchy for Product Governance BO
## Create Interface composite view for extension node
```abap
@AbapCatalog.viewEnhancementCategory: [#PROJECTION_LIST,#UNION]
@AccessControl.authorizationCheck: #MANDATORY
@EndUserText.label: 'Governance Basic View for Equipment'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel: {
  usageType: {
    serviceQuality: #C,
    sizeCategory: #XXL,
    dataClass: #TRANSACTIONAL
  }
}
@VDM.viewType: #COMPOSITE
define view entity ZI_PRODUCTEQUIPMENTADDNLGOV
  as select from ZI_ProductEquipmentAddnlProc
  /*+[hideWarning] { "IDS" : [ "CARDINALITY_CHECK" ] }*/
  association of one       to one I_MasterDataChangeProcess as _MDChgPrc on  $projection.MasterDataChangeProcess = _MDChgPrc.MasterDataChangeProcess
  association of exact one to exact one I_ProductGov        as _Product  on  $projection.MasterDataChangeProcess = _Product.MasterDataChangeProcess
                                                                         and $projection.MDChgProcessStep        = _Product.MDChgProcessStep
                                                                         and $projection.MDChgProcessSrceSystem  = _Product.MDChgProcessSrceSystem
                                                                         and $projection.MDChgProcessSrceObject  = _Product.MDChgProcessSrceObject

{
  key MasterDataChangeProcess,
  key MDChgProcessStep,
  key MDChgProcessSrceSystem,
  key MDChgProcessSrceObject,
  key EquipmentNumber,
      FiscalYearAsText,
      MonthOfConstruction,
      CountryKey,
      cast( case
        when MDChgProcessStep = _MDChgPrc.MDChgProcessCurrentStepNumber and _MDChgPrc.MDChgProcessCurrentStepNumber <> '0000' or MDChgProcessStep = '0001' and _MDChgPrc.MDChgProcessCurrentStepNumber = '0000' then 'X'
        else ''
      end as abap_boolean preserving type ) as MasterDataIsCurrent,
      /* Associations */
      _Product
}
where
  MDChgProcessSourceModified <> 'D'
union all select from ZI_PRODUCTEQUIPMENTADDNL
association of exact one to exact one I_ProductGov as _Product on  $projection.MasterDataChangeProcess = _Product.MasterDataChangeProcess
                                                               and $projection.MDChgProcessStep        = _Product.MDChgProcessStep
                                                               and $projection.MDChgProcessSrceSystem  = _Product.MDChgProcessSrceSystem
                                                               and $projection.MDChgProcessSrceObject  = _Product.MDChgProcessSrceObject

{
  key '000000000000'                              as MasterDataChangeProcess,
  key '0000'                                      as MDChgProcessStep,
  key ''                                          as MDChgProcessSrceSystem,
  key Product                                     as MDChgProcessSrceObject,
  key EquipmentNumber,
      FiscalYearAsText,
      MonthOfConstruction,
      CountryKey,
      cast( 'X' as abap_boolean preserving type ) as MasterDataIsCurrent,
      _Product
}
```
### <a id="govbo-intf-compView-CDSRole"></a> CDS Role
```abap
@EndUserText.label: 'AC for ZI_PRODUCTEQUIPMENTADDNLGOV'
@MappingRole: true
define role ZI_PRODUCTEQUIPMENTADDNLGOV {
  grant
    select
      on
        ZI_PRODUCTEQUIPMENTADDNLGOV
          where
           inheriting conditions from entity I_ProductGov replacing { root with _Product };
}
```
## <a id="govbo-intf-TPView"></a> Transactional Processing Interface view
```abap
@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #MANDATORY
@EndUserText.label: 'Transactional View for Equipment'
@Metadata.ignorePropagatedAnnotations: true
@VDM.viewType: #TRANSACTIONAL
@ObjectModel: {
  usageType: {
    serviceQuality: #C,
    sizeCategory: #XXL,
    dataClass: #TRANSACTIONAL
  }
}
define view entity ZI_PRODUCTEQUIPMENTADDNLGOVTP
  as select from ZI_PRODUCTEQUIPMENTADDNLGOV
  association              to parent I_ProductGovTP as _Product       on  $projection.MasterDataChangeProcess = _Product.MasterDataChangeProcess
                                                                      and $projection.MDChgProcessSrceSystem  = _Product.MDChgProcessSrceSystem
                                                                      and $projection.MDChgProcessSrceObject  = _Product.MDChgProcessSrceObject
  association of one       to one I_Country         as _country       on  _country.Country = $projection.CountryKey
  association of exact one to one ZI_EquipmentView  as _EquipmentText on  $projection.EquipmentNumber = _EquipmentText.Equnr

{
  key MasterDataChangeProcess,
  key MDChgProcessSrceSystem,
  key MDChgProcessSrceObject,
  key EquipmentNumber,
      @ObjectModel.editableFieldFor: 'EquipmentNumber'
      @Semantics.language: true
      EquipmentNumber as EquipmentNumberForEdit,
      MDChgProcessStep,
      FiscalYearAsText,
      MonthOfConstruction,
      CountryKey,
      MasterDataIsCurrent,
      /* Associations */
      _Product,
      _country,
      _EquipmentText
}
where
       MasterDataIsCurrent       = 'X'
  and(
       _Product.MDChgProcessGoal = 'G'
    or _Product.MDChgProcessGoal = 'U'
    or _Product.MDChgProcessGoal = 'C'
    or _Product.MDChgProcessGoal = 'F'
    or _Product.MDChgProcessGoal = 'P'
    or _Product.MDChgProcessGoal = 'Y'
    or _Product.MDChgProcessGoal = 'O'
  )
```
### <a id="govbo-intf-TPView-CDSRole"></a> CDS Role for Transactional Processing view
```abap
@EndUserText.label: 'AC for ZI_PRODUCTEQUIPMENTADDNLGOVTP'
@MappingRole: true
define role ZI_PRODUCTEQUIPMENTADDNLGOVTP {
  grant
    select
      on
        ZI_PRODUCTEQUIPMENTADDNLGOVTP
            where INHERITING CONDITIONS FROM ENTITY I_ProductDescriptionGov;

            
}
```
## <a id="govbo-consumption-TPView"></a> Transactional Processing Consumption view
```abap
@AccessControl.authorizationCheck: #MANDATORY
@EndUserText.label: 'Consumption VIew '
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel: {
  usageType: {
    serviceQuality: #D,
    sizeCategory: #XXL,
    dataClass: #TRANSACTIONAL
  }
}
@VDM.viewType: #CONSUMPTION
@Metadata.allowExtensions: true
define view entity ZC_PRODUCTEQUIPMENTADDNLGOVTP

  as projection on ZI_PRODUCTEQUIPMENTADDNLGOVTP
{
  key MasterDataChangeProcess,
  key MDChgProcessSrceSystem,
  key MDChgProcessSrceObject,
      @ObjectModel.text.element: ['EquipmentText']
  key EquipmentNumber,
      @ObjectModel: {
      editableFieldFor: 'EquipmentNumber',
      text.element: [ 'EquipmentText' ]
      }
      EquipmentNumberForEdit,
      MDChgProcessStep,
      FiscalYearAsText,
      MonthOfConstruction,
      CountryKey,
      MasterDataIsCurrent,
      @UI.hidden: true
      @Consumption.filter.hidden: true
      _EquipmentText.eqktx as EquipmentText,

      /* Associations */
      _country,
      _Product : redirected to parent C_ProductGovTP
}
```
### <a id="govbo-consumption-TPView-CDSRole"></a> CDS Role for Transactional Processing Consumption view
```abap
@EndUserText.label: 'DCL for EQMT data'
@MappingRole: true
define role ZC_PRODUCTEQUIPMENTADDNLGOVTP {
  grant
    select
      on
        ZC_PRODUCTEQUIPMENTADDNLGOVTP
          where
            inheriting conditions from entity ZI_PRODUCTEQUIPMENTADDNLGOVTP;
            
}
```