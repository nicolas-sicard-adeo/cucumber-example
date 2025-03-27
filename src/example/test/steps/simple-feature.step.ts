import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { ExampleWorld } from "../../../global/test/world/example.world";
import {
  Converters,
  cucumberDataTable,
} from "@cucumber-stories/cucumber-datatable";
import { getSimpleFeatureWorldHelper } from "../../../global/test/world-helper/simple-feature.world-helper";

const getSimples = cucumberDataTable({
  column1: { columnName: "Column 1", converter: Converters.String },
  column2: { columnName: "Column 2", converter: Converters.String },
});

Given(/^some example step$/, async function (this: ExampleWorld) {
  console.log("1");
});

When(
  /^some example step with a table$/,
  async function (this: ExampleWorld, datatable: DataTable) {
    getSimpleFeatureWorldHelper(this).simples = getSimples(datatable);
    console.log(datatable);
  },
);

Then(/^we conclude the example$/, async function (this: ExampleWorld) {
  console.log(getSimpleFeatureWorldHelper(this).simples);
});
