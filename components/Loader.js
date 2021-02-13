export function Loader(props) {
    return (
        <>
            <div data-modfed-id={props.modfedId}>
                {props.children}
            </div>
            <script async dangerouslySetInnerHTML={{__html: ``}} />
        </>
    )
}