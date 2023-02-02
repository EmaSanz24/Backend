import { FilesystemContainer } from "../../../capa_de_persistencia/containers/index.js";
import { config } from "../../../config/index.js";

export class CartsFilesystem extends FilesystemContainer {
  constructor() {
    super(config.DATABASES.filesystem.CARTS_FILENAME);
  }
}
