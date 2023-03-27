import { FilesystemContainer } from "../../../containers/index.js";
import { config } from "../../../config/index.js";

export class OrdersFilesystem extends FilesystemContainer {
  constructor() {
    super(config.DATABASES.filesystem.ORDERS_FILENAME);
  }
}
