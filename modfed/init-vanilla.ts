const elem = document.querySelector(`[data-test-id="time"]`);

if (elem) {
    let count = 0;
    setInterval(() => {
        count += 1;
        elem.textContent = String(count);
    }, 1000);
} else {
    console.log("could not find the vanilla JS component");
}

export {};
