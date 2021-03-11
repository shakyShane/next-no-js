class EventRecorder {
    queue = [];

    constructor(eventName = "click", EventClass = MouseEvent, context = self) {
        this.eventName = eventName;
        this.EventClass = EventClass;
        this.context = context;
    }

    addEventToQueue = (e) => {
        this.queue.push(e);
    };

    dispatchAll() {
        this.queue.forEach((e) => {
            console.log(e);
            e.target.dispatchEvent(
                new this.EventClass(this.eventName, {
                    view: this.context,
                    bubbles: true,
                    cancelable: true,
                })
            );
        });
    }

    cleanUp() {
        this.queue.length = 0;

        this.context.removeEventListener(this.eventName, this.addEventToQueue);
    }

    record() {
        this.context.addEventListener(this.eventName, this.addEventToQueue);
    }

    replay() {
        this.dispatchAll();
        this.cleanUp();
    }
}

const clickRecorder = new EventRecorder("click", MouseEvent, window);
clickRecorder.record();
