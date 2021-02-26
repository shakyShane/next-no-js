import React from "react";
import { BrowserComponent } from "../modfed/BrowserComponent";
import { DemoBlock, H1, H2, P } from "../ui/Type";
import { Counter } from "../components/Counter";

export default function WithJs() {
    return (
        <div>
            <H1>On-demand JavaScript runtime + Preact</H1>
            <H2>
                The initial HTML for this page was rendered at build time - so it works without JavaScript + (really,
                try it)
            </H2>
            <P>
                But, when a page like this contains a Component marked as JS-ENABLED, the 2kb runtime loads, and then
                loads any micro-bundles required for the component (in this example, that's Preact/compat)
            </P>
            <P>
                Thanks to Module Federation, if multiple components on the same page share dependencies (eg: Preact)
                they will 'share' them intelligently
            </P>
            <h3>The timer below was server-side rendered</h3>
            <p>Once the page is ready, a tiny bundle loads and hydrates the markup</p>

            <DemoBlock>
                <BrowserComponent>
                    <Counter />
                </BrowserComponent>
            </DemoBlock>
        </div>
    );
}

export const config = {
    unstable_runtimeJS: false,
};
