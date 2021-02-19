import("uiLib")
    .then((m) => {
        console.log("got mod", m);
    })
    .catch((e) => {
        console.error("no mod", e);
    });

export {};
