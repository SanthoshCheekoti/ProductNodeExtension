---
layout: default
title: Behavior Definition Implementation
---

# Behavior Definition implementation of the Behavior extensions
## Behavior Implementation of node extension for I_ProductProcTP( CLass ZBP_X_I_PRODUCTPROCTP )
### Main Class
```abap
CLASS zbp_x_i_productproctp DEFINITION PUBLIC ABSTRACT FINAL FOR BEHAVIOR OF i_productproctp.
  PUBLIC SECTION.

    TYPES:
      BEGIN OF create,
        BEGIN OF entities,
          addnlequipment TYPE TABLE FOR CREATE i_productproctp\\product\_productequipmentdata,
        END OF entities,
        BEGIN OF entity,
          addnlequipment TYPE STRUCTURE FOR CREATE i_productproctp\\product\_productequipmentdata,
        END OF entity,
      END OF create,
      BEGIN OF read,
        BEGIN OF entities,
          addnlequipment TYPE TABLE FOR READ RESULT i_productproctp\\product\_productequipmentdata,
        END OF entities,
        BEGIN OF entity,
          addnlequipment TYPE STRUCTURE FOR READ RESULT  i_productproctp\\product\_productequipmentdata,
        END OF entity,
      END OF read,
      BEGIN OF update,
        BEGIN OF entities,
          addnlequipment TYPE TABLE FOR UPDATE i_productproctp\\producteqipmentdata,
        END OF entities,
        BEGIN OF entity,
          addnlequipment TYPE STRUCTURE FOR UPDATE  i_productproctp\\producteqipmentdata,
        END OF entity,
      END OF update,
      BEGIN OF delete,
        BEGIN OF entities,
          addnlequipment TYPE TABLE FOR DELETE i_productproctp\\producteqipmentdata,
        END OF entities,
        BEGIN OF entity,
          addnlequipment TYPE STRUCTURE FOR DELETE  i_productproctp\\producteqipmentdata,
        END OF entity,
      END OF delete,
      BEGIN OF response,
        BEGIN OF early,
          mapped   TYPE RESPONSE FOR MAPPED EARLY i_productproctp,
          failed   TYPE RESPONSE FOR FAILED EARLY i_productproctp,
          reported TYPE RESPONSE FOR REPORTED EARLY i_productproctp,
        END OF early,
        BEGIN OF late,
          mapped   TYPE RESPONSE FOR MAPPED LATE i_productproctp,
          failed   TYPE RESPONSE FOR FAILED LATE i_productproctp,
          reported TYPE RESPONSE FOR REPORTED LATE i_productproctp,
        END OF late,
      END OF response.

  PRIVATE SECTION.
    CLASS-DATA grant_master TYPE REF TO if_mdc_grant_master_mat.
ENDCLASS.

CLASS zbp_x_i_productproctp IMPLEMENTATION.

ENDCLASS.
```
### Local Type ( Handler classes )
```abap

CLASS lhc_producteqipmentdata DEFINITION INHERITING FROM cl_abap_behavior_handler.
  PRIVATE SECTION.

    METHODS onsavefields_equip FOR DETERMINE ON SAVE
      IMPORTING keys FOR producteqipmentdata~onsavefields_equip.
    METHODS get_global_authorizations FOR GLOBAL AUTHORIZATION
      IMPORTING REQUEST requested_authorizations FOR producteqipmentdata RESULT result.

    METHODS savemasseditprodequipmentdata FOR MODIFY
      IMPORTING keys FOR ACTION producteqipmentdata~savemasseditprodequipmentdata RESULT result.

ENDCLASS.

CLASS lhc_producteqipmentdata IMPLEMENTATION.

  METHOD onsavefields_equip.
    DATA(response) = bp_i_productproctp=>handler->set_record_status(
      data_definition_name = zcc_mdc_194=>ext_virtualmodel-inactive-node-producteqipmentdata
      keys                 = REF #( keys )
    ).
    reported = response-reported.
  ENDMETHOD.

  METHOD get_global_authorizations.
  ENDMETHOD.

  METHOD savemasseditprodequipmentdata.

    CAST cl_product_staging_handler( bp_i_productproctp=>handler )->if_mdc_staging_handler~mass_edit(
      EXPORTING
        mass_edit                = keys
      CHANGING
        result                   = result
        failed                   = failed-product
        reported                 = reported-product
    ).
  ENDMETHOD.

ENDCLASS.
```
## Behavior Implementation of node extension for I_ProductGovTP( CLass ZBP_X_B_I_PRODUCTGOVTP)
### Main Class
```abap
CLASS zbp_x_b_i_productgovtp DEFINITION PUBLIC ABSTRACT FINAL FOR BEHAVIOR OF i_productgovtp.
  PUBLIC SECTION.
    CLASS-DATA mdc_governance TYPE REF TO if_mdc_governance.
    CLASS-DATA prod_proc_handler TYPE REF TO if_product_gov_proc_handler.

    TYPES :
      BEGIN OF feature,
        BEGIN OF productequipment,
          keys    TYPE TABLE FOR FEATURES KEY i_productgovtp\\zzproductequipmentdata,
          request TYPE STRUCTURE FOR FEATURES REQUEST i_productgovtp\\zzproductequipmentdata,
          results TYPE TABLE FOR FEATURES RESULT i_productgovtp\\zzproductequipmentdata,
        END OF productequipment,
      END OF feature.
    CLASS-METHODS class_constructor.
ENDCLASS.

CLASS zbp_x_b_i_productgovtp IMPLEMENTATION.
  METHOD class_constructor.
    mdc_governance = cl_mdc_governance_prd=>get( if_mdg_otc_const=>material ).
  ENDMETHOD.
ENDCLASS.
```
### Local Types( Handler and saver class)
```abap
CLASS lhc_equipmentaddnldata DEFINITION INHERITING FROM cl_abap_behavior_handler.
  PRIVATE SECTION.

    METHODS get_instance_features FOR INSTANCE FEATURES
      IMPORTING keys REQUEST requested_features FOR zzproductequipmentdata RESULT result.



ENDCLASS.

CLASS lhc_equipmentaddnldata IMPLEMENTATION.

  METHOD get_instance_features.
    DATA mdc_feature_control TYPE zbp_x_b_i_productgovtp=>feature-productequipment-results.

    FINAL(staging_handler) = CAST cl_product_staging_handler( cl_product_staging_handler=>get_handler( '194' ) ).


    staging_handler->if_mdc_staging_handler~feature_control(
      EXPORTING
        data_definition_name = zcc_mdc_194=>ext_virtualmodel-governance-node-producteqipmentdata
        keys                 = keys
        request              = requested_features
      CHANGING
        results              = result
        failed               = failed-zzproductequipmentdata
        reported             = reported-zzproductequipmentdata
    ).
    READ ENTITIES OF i_productgovtp IN LOCAL MODE
      ENTITY zzproductequipmentdata FIELDS ( equipmentnumber ) WITH CORRESPONDING #( keys )
      RESULT DATA(equipementdata) FAILED failed.
    LOOP AT equipementdata REFERENCE INTO DATA(equipment).
      APPEND INITIAL LINE TO result ASSIGNING FIELD-SYMBOL(<result>).
      MOVE-CORRESPONDING equipment->* TO <result>.
      <result>-%features-%field-equipmentnumberforedit = COND #( WHEN equipment->equipmentnumber IS INITIAL
                                                                  THEN if_abap_behv=>fc-f-mandatory
                                                                  ELSE if_abap_behv=>fc-f-read_only   ).

      <result>-%features-%field-countrykey = COND #( WHEN equipment->countrykey IS INITIAL THEN if_abap_behv=>fc-f-mandatory  ).
    ENDLOOP.
  ENDMETHOD.



ENDCLASS.

CLASS lsc_i_productgovtp DEFINITION INHERITING FROM cl_abap_behavior_saver.
  PROTECTED SECTION.

    METHODS adjust_numbers REDEFINITION.

    METHODS save_modified REDEFINITION.

    METHODS cleanup_finalize REDEFINITION.
ENDCLASS.

CLASS lsc_i_productgovtp IMPLEMENTATION.
  METHOD adjust_numbers.
    zbp_x_b_i_productgovtp=>mdc_governance->adjust_numbers(
      CHANGING
        mapped = mapped
    ).
  ENDMETHOD.
  METHOD save_modified.
    DATA key TYPE bp_i_productgovtp=>key-entity-product.
    DATA failed TYPE bp_i_productgovtp=>response-late-failed.

    TRY.
        zbp_x_b_i_productgovtp=>mdc_governance->save_changes(
          EXPORTING
            creations = create
            updates   = update
            deletions = delete
          CHANGING
            reported  = reported
        ).
      CATCH cx_dynamic_check cx_mdc_model cx_mdc_configuration INTO DATA(exception).
        DATA(message) = NEW symsg( CORRESPONDING #( if_t100_message=>default_textid ) ).
        message->msgty = if_abap_behv_message=>severity-error.
        cm_mdc_i_message=>report_message(
          EXPORTING
            key      = REF #( key )
            message  = message->*
          CHANGING
            failed   = failed-product
            reported = reported-product
        ).
    ENDTRY.
  ENDMETHOD.

  METHOD cleanup_finalize.
  ENDMETHOD.
ENDCLASS.
```