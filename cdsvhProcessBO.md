# CDS View Hierarchy for Product Process BO
## <a id="basic-interface-view"></a>Basic Interface View
```abap
@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #MANDATORY
@EndUserText.label: 'Basic View Equipment Additional Data'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel: {
  usageType: {
    serviceQuality: #A,
    sizeCategory: #XXL,
    dataClass: #TRANSACTIONAL
  }
}
@VDM.viewType: #BASIC
define view entity ZI_ProductEquipmentAddnlProc
  as select from zyequip_prc
  association of exact one to exact one I_ProductProc as _Product on  $projection.MasterDataChangeProcess = _Product.MasterDataChangeProcess
                                                                  and $projection.MDChgProcessStep        = _Product.MDChgProcessStep
                                                                  and $projection.MDChgProcessSrceSystem  = _Product.MDChgProcessSrceSystem
                                                                  and $projection.MDChgProcessSrceObject  = _Product.MDChgProcessSrceObject
{

  key zyequip_prc.process_id                               as MasterDataChangeProcess,
  key zyequip_prc.process_step_no                          as MDChgProcessStep,
  key zyequip_prc.source_system                            as MDChgProcessSrceSystem,
  key zyequip_prc.source_id                                as MDChgProcessSrceObject,
  key cast( zyequip_prc.yyequnr as equnr preserving type ) as EquipmentNumber,
      zyequip_prc.yybaujj                                  as FiscalYearAsText,
      zyequip_prc.yybaumm                                  as MonthOfConstruction,
      zyequip_prc.yyherld                                  as CountryKey,
      zyequip_prc.source_recency                           as MDChgProcSrceLastChgdDateTime,
      zyequip_prc.source_modified                          as MDChgProcessSourceModified,
      zyequip_prc.source_modification_blip                 as MDChgProcessSourceModifBinary,
      _Product
}
```