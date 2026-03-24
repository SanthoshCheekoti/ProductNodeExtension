# Metadata Extensions
## <a id="MDE-CHG-PROCESS-BO"></a>Create Metadata extension for Change Process BO
```abap
@Metadata.layer: #CUSTOMER

annotate view C_MDChgProcProdDetailsTP with
{
  @UI.facet: [{
      id: '_ProductEquipmentData',
      
      purpose: #STANDARD,
      
      type: #LINEITEM_REFERENCE,
      
      targetElement: '_ProductEquipmentData',
      
      position: 110 ,
      
      label: 'Equipment Data',
      
      hidden: #(MDChgProcProdDescIsHidden)
  }]
  
  @UI.hidden: true
  MDChgProcProdEquipIsHidden;
}
```
