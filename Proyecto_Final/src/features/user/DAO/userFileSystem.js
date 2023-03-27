import { FilesystemContainer } from "../../../containers/fileSystemContainer.js";
import { config } from "../../../config/index.js";

export class UsersFileSystem extends FilesystemContainer {
  constructor() {
    super(config.DATABASES.filesystem.USERS_FILENAME);
  }
}
