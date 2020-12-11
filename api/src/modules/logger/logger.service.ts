import { Injectable, Logger, LogLevel, Scope } from '@nestjs/common';
import { format as formatDate } from 'date-fns';

const Colors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};

const color = (text: string, color: keyof typeof Colors) => `${Colors[color]}${text}${Colors.Reset}`;
const dim = (text: string) => color(text, 'Dim');

// TODO: inject configService
const { LOG_LEVEL } = process.env;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Message = any;

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  private static _logLevels: LogLevel[] = ['error', 'warn', 'verbose', 'log', 'debug'];

  private static _levelToTag: Record<LogLevel, string> = {
    error: color('ERR', 'FgRed'),
    warn: color('WRN', 'FgYellow'),
    verbose: 'VER',
    log: 'LOG',
    debug: 'DBG',
  };

  private readonly levels: LogLevel[] = LoggerService._logLevels;

  constructor() {
    super();

    if (LOG_LEVEL) {
      if (!LoggerService.isLogLevel(LOG_LEVEL)) {
        throw new Error(`invalid log level "${LOG_LEVEL}"`);
      }

      const { _logLevels: levels } = LoggerService;

      this.levels = levels.slice(0, levels.indexOf(LOG_LEVEL) + 1);
    }
  }

  static isLogLevel(level: string): level is LogLevel {
    return this._logLevels.includes(level as LogLevel);
  }

  error(message: Message, trace?: string, context?: string) {
    this._log('error', message, trace, context);
  }

  warn(message: Message, context?: string) {
    this._log('warn', message, undefined, context);
  }

  verbose(message: Message, context?: string) {
    this._log('verbose', message, undefined, context);
  }

  log(message: Message, context?: string) {
    this._log('log', message, undefined, context);
  }

  debug(message: Message, context?: string) {
    this._log('debug', message, undefined, context);
  }

  private _log(level: LogLevel, message: Message, trace?: string, context: string = this.context) {
    if (!this.levels.includes(level)) {
      return;
    }

    const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');

    console.log(
      [
        `${dim('[')}${color(LoggerService._levelToTag[level], 'Bright')}${dim(']')}`,
        `${color(date, 'FgYellow')}`,
        ...(context ? [dim('|'), color(context, 'FgGreen')] : []),
        dim('|'),
        message,
        trace,
      ]
        .filter(Boolean)
        .join(' '),
    );
  }
}
