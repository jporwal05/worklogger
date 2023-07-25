function rectifyLogArray(requestParams, context, ee, next) {
    console.log(context.vars.log);
    console.log(typeof context.vars.log);
    // convert context.vars.log to JSON
    const logAsJson = JSON.parse(context.vars.log);
    // assign proper json instead of incorrect string format read from csv
    context.vars.log = logAsJson;
    next();
}

function addLogArray(requestParams, context, ee, next) {
    // add log array to context
    // this is something required for the post request
    // and is getting added dynamically via a beforeScenario hook
    context.vars.log = ["foo", "baz"];
    next();
}

module.exports = {
    rectifyLogArray: rectifyLogArray,
    addLogArray: addLogArray
};