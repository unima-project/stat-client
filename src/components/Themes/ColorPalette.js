import React from 'react';
import {ColorPicker, useColor} from "react-color-palette";
import "react-color-palette/css";

export const ColorPalette = (props) => {
    const [currColor, setCurrColor] = React.useState("");
    const [colorPalette, setColorPalette] = useColor(currColor);

    const colorOnChange = (e) => {
        setColorPalette(e);
        props.setupThemeColor([props.title], e.hex);
    }

    React.useEffect(() => {
        setCurrColor(props.color);
    }, [props.color])

    const palette = <ColorPicker color={colorPalette} onChange={colorOnChange}/>

    return (palette)
}