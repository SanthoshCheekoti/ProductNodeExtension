# Behavior Definition extension for SAP delivered Original BDEF
## <a id="bdefExtnd-Process-BO-TP"></a> BDEF Extension for transactional processing view of Processing BO
```abap
extension implementation in class zbp_x_i_productproctp unique;

extend behavior for I_ProductProcTP
{
  association _ProductEquipmentData { create; }
}

define behavior for ZI_ProductEquipmentDataProc_TP alias ProductEqipmentData with additional save
persistent table zyequip_prc
lock dependent
authorization dependent

{
  field ( readonly )
  MasterDataChangeProcess,
  MDChgProcessStep,
  MDChgProcessSrceObject,
  MDChgProcessSrceSystem;
  field ( mandatory : create, readonly : update ) EquipmentNumber;
  association _Product;
  update;
  delete;
  mapping for zyequip_prc
    {
      MasterDataChangeProcess       = process_id;
      MDChgProcessStep              = process_step_no;
      MDChgProcessSrceSystem        = source_system;
      MDChgProcessSrceObject        = source_id;
      EquipmentNumber               = yyequnr;
      FiscalYearAsText              = yybaujj;
      MonthOfConstruction           = yybaumm;
      CountryKey                    = yyherld;
      MDChgProcSrceLastChgdDateTime = source_recency;
      MDChgProcessSourceModified    = source_modified;
      MDChgProcessSourceModifBinary = source_modification_blip;
    }

  determination onSaveFields_Equip on save
  {
    create;
    field FiscalYearAsText, MonthOfConstruction, CountryKey;
  }

  static action ( authorization : global ) SaveMassEditProdEquipmentData parameter D_MDChangeProcessSaveMassEditP result [1] D_MDChangeProcessSaveMassEditR;
}
```
## <a id="bdefExtnd-Process-BO-CV"></a> BDEF Extension for consumption view of Process BO
```abap
extension for projection implementation in class zbp_x_c_productproctp unique;

extend behavior for Product
{
  use association _ProductEquipmentData;
}

define behavior for ZC_PRODUCTEQUIPMENTDATAPROC_TP alias  ProductEqipmentData
{
    use update;
    use association _Product;

    use action SaveMassEditProdEquipmentData;
}
```