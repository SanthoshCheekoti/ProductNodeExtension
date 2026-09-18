---
layout: default
title: Extend SAP-Delivered CDS Views
---

# Extend SAP-Delivered CDS views with extension node
##  <a id="cdsViewExtnd-Process-BO"></a> CDS View extend for I_ProductProcTP
```abap
extend view entity I_ProductProcTP with 
composition [0..*] of ZI_ProductEquipmentDataProc_TP as _ProductEquipmentData
{
  _ProductEquipmentData
}
```
## <a id="cdsViewExtnd-Gov-BO"></a> CDS View extend for I_ProductGovTP
```abap
extend view entity I_ProductGovTP with
composition [0..*] of ZI_PRODUCTEQUIPMENTADDNLGOVTP as _ZZPRODUCTEQUIPMENTDATA
{
  _ZZPRODUCTEQUIPMENTDATA
}
```