import { INestApplication } from "@nestjs/common";
import { SimpleFeatureWorldHelper } from "../world-helper/simple-feature.world-helper";

export interface ExampleWorld {
  app: INestApplication;
  simpleFeatureWorldHelper: SimpleFeatureWorldHelper;
}
