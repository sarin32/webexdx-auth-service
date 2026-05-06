import { getLogger, type Logger } from '@webexdx/koa-wrap/logger';
import { LOG_SETTINGS } from '../config';

const logger: Logger = getLogger(LOG_SETTINGS);

export default logger;
