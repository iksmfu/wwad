let apiStatus = false;
let apiStatusTime = 0;

async function checkApiStatus() {
    const controller = new AbortController();
    const signal = controller.signal;
    const options = { mode: 'no-cors', signal };

    let startTime = Date.now();

    await fetch("https://api.lixqa.de", options)
    .then(setTimeout(() => { controller.abort() }, 5000))
    .then(() => setApiStatus(true))
    .catch(() => setApiStatus(false));

    apiStatusTime = Date.now() - startTime;
}

function setApiStatus(bool) {
    apiStatus = bool;
}

async function getApiStatus() {
    await checkApiStatus();
    return apiStatus;
}

async function printApiStatus() {
    await checkApiStatus();
    
    if(apiStatus) {
        console.log("%cAPI Status: %cOnline%c | Request took " + apiStatusTime + "ms", "color:green;", "color:green;font-weight:bold;", "color:grey");
    } else {
        console.log("%cAPI Status: %cOffline%c | Request took " + apiStatusTime + "ms", "color:red;", "color:red;font-weight:bold;", "color:grey");
    }
}

async function sendApi(parameters) {
    let response;
    return new Promise(async function(res, rej) {
        let responseStartDate = new Date().getTime();
        response = await $.ajax({
        url: parameters.url,
        type: parameters.method,
        headers: parameters.headers,
        data: JSON.stringify(parameters.data),

        complete: function(result, status) {
            result = result.responseJSON;
            sendGroupedApiLog(
                (status == "success") ? ApiLogType.SUCCESS : ApiLogType.ERROR, //set Type
                ["Message", result?.message],
                ["Code", result?.code],
                ["Name", result?.endpoint?.name],
                ["Raw name", result?.endpoint?.rawName],
                ["Request duration", (new Date().getTime() - responseStartDate) + "ms"],
                ["Intern handle duration", result?.duration + "ms"],
                ["Method", result?.method]
            );

            res(result);
        },
        });
    });
}

//###################################################################
//####################### LOG SYSTEM ################################

const ApiLogType = {
    SUCCESS: "success",
    ERROR: "error"
}

const ApiRequestMethod = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT"
}

function sendApiLog(name, value) {
    console.log("%c[API] " + name + ": %c" + value, "color:grey;", "color:grey;font-weight:bold;");
}

function sendGroupedApiLog(groupType, ...logs) {
    if(groupType == "success") {
        console.group("%cAPI Request [%cSUCCESS%c]", "color:green;", "color:green; text-decoration:underline;", "color:green;");
    } else if(groupType == "error") {
        console.group("%cAPI Request [%cERROR%c]", "color:red;", "color:red; text-decoration:underline;", "color:red;");
    } else {
        console.group("%cAPI Request", "color:green;");
    }

    logs.forEach((log) => {
        sendApiLog(log[0], log[1]);
    });

    console.groupEnd();
}

//###################################################################
//###################################################################
