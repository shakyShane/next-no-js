import React, { useState } from "react";

type Props = {
    images: string[];
};

export function Gallery(props: Props) {
    const [index, setIndex] = useState(0);
    return (
        <div>
            <style jsx>
                {`
                    .list {
                        list-style: none;
                    }
                    .item {
                        display: inline-block;
                        margin-right: 5px;
                    }
                    .item[data-active="true"] {
                        outline: 1px solid black;
                    }
                    .img {
                        max-width: 60px;
                        display: block;
                    }
                    .img:hover {
                        cursor: pointer;
                    }
                    .main {
                        max-width: 100%;
                    }
                `}
            </style>
            <figure>
                <img src={props.images[index]} alt="" className="main" />
            </figure>
            <ul className="list">
                {props.images.map((img, i) => {
                    return (
                        <li key={img} className="item" data-active={String(i === index)}>
                            <img src={img} alt="" className="img" onClick={() => setIndex(i)} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Gallery;
