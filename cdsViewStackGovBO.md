# CDS View Hierarchy for Product Governance BO
## <a id="govbo-intf-compView"></a> Create Interface composite view for extension node
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