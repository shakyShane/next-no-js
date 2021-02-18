import * as t from "@hotwired/turbo";
// @ts-ignore
document.addEventListener("turbo:load", function () {
    console.log(t.navigator.location);
});
