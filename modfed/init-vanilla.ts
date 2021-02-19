export default function(elem: HTMLElement, data: any) {
    const time = elem.querySelector(`[data-test-id="time"]`);

    if (time) {
        let count = 0;
        setInterval(() => {
            count += 1;
            time.textContent = String(count);
        }, 1000);
    } else {
        console.log("could not find the vanilla JS component");
    }
}


export {};
