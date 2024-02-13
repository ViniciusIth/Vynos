export default function log(message: any, logType: Function) {
    const timestamp = new Date().toISOString().replace(/\..+/, '').replace(/T/, ' ');

    // Finds the name of the caller using stack traces
    const stack = new Error().stack;
    const callerInfo = stack?.split('\n')[2].trim();
    const filename = callerInfo?.match(/\((.*):\d+:\d+\)/)?.[1] || 'Unknown file';

    logType(`${timestamp} [${filename}]: ${message}`);
}

