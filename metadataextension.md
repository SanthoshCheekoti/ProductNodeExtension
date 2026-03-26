---
layout: default
title: Metadata Extensions
---

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
## <a id="MDE-PROCESS-BO-CV"></a>Create Metadata extension for Projection view
```abap
@Metadata.layer: #CUSTOMER
annotate view ZC_PRODUCTEQUIPMENTDATAPROC_TP with
{
  @UI: {
    lineItem: [ {
      importance: #HIGH,
      position: 20
    } ]
  }
  Product;
  @UI: {
    lineItem: [ {
      importance: #HIGH,
      position: 30
    } ]
  }
  @Consumption.valueHelpDefinition: [ {
  entity: {
    name: 'ZI_EquipmentView',
    element: 'Equnr'
  },
  distinctValues: true
  } ]
  @Consumption: {
  filter: {
   multipleSelections: true,
   selectionType: #SINGLE
  }
  }
  EquipmentNumber;

  //  @UI: {
  //  lineItem: [ {
  //    importance: #HIGH,
  //    position: 40
  //  } ]
  //  }
  @UI.hidden: true
  EquipmentText;
  @UI: {
       lineItem: [
         { semanticObjectAction: 'govern',semanticObject: 'Product', type: #WITH_INTENT_BASED_NAVIGATION, position: 1, importance: #HIGH, label:'Record Identification'  },
         { dataAction: 'SaveMassEditProdEquipmentData', type: #FOR_ACTION, label: 'Mass Edit' }
       ]
     }
  @Consumption.filter.hidden: true
  RecordIdentificationText;

  @Consumption: {
    valueHelpDefinition: [
      { entity: {name: 'C_Countryvhtemp', element: 'Country' } }
    ]
  }
  @UI: {
  lineItem: [ {
  importance: #HIGH,
  position: 55
  } ]
  }
  CountryKey;
  @UI: {
  lineItem: [ {
  importance: #HIGH,
  position: 65
  } ]
  }
  FiscalYearAsText;
  @UI: {
  lineItem: [ {
  importance: #HIGH,
  position: 75
  } ]
  }
  MonthOfConstruction;
  /************************************** Begin of Step Status Fields Annotations*****************************************************/
  @UI.textArrangement:#TEXT_FIRST
  @EndUserText.label: 'Row Type'
  @Consumption.valueHelpDefinition: [{ entity: {name: 'I_MDChangeProcessKPIRowVH', element: 'MDChgProcKPIUpdateStatus' } }]
  @Consumption: {
    filter: {
      multipleSelections: true,
      selectionType: #SINGLE
    }
  }
  MDChgProcKPIUpdateStatus;
  @EndUserText.label: 'Changes'
  @UI.lineItem: [{ importance: #HIGH, position: 80 }]
  MDChgProcModifdObjectsCount;
  @UI.hidden: true
  MDChgProcKPIRecordTypeText;
  @UI.hidden: true
  MDChgProcKPIRecordStatusText;
  @UI.hidden: true
  MDChgProcKPIUpdateStatusText;
  @Consumption.valueHelpDefinition: [{ entity: {name: 'I_MDChgProcKPILogClassVH', element: 'MDChangeProcKPIValueKey' } }]
  MDChangeProcessMessageType;
  @Consumption.valueHelpDefinition: [{ entity: {name: 'I_MDChgProcKPIFltrActvtnStsVH', element: 'MDChgProcessActivationTarget' } }]
  MDChgProcessActivationTarget;
  @Consumption.valueHelpDefinition: [{ entity: {name: 'I_MDChgProcKPIFltrRplctnVH', element: 'MDChgProcessReplicationStatus' } }]
  MDChgProcessReplicationStatus;
  @UI.hidden: true
  MDChgProcReplicationStatusText;
  /* Hide fields */
  @Consumption.filter.hidden: true
  @EndUserText: {
    label: 'Process ID',
    quickInfo: 'Process ID'
  }
  @UI.hidden: true
  MasterDataChangeProcess;
  @Consumption.filter.hidden: true
  @UI.hidden: true
  MDChgProcessStep;

  @Consumption.filter.hidden: true
  @UI.hidden: true
  MDChgProcessSrceObject;

  @Consumption.filter.hidden: true
  @UI.hidden: true
  MDChgProcessSourceModifBinary;

  @Consumption.filter.hidden: true
  @UI.hidden: true
  MDChgProcessSourceModified;

  @Consumption.filter.hidden: true
  @UI.hidden: true
  MDChgProcSrceLastChgdDateTime;

  @Consumption.filter.hidden: true
  @UI.hidden: true
  MDChgProcessSrceSystem;
}
```
## <a id="MDE-GOV-BO-CV-EXTN"></a>Create Metadata extension in customer layer for projection view of root entity for governance BO
```abap
@Metadata.layer: #CUSTOMER
annotate entity C_ProductGovTP with
{
  @UI.facet: [

  { 
    id: 'EquipmentAddnlData',
    purpose: #STANDARD,
    type: #COLLECTION,
    label: 'Equipment Additional Data',
     position: 300 
  },
     
     
  { 
      id: 'EquipmentAddnlDataLineItem',
      parentId: 'EquipmentAddnlData',
      purpose: #STANDARD,
      type: #LINEITEM_REFERENCE,
      position: 110,
      targetElement: '_ZZPRODUCTEQUIPMENTDATA' }

  ]
  
  @UI.hidden: true
  @Consumption.filter.hidden: true
  MDChgProcProdUoMIsHidden;
}
```
## <a id="MDE-GOV-BO-PV-EXTN"></a>Create Metadata extension for projection view of node extension
```abap
@Metadata.layer: #CORE
@UI: {
createHidden: false,
  headerInfo: {
    typeName: 'Equipment',
    typeNamePlural: 'Equipments'
  }
}
annotate entity ZC_PRODUCTEQUIPMENTADDNLGOVTP with
{
  @UI.facet: [ {
    id: 'EquipmentAddnlData',
    label: 'Product Description',
    position: 10,
    purpose: #STANDARD,
    targetQualifier: 'EquipmentAddnlData',
    type: #FIELDGROUP_REFERENCE
  }
  ]
  @UI.hidden: true
  @Consumption.filter.hidden: true
  @EndUserText: {
    label: 'Process ID',
    quickInfo: 'Process ID'
  }
  MasterDataChangeProcess;
  @Consumption.filter.hidden: true
  @UI.hidden: true
  MDChgProcessSrceObject;
  @Consumption.filter.hidden: true
  @UI.hidden: true
  MDChgProcessSrceSystem;
  @UI.hidden: true
  EquipmentNumber;
  @UI.fieldGroup: [ {
    position: 10,
    qualifier: 'EquipmentAddnlData'
  }
  ]
  @UI.lineItem: [ {
  label: 'Equipment',
  position: 10
} ]
  @Consumption.valueHelpDefinition: [
  {
    entity: {
      name: 'ZI_EquipmentView',
      element: 'Equnr'
    },
    distinctValues: true
  }
]
  EquipmentNumberForEdit;
  @EndUserText: {
  label: 'Equipment',
  quickInfo: 'Equipment'
  }
  EquipmentText;
  @UI.lineItem: [ {
  label: 'Fiscal year as text',
  position: 20
  } ]
  FiscalYearAsText;
  @UI.lineItem: [ {
  label: 'Month of construction',
  position: 30
  } ]
  MonthOfConstruction;  
  @UI.lineItem: [ {
  label: 'Country',
  position: 40
  } ]
  @Consumption.valueHelpDefinition: [ 
    {
      entity: {
        name: 'I_Country',
        element: 'Country'
      },
      distinctValues: true
    } 
  ]  
  CountryKey;    
}
```