# CDS View Hierarchy for Product Process BO
> ⚠️ **Important:** All the Source code is for Illustration purpose only
<a id="basic-interface-view"></a>
## Basic Interface View
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
### <a id="ProcessBO-BIF-DCL"></a>Basic Interface View DCL
```abap
@EndUserText.label: 'Access for ZI_ProductEquipmentProcChange'
@MappingRole: true
define role ZI_PRODUCTEQUIPMENTPROCCHANGE {
  grant
    select
      on
        ZI_ProductEquipmentProcChange
          where
            inheriting conditions from entity ZI_ProductEquipmentAddnlProc replacing { root with   _ProductEquipmentData };  
            
}
```
### <a id="ProcessBO-BIF-MODVIEW"></a>Basic Interface View for Modification table
```abap
@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Product Equipment Modification data'
@Metadata.ignorePropagatedAnnotations: true
define view entity ZI_PRODUCTEQUIPMENTPROCMODIF
  as select from zyequip_mod
{
  key process_id      as MasterDataChangeProcess,
  key process_step_no as MDChgProcessStep,
  key source_system   as MDChgProcessSrceSystem,
  key source_id       as MDChgProcessSrceObject,
  key yyequnr         as EquipmentNumber,
   field_name      as MDChgProcessModifiedFieldName
}
```
### <a id="ProcessBO-CV-MODVIEW"></a>Composite view for the Modification view
```abap
@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #MANDATORY
@ObjectModel.usageType:{
  serviceQuality: #X,
  sizeCategory: #XXL,
  dataClass: #MIXED
}
@EndUserText.label: 'Equipment Data Changes'
@VDM.viewType: #COMPOSITE
@Metadata.ignorePropagatedAnnotations: true
define view entity ZI_ProductEquipmentProcChange
  as select from           ZI_ProductEquipmentAddnlProc as _Current
    left outer to one join I_MDChangeProcessModelTable  as _ModelTable on  _ModelTable.MDChgProcessSrceObjectTypeCode = '194'
                                                                       and _ModelTable.MDChgProcessModelTableName     = 'YEQUIP'
  association of exact one to exact one ZI_ProductEquipmentAddnlProc as _ProductEquipmentData on  $projection.MasterDataChangeProcess = _ProductEquipmentData.MasterDataChangeProcess
                                                                                              and $projection.MDChgProcessStep        = _ProductEquipmentData.MDChgProcessStep
                                                                                              and $projection.MDChgProcessSrceSystem  = _ProductEquipmentData.MDChgProcessSrceSystem
                                                                                              and $projection.MDChgProcessSrceObject  = _ProductEquipmentData.MDChgProcessSrceObject
                                                                                              and $projection.EquipmentNumber         = _ProductEquipmentData.EquipmentNumber
  association of exact one to one ZI_EquipmentView                   as _EquipmentText        on  $projection.EquipmentNumber = _EquipmentText.Equnr

{
  key _Current.MasterDataChangeProcess,
  key _Current.MDChgProcessStep,
  key _Current.MDChgProcessSrceSystem,
  key _Current.MDChgProcessSrceObject,
  key _Current.EquipmentNumber,
  key _ModelTable.MDChgProcessModelTableName,
  key cast( '' as fieldname )                                    as MDChangeProcessModelFieldName,
      _ModelTable.MDChangeProcModelTableDesc,
      cast ('' as as4text  )                                     as MDChangeProcessModelFieldDesc,
      _Current.MDChgProcessSourceModified,
      cast( 'ProductEquipmentData' as mdc_strucobjname )         as MDChgProcModelNodeExternalName,
      cast( 'ZI_ProductEquipmentDataProc_TP' as mdc_strucobjname ) as MDChgProcModTableExternalName,
      cast( _EquipmentText.eqktx as abap.char(539) )             as MDChgProcessRecordObjectText,

      /* Associations */
      _Current._Product                                          as _Product,
      _ProductEquipmentData
}
where
     _Current.MDChgProcessSourceModified = 'I'
  or _Current.MDChgProcessSourceModified = 'D'
union all select from    ZI_ProductEquipmentProcModif as _Modification
  inner join             ZI_ProductEquipmentAddnlProc as _Current    on  _Modification.MasterDataChangeProcess = _Current.MasterDataChangeProcess
                                                                     and _Modification.MDChgProcessStep        = _Current.MDChgProcessStep
                                                                     and _Modification.MDChgProcessSrceSystem  = _Current.MDChgProcessSrceSystem
                                                                     and _Modification.MDChgProcessSrceObject  = _Current.MDChgProcessSrceObject
                                                                     and _Modification.EquipmentNumber         = _Current.EquipmentNumber
  left outer to one join I_MDChangeProcessModelField  as _ModelField on  _ModelField.MDChgProcessSrceObjectTypeCode = '194'
                                                                     and _ModelField.MDChgProcessModelTableName     = 'YEQUIP'
                                                                     and _ModelField.MDChangeProcessModelFieldName  = _Modification.MDChgProcessModifiedFieldName
association of exact one to exact one ZI_ProductEquipmentAddnlProc as _ProductEquipmentData on  $projection.MasterDataChangeProcess = _ProductEquipmentData.MasterDataChangeProcess
                                                                                            and $projection.MDChgProcessStep        = _ProductEquipmentData.MDChgProcessStep
                                                                                            and $projection.MDChgProcessSrceSystem  = _ProductEquipmentData.MDChgProcessSrceSystem
                                                                                            and $projection.MDChgProcessSrceObject  = _ProductEquipmentData.MDChgProcessSrceObject
                                                                                            and $projection.EquipmentNumber         = _ProductEquipmentData.EquipmentNumber
association of exact one to one ZI_EquipmentView                   as _EquipmentText        on  $projection.EquipmentNumber = _EquipmentText.Equnr

{
  key _Current.MasterDataChangeProcess,
  key _Current.MDChgProcessStep,
  key _Current.MDChgProcessSrceSystem,
  key _Current.MDChgProcessSrceObject,
  key _Current.EquipmentNumber,
  key _ModelField.MDChgProcessModelTableName,
  key _Modification.MDChgProcessModifiedFieldName                as MDChangeProcessModelFieldName,
      _ModelField.MDChangeProcModelTableDesc,
      _ModelField.MDChangeProcessModelFieldDesc,
      _Current.MDChgProcessSourceModified,
      cast( 'ProductEquipmentData' as mdc_strucobjname )         as MDChgProcModelNodeExternalName,
      cast( 'ZI_ProductEquipmentDataProc_TP' as mdc_strucobjname ) as MDChgProcModTableExternalName,
      cast( _EquipmentText.eqktx as abap.char(539) )             as MDChgProcessRecordObjectText,
      /* Associations */
      _Current._Product                                          as _Product,
      _ProductEquipmentData
}

```
### <a id="ProcessBO-TP-nodeextension"></a>Transactional Processing view for the inactive data
```abap
@AccessControl.authorizationCheck: #MANDATORY
@EndUserText.label: 'TP View : Materal Equipment Data'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel: {
  usageType: {
    serviceQuality: #C,
    sizeCategory: #XXL,
    dataClass: #TRANSACTIONAL
  }
}
@VDM.viewType: #TRANSACTIONAL
define view entity ZI_ProductEquipmentDataProc_TP
  as select from ZI_ProductEquipmentAddnlProc
  association              to parent I_ProductProcTP           as _Product        on  $projection.MasterDataChangeProcess = _Product.MasterDataChangeProcess
                                                                                  and $projection.MDChgProcessStep        = _Product.MDChgProcessStep
                                                                                  and $projection.MDChgProcessSrceSystem  = _Product.MDChgProcessSrceSystem
                                                                                  and $projection.MDChgProcessSrceObject  = _Product.MDChgProcessSrceObject
  association of exact one to one I_Equipment                  as _Equipment      on  $projection.EquipmentNumber = _Equipment.Equipment
  association of exact one to one I_MDChgProcessUpdateStatusVH as _UpdateStatusVH on  $projection.MDChgProcessSourceModified = _UpdateStatusVH.MDChgProcessSourceModified
  association of exact one to one ZI_EquipmentView             as _EquipmentText  on  $projection.EquipmentNumber = _EquipmentText.Equnr

  /*+[hideWarning] { "IDS" : [ "KEY_CHECK", "CARDINALITY_CHECK" ]  } */
{
  key MasterDataChangeProcess,
  key MDChgProcessStep,
  key MDChgProcessSrceSystem,
  key MDChgProcessSrceObject,
  key EquipmentNumber,
      //      _EquipmentText.eqktx as EquipmentText,
      FiscalYearAsText,
      MonthOfConstruction,
      CountryKey,
      MDChgProcSrceLastChgdDateTime,
      MDChgProcessSourceModified,
      MDChgProcessSourceModifBinary,
      /* Associations */
      _Product,
      _Equipment,
      _UpdateStatusVH,
      _EquipmentText
}
```
### <a id="ProcessBO-TP-nodeextension-role"></a>CDS role for Transactional Processing view for the inactive data
```abap
@EndUserText.label: 'Access Control for TP VIew'
@MappingRole: true
define role ZI_PRODUCTEQUIPMENTDATAPROC_TP {
  grant
    select
      on
        ZI_PRODUCTEQUIPMENTDATAPROC_TP
          where
            inheriting conditions from entity ZI_ProductEquipmentAddnlProc;
            
}
```