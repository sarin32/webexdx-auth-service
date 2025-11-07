import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const consoleTransporter = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({
      colors: {
        http: 'blue',
      },
    }),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level} ${message}`;
    }),
  ),
});
const dailyRotateFileTransporter = new DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: '30d',
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(), // json includes all meta
  ),
});

const logger = winston.createLogger({
  level: 'debug',
  transports: [consoleTransporter, dailyRotateFileTransporter],
});

export default logger;
