'use strict';
const remote = require("@electron/remote"); //1 
const cleanStack = require('clean-stack');
const ensureError = require('ensure-error');

const app = remote.app;
const dialog = remote.dialog;
const clipboard = remote.clipboard;

let appName;

let invokeErrorHandler;

let installed = false;

let options = {
    logger: console.error,
    showDialog: true
};

// NOTE: The ES6 default for title will only be used if the error is invoked from the main process directly. When invoked via the renderer, it will use the ES6 default from invokeErrorHandler
const handleError = (title = `${appName} encountered an error`, error) => {
    error = ensureError(error);

    try {
        options.logger(error);
    } catch (loggerError) { // eslint-disable-line unicorn/catch-error-name
        dialog.showErrorBox('The `logger` option function in electron-unhandled threw an error', ensureError(loggerError).stack);
        return;
    }

    if (options.showDialog) {
        const stack = cleanStack(error.stack);

        if (app.isReady()) {
            const buttons = [
                'OK',
                process.platform === 'darwin' ? 'Copy Error' : 'Copy error'
            ];

            if (options.reportButton) {
                buttons.push('Report…');
            }

            // Intentionally not using the `title` option as it's not shown on macOS
            const buttonIndex = dialog.showMessageBoxSync({
                type: 'error',
                buttons,
                defaultId: 0,
                noLink: true,
                message: title,
                detail: cleanStack(error.stack, { pretty: true })
            });

            if (buttonIndex === 1) {
                clipboard.writeText(`${title}\n${stack}`);
            }

            if (buttonIndex === 2) {
                options.reportButton(error);
            }
        } else {
            dialog.showErrorBox(title, stack);
        }
    }
};

const unhandled = (inputOptions) => {
    if (installed) {
        return;
    }

    installed = true;

    options = {
        ...options,
        ...inputOptions
    };


    process.on('uncaughtException', error => {
        handleError('Unhandled Error', error);
    });

    process.on('unhandledRejection', error => {
        handleError('Unhandled Promise Rejection', error);
    });
}



unhandled.logError = (error, options) => {
    options = {
        ...options
    };

    if (typeof invokeErrorHandler === 'function') {
        invokeErrorHandler(options.title, error);
    } else {
        handleError(options.title, error);
    }
};

export default unhandled;
