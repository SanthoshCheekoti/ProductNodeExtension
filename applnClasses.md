---
layout: default
title: Inheriting standard MDG Application classes to handle integration between RAP Layer and CMP later
---
## Constants/Enumeration class
```abap
CLASS zcc_mdc_194 DEFINITION
  PUBLIC
  INHERITING FROM cc_mdc_194
  FINAL
  CREATE PROTECTED GLOBAL FRIENDS if_mdc_responsibility .

  PUBLIC SECTION.
    CLASS-DATA :

      BEGIN OF node_ext_draft READ-ONLY,

        BEGIN OF table.
          INCLUDE STRUCTURE cc_mdc_194=>draft-table AS super.CLASS-DATA:
          producteqipmentdata TYPE mdc_strucobjname VALUE 'YEQUIP_GOV_DFT',
        END OF table,

        BEGIN OF view.
          INCLUDE STRUCTURE cc_mdc_194=>draft-view AS super.CLASS-DATA:
          producteqipmentdata TYPE mdc_strucobjname VALUE 'ZR_PRODUCTEQUIPADDNLDATA',
        END OF view,

      END OF node_ext_draft,

      BEGIN OF node_ext_inactive READ-ONLY,

        BEGIN OF table.
          INCLUDE STRUCTURE cc_mdc_194=>inactive-table AS super.CLASS-DATA:
          producteqipmentdata TYPE mdc_strucobjname VALUE 'ZYEQUIP_PRC',
        END OF table,

      END OF node_ext_inactive,

      BEGIN OF node_ext_persistence READ-ONLY,

        BEGIN OF table.
          INCLUDE STRUCTURE cc_mdc_194=>persistence-table AS super.CLASS-DATA:
          producteqipmentdata TYPE mdc_strucobjname VALUE 'YEQUIP',
        END OF table,

      END OF node_ext_persistence,

      BEGIN OF node_ext_virtualmodel READ-ONLY,

        BEGIN OF entity.
          INCLUDE STRUCTURE cc_mdc_194=>virtualmodel-entity AS super.CLASS-DATA:
          producteqipmentdata TYPE mdc_strucobjname VALUE 'ZZProductEquipmentData',
        END OF entity,

        BEGIN OF inactive,

          BEGIN OF node.
            INCLUDE STRUCTURE cc_mdc_194=>virtualmodel-inactive-node AS super.CLASS-DATA:
            producteqipmentdata TYPE mdc_strucobjname VALUE 'ZI_PRODUCTEQUIPMENTDATAPROC_TP',
          END OF node,

          BEGIN OF projection.
            INCLUDE STRUCTURE cc_mdc_194=>virtualmodel-inactive-projection AS super.CLASS-DATA:
            producteqipmentdata TYPE mdc_strucobjname VALUE 'ZC_PRODUCTEQUIPMENTDATAPROC_TP',
          END OF projection,

          BEGIN OF keys.
            INCLUDE STRUCTURE cc_mdc_194=>virtualmodel-inactive-keys AS super.CLASS-DATA:
            BEGIN OF producteqipmentdata,
            masterdatachangeprocess TYPE fieldname VALUE 'MASTERDATACHANGEPROCESS',
            mdchgprocessstep        TYPE fieldname VALUE 'MDCHGPROCESSSTEP',
            mdchgprocesssrceobject  TYPE fieldname VALUE 'MDChgProcessSrceObject',
            mdchgprocesssrcesystem  TYPE fieldname VALUE 'MDChgProcessSrceSystem',
            equipmentnumber         TYPE fieldname VALUE 'EquipmentNumber',
          END OF producteqipmentdata,
        END OF keys,

        BEGIN OF hidden_fields.

          INCLUDE STRUCTURE cc_mdc_194=>virtualmodel-inactive-hidden_fields AS super.CLASS-DATA:
          producteqipmentdata TYPE mdc_strucobjname VALUE 'MDChgProcProdEquipIsHidden',

        END OF hidden_fields,

        BEGIN OF changes,

          BEGIN OF projection.

            INCLUDE STRUCTURE cc_mdc_194=>virtualmodel-inactive-changes-projection AS super.CLASS-DATA:
            producteqipmentdata TYPE mdc_strucobjname VALUE 'ZC_PRODUCTEQUIPMENTPROCCHANGE',

          END OF projection,

        END OF changes,

      END OF inactive,
      BEGIN OF governance,

        BEGIN OF node.
          INCLUDE STRUCTURE cc_mdc_194=>virtualmodel-governance-node AS super.CLASS-DATA:
          producteqipmentdata TYPE mdc_strucobjname VALUE 'ZI_PRODUCTEQUIPMENTADDNLGOVTP',
        END OF node,

        BEGIN OF alias.
          INCLUDE STRUCTURE cc_mdc_194=>virtualmodel-governance-alias AS super.CLASS-DATA:
          producteqipmentdata TYPE mdc_strucobjname VALUE 'ZZPRODUCTEQUIPMENTDATA',
        END OF alias,

        BEGIN OF unified_api.
          INCLUDE STRUCTURE cc_mdc_194=>virtualmodel-governance-unified_api AS super.CLASS-DATA:
          producteqipmentdata TYPE mdc_strucobjname VALUE 'ZZEQUIP_EXT_T',
        END OF unified_api,

      END OF governance,
      BEGIN OF facet.
        INCLUDE STRUCTURE cc_mdc_194=>virtualmodel-facet AS super.CLASS-DATA:
        producteqipmentdata TYPE mdc_strucobjname VALUE '_PRODUCTEQUIPMENTDATA',
      END OF facet,
    END OF node_ext_virtualmodel.

    CLASS-DATA:
      BEGIN OF ext_draft READ-ONLY,
        table LIKE node_ext_draft-table,
        view  LIKE node_ext_draft-view,
      END OF ext_draft,

      BEGIN OF ext_inactive READ-ONLY,
        table LIKE node_ext_inactive-table,
      END OF ext_inactive,

      BEGIN OF ext_persistence READ-ONLY,
        table LIKE node_ext_persistence-table,
      END OF ext_persistence,

      BEGIN OF ext_virtualmodel READ-ONLY,
        entity LIKE node_ext_virtualmodel-entity,
        BEGIN OF inactive,
          node          LIKE node_ext_virtualmodel-inactive-node,
          projection    LIKE node_ext_virtualmodel-inactive-projection,
          keys          LIKE node_ext_virtualmodel-inactive-keys,
          hidden_fields LIKE node_ext_virtualmodel-inactive-hidden_fields,
          BEGIN OF changes,
            projection LIKE node_ext_virtualmodel-inactive-changes-projection,
          END OF changes,
        END OF inactive,

        BEGIN OF governance,
          node        LIKE node_ext_virtualmodel-governance-node,
          alias       LIKE node_ext_virtualmodel-governance-alias,
          unified_api LIKE node_ext_virtualmodel-governance-unified_api,
        END OF governance,

        facet  LIKE node_ext_virtualmodel-facet,

      END OF  ext_virtualmodel.
    CLASS-METHODS class_constructor.
    METHODS if_mdc_enumerating~persistence_tables
        REDEFINITION .
    METHODS if_mdc_enumerating~draft_tables
        REDEFINITION .
    METHODS if_mdc_enumerating~draft_views
        REDEFINITION .
    METHODS if_mdc_enumerating~get_active_for_inactive
        REDEFINITION .
    METHODS if_mdc_enumerating~get_entity_camelcase
        REDEFINITION .
    METHODS if_mdc_enumerating~get_inactive_for_active
        REDEFINITION .
    METHODS if_mdc_enumerating~get_inactive_for_entity
        REDEFINITION .
    METHODS if_mdc_enumerating~get_inactive_for_governance
        REDEFINITION .
    METHODS if_mdc_enumerating~get_inactive_for_inactive_tab
        REDEFINITION .
    METHODS if_mdc_enumerating~get_inactive_for_persistence
        REDEFINITION .
    METHODS if_mdc_enumerating~get_inactive_for_projection
        REDEFINITION .
    METHODS if_mdc_enumerating~get_inactive_tab_for_inactive
        REDEFINITION .
    METHODS if_mdc_enumerating~get_persistence_for_governance
        REDEFINITION .
    METHODS if_mdc_enumerating~get_persistence_for_inactive
        REDEFINITION .
    METHODS if_mdc_enumerating~get_persistence_for_projection
        REDEFINITION .
    METHODS if_mdc_enumerating~get_proj_for_changes_proj
        REDEFINITION .
    METHODS if_mdc_enumerating~vm_entities
        REDEFINITION .
    METHODS if_mdc_enumerating~vm_governance_nodes
        REDEFINITION .
    METHODS if_mdc_enumerating~vm_inactive_nodes
        REDEFINITION .
    METHODS if_mdc_enumerating~vm_projection_nodes
        REDEFINITION .
    METHODS if_mdc_enumerating~get_keys_for_inactive
        REDEFINITION .
    METHODS if_mdc_enumerating~get_draft_for_active REDEFINITION.
    METHODS if_mdc_enumerating~get_inactive_for_hidden_field REDEFINITION.
    METHODS if_mdc_enumerating~vm_facets REDEFINITION.
    METHODS if_mdc_enumerating~get_facet_for_persistence REDEFINITION.
    METHODS if_mdc_enumerating~get_persistence_for_facet REDEFINITION.
    METHODS if_mdc_enumerating~get_entity_for_inactive REDEFINITION.
    METHODS if_mdc_enumerating~get_governance_for_alias REDEFINITION.
    METHODS if_mdc_enumerating_194~get_deletion_marker_for_alias REDEFINITION.
    METHODS if_mdc_enumerating_194~get_unified_api_name_for_alias REDEFINITION.
    METHODS if_mdc_enumerating_194~get_draft_view_for_governance REDEFINITION.
    METHODS if_mdc_enumerating_194~get_entity_for_draft_view REDEFINITION.
    METHODS if_mdc_enumerating~get_alias_for_governance REDEFINITION.
    METHODS if_mdc_enumerating_194~get_governance_for_persistence REDEFINITION.
    METHODS get_gov_alias_for_active
      IMPORTING table_name   TYPE  mdc_strucobjname
      RETURNING VALUE(alias) TYPE  mdc_strucobjname.

  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcc_mdc_194 IMPLEMENTATION.

  METHOD class_constructor.
    ext_draft-table                   = node_ext_draft-table.
    ext_draft-table-super             = draft-table.

    ext_draft-view                    = node_ext_draft-view.
    ext_draft-view-super              = draft-view.

    ext_inactive-table                = node_ext_inactive-table.
    ext_inactive-table-super          = inactive-table.

    ext_persistence-table             = node_ext_persistence-table.
    ext_persistence-table-super       = persistence-table.

    ext_virtualmodel-entity           = node_ext_virtualmodel-entity.
    ext_virtualmodel-entity-super     = virtualmodel-entity.

    ext_virtualmodel-inactive-changes-projection       = node_ext_virtualmodel-inactive-changes-projection.
    ext_virtualmodel-inactive-changes-projection-super = virtualmodel-inactive-changes-projection.

    ext_virtualmodel-inactive-hidden_fields       = node_ext_virtualmodel-inactive-hidden_fields.
    ext_virtualmodel-inactive-hidden_fields-super = virtualmodel-inactive-hidden_fields.

    ext_virtualmodel-inactive-keys       = node_ext_virtualmodel-inactive-keys.
    ext_virtualmodel-inactive-keys-super = virtualmodel-inactive-keys.

    ext_virtualmodel-inactive-node       = node_ext_virtualmodel-inactive-node.
    ext_virtualmodel-inactive-node-super = virtualmodel-inactive-node.

    ext_virtualmodel-inactive-projection       = node_ext_virtualmodel-inactive-projection.
    ext_virtualmodel-inactive-projection-super = virtualmodel-inactive-projection.

    ext_virtualmodel-governance-node      =  node_ext_virtualmodel-governance-node.
    ext_virtualmodel-governance-node-super = virtualmodel-governance-node.

    ext_virtualmodel-governance-alias     =  node_ext_virtualmodel-governance-alias.
    ext_virtualmodel-governance-alias-super = virtualmodel-governance-alias.

    ext_virtualmodel-governance-unified_api     =  node_ext_virtualmodel-governance-unified_api.
    ext_virtualmodel-governance-unified_api-super = virtualmodel-governance-unified_api.

    ext_virtualmodel-facet     =  node_ext_virtualmodel-facet.
    ext_virtualmodel-facet-super = virtualmodel-facet.

  ENDMETHOD.
  METHOD if_mdc_enumerating~draft_tables.
    RETURN structured_values( ext_draft-table ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~draft_views.
    RETURN structured_values( ext_draft-view ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_active_for_inactive.
    RETURN get_corresponding(
    original_entity = inactive
    original_structure = me->ext_inactive-table
    target_structure = ext_persistence-table
  ).

  ENDMETHOD.

  METHOD if_mdc_enumerating~get_entity_camelcase.
    node = get_corresponding(
      original_entity    = name
      original_structure = ext_virtualmodel-inactive-node
      target_structure   = ext_virtualmodel-inactive-node
    ).
    IF node IS NOT INITIAL.
      RETURN node.
    ENDIF.
    node = get_corresponding(
      original_entity    = name
      original_structure = ext_virtualmodel-governance-node
      target_structure   = ext_virtualmodel-governance-node
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_entity_for_inactive.
    RETURN get_corresponding(
      original_entity    = node
      original_structure = ext_virtualmodel-inactive-node
      target_structure   = ext_virtualmodel-entity
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_facet_for_persistence.
    RETURN get_corresponding(
      original_entity = table
      original_structure = ext_persistence-table
      target_structure = ext_virtualmodel-facet
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_governance_for_alias.
    RETURN get_corresponding(
      original_entity    = alias
      original_structure = ext_virtualmodel-governance-alias
      target_structure   = ext_virtualmodel-governance-node
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_inactive_for_active.
    RETURN get_corresponding(
      original_entity = active
      original_structure = ext_persistence-table
      target_structure = me->ext_inactive-table
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_inactive_for_entity.
    RETURN get_corresponding(
      original_entity = entity
      original_structure = ext_virtualmodel-entity
      target_structure = ext_virtualmodel-inactive-node
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_inactive_for_governance.
    RETURN get_corresponding(
       original_entity = node
       original_structure = ext_virtualmodel-governance-node
       target_structure = ext_virtualmodel-inactive-node
     ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_inactive_for_hidden_field.
    RETURN get_corresponding(
      original_entity = field_name
      original_structure = ext_virtualmodel-inactive-hidden_fields
      target_structure = ext_virtualmodel-inactive-node
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_inactive_for_inactive_tab.
    RETURN get_corresponding(
      original_entity = inactive_table
      original_structure = me->ext_inactive-table
      target_structure = ext_virtualmodel-inactive-node
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_inactive_for_persistence.
    RETURN get_corresponding(
      original_entity = table
      original_structure = ext_persistence-table
      target_structure = ext_virtualmodel-inactive-node
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_inactive_for_projection.
    RETURN get_corresponding(
      original_entity = node
      original_structure = ext_virtualmodel-inactive-projection
      target_structure = ext_virtualmodel-inactive-node
    ).
  ENDMETHOD.


  METHOD if_mdc_enumerating~get_inactive_tab_for_inactive.
    RETURN get_corresponding(
       original_entity = node
       original_structure = ext_virtualmodel-inactive-node
       target_structure = me->ext_inactive-table
     ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_keys_for_inactive.
    DATA(keysstructure) = get_corresponding_any(
      original_entity    = node
      original_structure = ext_virtualmodel-inactive-node
      target_structure   = ext_virtualmodel-inactive-keys
    ).
    RETURN structured_values( keysstructure->* ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_persistence_for_facet.
    RETURN get_corresponding(
      original_entity = node
      original_structure = ext_virtualmodel-facet
      target_structure = ext_persistence-table
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_persistence_for_governance.
    RETURN get_corresponding(
      original_entity = node
      original_structure = ext_virtualmodel-governance-node
      target_structure = ext_persistence-table
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_persistence_for_inactive.
    RETURN get_corresponding(
      original_entity = node
      original_structure = ext_virtualmodel-inactive-node
      target_structure = ext_persistence-table
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_persistence_for_projection.
    RETURN get_corresponding(
      original_entity = node
      original_structure = ext_virtualmodel-inactive-projection
      target_structure = ext_persistence-table
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_proj_for_changes_proj.
    RETURN get_corresponding(
      original_entity = changesprojection
      original_structure = ext_virtualmodel-inactive-changes-projection
      target_structure = ext_virtualmodel-inactive-projection
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~persistence_tables.
    RETURN structured_values( ext_persistence-table ).
  ENDMETHOD.


  METHOD if_mdc_enumerating~vm_entities.
    RETURN structured_values( ext_virtualmodel-entity ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~vm_facets.
    RETURN structured_values( ext_virtualmodel-facet ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~vm_governance_nodes.
    RETURN structured_values( ext_virtualmodel-governance-node ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~vm_inactive_nodes.
    RETURN structured_values( ext_virtualmodel-inactive-node ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~vm_projection_nodes.
    RETURN structured_values( ext_virtualmodel-inactive-projection ).
  ENDMETHOD.

  METHOD if_mdc_enumerating_194~get_deletion_marker_for_alias.
    IF alias EQ ext_virtualmodel-governance-alias-producteqipmentdata.
      RETURN 'DELETE_ROW'.
    ELSE.
      RETURN super->if_mdc_enumerating_194~get_deletion_marker_for_alias( alias ).
    ENDIF.
  ENDMETHOD.

  METHOD if_mdc_enumerating_194~get_draft_view_for_governance.
    RETURN get_corresponding(
      original_entity    = node
      original_structure = ext_virtualmodel-governance-node
      target_structure   = ext_draft-view
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating_194~get_entity_for_draft_view.
    RETURN get_corresponding(
      original_entity    = draft_view_name
      original_structure = ext_draft-view
      target_structure   = ext_virtualmodel-entity
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating_194~get_governance_for_persistence.
    RETURN get_corresponding(
      original_entity    = table
      original_structure = ext_persistence-table
      target_structure   = ext_virtualmodel-governance-node
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating_194~get_unified_api_name_for_alias.
    RETURN get_corresponding(
      original_entity    = alias
      original_structure = ext_virtualmodel-governance-alias
      target_structure   = ext_virtualmodel-governance-unified_api
    ).
  ENDMETHOD.

  METHOD get_gov_alias_for_active.
    RETURN get_corresponding(
      original_entity    = table_name
      original_structure = ext_persistence-table
      target_structure   = ext_virtualmodel-governance-alias
    ).
  ENDMETHOD.




  METHOD if_mdc_enumerating~get_alias_for_governance.
    RETURN get_corresponding(
      original_entity    = node
      original_structure = ext_virtualmodel-governance-node
      target_structure   = ext_virtualmodel-governance-alias
    ).
  ENDMETHOD.

  METHOD if_mdc_enumerating~get_draft_for_active.
    RETURN get_corresponding(
    original_entity    = table
    original_structure = ext_persistence-table
    target_structure   = ext_draft-table
  ).
  ENDMETHOD.

ENDCLASS.
```