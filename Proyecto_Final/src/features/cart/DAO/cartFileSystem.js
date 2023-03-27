import { FilesystemContainer } from "../../../containers/fileSystemContainer.js";
import { config } from "../../../config/index.js";

export class CartsFileSystem extends FilesystemContainer {
  constructor() {
    super(config.DATABASES.filesystem.CARTS_FILENAME);
  }
}
