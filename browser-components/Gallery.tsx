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
                        margin: 0;
                        padding-left: 0;
                        text-align: center;
                        padding-top: 10px;
                    }
                    .item {
                        display: inline-block;
                        margin-right: 5px;
                    }
                    .item[data-active="true"] {
                        outline: 1px solid black;
                    }
                    .img {
                        width: 60px;
                        height: 60px;
                        display: block;
                    }
                    .img:hover {
                        cursor: pointer;
                        outline: 1px solid red;
                    }
                    .figure {
                        margin: 0;
                        display: block;
                        text-align: center;
                    }
                    .main {
                        width: 250px;
                        height: 250px;
                        margin: 0 auto;
                    }
                `}
            </style>
            <div className="figure">
                <img src={props.images[index]} alt="" className="main" />
            </div>
            <ul className="list">
                {props.images.map((img, i) => {
                    return (
                        <li key={img} className="item" data-active={String(i === index)}>
                            <a
                                href={img}
                                className="link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIndex(i);
                                }}
                            >
                                <img src={img} alt="" className="img" width={60} height={60} />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
Gallery.displayName = "Gallery";
export default Gallery;
