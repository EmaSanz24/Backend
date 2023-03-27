import { FilesystemContainer } from "../../../containers/index.js";
import { config } from "../../../config/index.js";

export class MessagesFilesystem extends FilesystemContainer {
  constructor() {
    super(config.DATABASES.filesystem.MESSAGES_FILENAME);
  }
}
