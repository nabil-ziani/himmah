'use client'

import { useInterval } from "@mantine/hooks";
import { useState, useEffect } from "react";

import Image from "next/image";

const Timer = () => {
    // const [volume, setVolume] = useState(0.5);
    // const cards = ["forest", "rain", "coffee", "fireplace"];

    // const [cardActive, setCardActive] = useState();

    const [defaultSeconds, setDefaultSeconds] = useState(1500);
    const [seconds, setSeconds] = useState(defaultSeconds);

    //manipulação dos segundos
    let extraSeconds: string | number = seconds % 60;
    let minutes: string | number = Math.floor(seconds / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

    // function handleCardClick(card) {
    //     setCardActive(cardActive === card ? "" : card);
    // }

    // const handleVolumeChange = (e) => {
    //     const audio = document.querySelector("audio");
    //     setVolume(e.target.value);
    //     audio.volume = volume;
    // };

    const interval = useInterval(() => {
        setSeconds((s) => s - 1);
    }, 1000);

    useEffect(() => {
        if (Number(minutes) <= 0 && seconds <= 0) {
            interval.stop();
            setSeconds(defaultSeconds);
            return;
        }
    }, [interval, seconds, minutes, defaultSeconds]);

    useEffect(() => {
        return interval.stop;
    }, []);

    const handlePlusClick = () => {
        setSeconds((s) => s + 300);
        setDefaultSeconds((s) => s + 300);
    };

    const handleMinusClick = () => {
        if (seconds <= 300) {
            setSeconds(0);
            return;
        }
        setSeconds((s) => s - 300);
        setDefaultSeconds((s) => s - 300);
    };

    return (
        <>
            <div className="h-full justify-center flex flex-col items-center">
                <div className="font-roboto flex items-center justify-center text-[126px] text-[#323238] font-[500] max-w-[321px] dark:text-white">
                    <div>{minutes}</div>
                    <div>:</div>
                    <div>{extraSeconds}</div>
                </div>
                <div className="flex items-center justify-around mx-[4px] text-[#323238] gap-x-5">
                    <button onClick={() => interval.toggle()}>
                        <Image
                            src={interval.active ? `/images/control-icons/pause.svg` : `/images/control-icons/play.svg`}
                            width={48}
                            height={48}
                            alt="Start the timer"
                        />
                    </button>
                    <button
                        onClick={() => {
                            interval.stop();
                            setSeconds(defaultSeconds);
                        }}
                    >
                        <Image
                            src={`/images/control-icons/stop.svg`}
                            width={48}
                            height={48}
                            alt="Stop the timer"
                        />
                    </button>
                    <button onClick={() => handlePlusClick()}>
                        <Image
                            src={`/images/control-icons/+.svg`}
                            width={48}
                            height={48}
                            alt="Increase 5 minutes from the timer"
                        />
                    </button>
                    <button onClick={() => handleMinusClick()}>
                        <Image
                            src={`/images/control-icons/-.svg`}
                            width={48}
                            height={48}
                            alt="Decrease 5 minutes from the timer"
                        />
                    </button>
                </div>
            </div>

            {/* <div className="grid grid-cols-2 gap-[32px]">
                {cards.map((card) => (
                    <Card
                        key={card}
                        card={card}
                        cardActive={cardActive}
                        activeCard={(v) => handleCardClick(v)}
                        changeCurrentVolume={(e) => handleVolumeChange(e)}
                    />
                ))}
            </div> */}
        </>
    )
}

export default Timer