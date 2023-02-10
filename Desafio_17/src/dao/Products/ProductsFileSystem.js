import { FilesystemContainer } from "../../containers/FilesystemContainer.js";
import { config } from "../../config/index.js";

export class ProductsFilesystem extends FilesystemContainer {
  constructor() {
    super(config.DATABASES.filesystem.CARTS_FILENAME);
  }
}
