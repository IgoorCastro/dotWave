import React, { useEffect, useRef } from 'react';
import * as C from './styles';
import gsap from 'gsap';

const AnimatedBackground2 = () => {
    const svgPathRef = useRef(null);
    const values = [
        "M455.74539,290.94604Q448.16865,331.89208,416.26898,358.13069Q384.36931,384.36931,358.89967,418.37608Q333.43004,452.38286,291.71502,464.60629Q250,476.82971,209.04637,462.45282Q168.09273,448.07592,142.92327,415.16106Q117.7538,382.2462,79.14588,359.61551Q40.53796,336.98482,55.39886,293.49241Q70.25976,250,56.17624,206.93086Q42.09273,163.86171,60.77739,121.66188Q79.46204,79.46204,122.10033,62.03118Q164.73861,44.60033,207.36931,28.92408Q250,13.24784,289.61551,35.70824Q329.23102,58.16865,359.40049,84.29935Q389.56996,110.43004,429.36849,134.93086Q469.16702,159.43167,466.24457,204.71584Q463.32212,250,455.74539,290.94604Z",
        "M451,291Q449,332,433.5,375Q418,418,365.5,410Q313,402,281.5,444.5Q250,487,219.5,441.5Q189,396,135.5,407Q82,418,94.5,363.5Q107,309,62,279.5Q17,250,29.5,207Q42,164,62,123Q82,82,135,91Q188,100,219,58.5Q250,17,294.5,26.5Q339,36,379.5,58Q420,80,434,124Q448,168,450.5,209Q453,250,451,291Z",
        "M429,287Q428,324,407.5,355.5Q387,387,347.5,389Q308,391,279,415.5Q250,440,216.5,426.5Q183,413,149.5,398.5Q116,384,69.5,364Q23,344,15.5,297Q8,250,32.5,210Q57,170,77,133.5Q97,97,133.5,76.5Q170,56,210,64Q250,72,294,55Q338,38,376.5,61.5Q415,85,403.5,138Q392,191,411,220.5Q430,250,429,287Z",
        "M435.9432,286.14297Q425.68624,322.28593,425.72875,374.02859Q425.77125,425.77125,375.69977,428.94243Q325.62829,432.11361,287.81414,437.70015Q250,443.2867,220.47141,418.67194Q190.94281,394.05719,165.61361,376.88639Q140.28441,359.71559,93.52859,346.98608Q46.77278,334.25658,68.31414,292.12829Q89.85551,250,87.2987,215.74266Q84.7419,181.48532,104.25619,152.62791Q123.77049,123.77049,152.48532,103.62829Q181.20015,83.48608,215.60008,66.27125Q250,49.05642,289.64297,53.69939Q329.28593,58.34236,364.4432,79.37095Q399.60046,100.39954,422.34312,134.68547Q445.08578,168.97141,445.64297,209.4857Q446.20015,250,435.9432,286.14297Z",
    ];

    useEffect(() => {
        let i = 0;
        // console.log("values[i]: " + values[i]);
        // Animação inicial
        gsap.to(svgPathRef.current, {
            attr: {
                d: "M429,287Q428,324,407.5,355.5Q387,387,347.5,389Q308,391,279,415.5Q250,440,216.5,426.5Q183,413,149.5,398.5Q116,384,69.5,364Q23,344,15.5,297Q8,250,32.5,210Q57,170,77,133.5Q97,97,133.5,76.5Q170,56,210,64Q250,72,294,55Q338,38,376.5,61.5Q415,85,403.5,138Q392,191,411,220.5Q430,250,429,287Z"
            },
            duration: 10,
            ease: "power1.out",
        });

        // Configura o intervalo
        const interval = setInterval(() => {
            // console.log("values[i]: " + values[i]);
            i = (i + 1) % values.length;
            gsap.to(svgPathRef.current, {
                attr: { d: values[i] },
                duration: 10,
                ease: "power1.out",
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [values]);
    
    return (
        <C.AnimatedContainer>
            <C.BlobContainer>
                <C.StyledSvg viewBox="0 0 500 500">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'rgb(255, 0, 110)' }} />
                            <stop offset="100%" style={{ stopColor: 'rgb(255, 190, 11)' }} />
                        </linearGradient>
                    </defs>
                    <path
                        ref={svgPathRef}
                        d={values[0]}
                        fill="url(#gradient)"
                    ></path>
                </C.StyledSvg>
            </C.BlobContainer>
        </C.AnimatedContainer>
    )
}

export default AnimatedBackground2;