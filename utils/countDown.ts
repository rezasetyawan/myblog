
let isCountdownActive = false;
let countdownTimeout: any;

function startCountdown(durationInMinute: number = 2) {
    if (!isCountdownActive) {
        isCountdownActive = true;
        clearTimeout(countdownTimeout);
        countdownTimeout = setTimeout(function () {
            isCountdownActive = false;
        }, durationInMinute * 60 * 1000);
    }
}

function resetCountdown() {
    if (isCountdownActive) {
        clearTimeout(countdownTimeout);
        isCountdownActive = false;
        console.log("Countdown reset");
    }
}


