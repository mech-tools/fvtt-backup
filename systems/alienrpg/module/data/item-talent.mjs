import alienrpgItemBase from "./base-item.mjs";

export default class alienrpgTalent extends alienrpgItemBase {
  static LOCALIZATION_PREFIXES = [...super.LOCALIZATION_PREFIXES, "ALIENRPG.Item"];
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = alienrpgItemBase.defineSchema();

    schema.general = new fields.SchemaField({
      career: new fields.SchemaField({
        value: new fields.HTMLField(),
      }),
      comment: new fields.SchemaField({
        value: new fields.HTMLField(),
      }),
    });
    schema.header = new fields.SchemaField({
      active: new fields.StringField({ required: true, initial: "false" }),
    });

    return schema;
  }
  prepareDerivedData() {}

  getRollData() {
    const data = {};

    return data;
  }
}
