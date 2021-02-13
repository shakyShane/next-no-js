import React from "react";
import dynamic from 'next/dynamic'
import {Loader} from "../components/Loader";

const DynamicComponent = dynamic(() => {
    return import(/* webpackChunkName: "counter" */ '../components/Counter');
})

export default function Contact() {
    return <div>
        <h1>Timer: </h1>
        <Loader modfedId={"Counter"}>
            <DynamicComponent />
        </Loader>
    </div>
}

export const config = {
    unstable_runtimeJS: false
};