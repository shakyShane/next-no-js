import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import(/* webpackChunkName: "counter" */ '../components/Counter'))

export default function Contact() {
    return <div>
        <h1>Timer: </h1>
        <DynamicComponent />
    </div>
}

export const config = {
    unstable_runtimeJS: false
};