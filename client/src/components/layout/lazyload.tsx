import loadable from "@loadable/component";

function load(fn: any, options: any) {
    const Component = loadable(fn, options)

    Component.preload = fn.requireAsyn || fn

    return Component
}

function LoadingComponent(props: {
    error: boolean;
    timedout: boolean;
    pastDelay: boolean;
}){
    if (props.error){
        console.error(props.error)
        return null
    }
    return <h1>Loading...</h1>
}

export default (loader: any) => 
    load(loader, {
        fallback: LoadingComponent({
            pastDelay: true,
            error: false,
            timedout: false,
        })
    })