module.exports = {
    "static_src": "static/",
    "static_dest": "www/",
    "env": {
        "dev": {
            "DEBUG": true,
        },
        "prod": {

        }
    }
};

module.exports.digest = function (tasks, mode, alt) {
    if (typeof tasks !== 'object') {
        return tasks;
    }
    if (mode && mode in tasks) {
        return tasks[mode];
    }
    return tasks[alt];
};
