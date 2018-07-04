import AuthPlugin from "./authentication";
import ShutdownSequence from "./shutdown-sequence";
import DatabasePlugin from "./database";

export const database = [DatabasePlugin];
export const featuresPlugins = [AuthPlugin, ShutdownSequence];
