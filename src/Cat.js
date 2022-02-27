import { useState, useEffect } from "react";

export const Cat = ({catId}) => {
    const [catImgSrc, setCatImgSrc] = useState(""); 
    useEffect(() => {
        const getCat = async () => {
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            const {0: cat} = await response.json();
            console.log("cat", JSON.stringify(cat))
            setCatImgSrc(cat.url);
        };
        getCat();
    }, [catId]);

    if(!catImgSrc) {
        return <></>
    }
    return (
        <div>
            <img src={catImgSrc} height="400px" width="400px" alt="cute random cat pic"></img>
        </div>
    )
}