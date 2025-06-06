'use client'
import Image from "next/image";
import CubeCanvas from "../uis/cube/CubeCanvas";
import { useTranslations } from "@/hooks/useTranslations";
import Divider from "../atoms/Divinder";


export default function CubeSection() {
    const { t } = useTranslations();
    return (
        <div className="w-full h-full relative">
            <CubeCanvas />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 text-white pointer-events-none">
                <div className="w-[90%] sm:w-1/3 aspect-square relative">
                    <Image 
                        src={'/assets/images/pr.svg'}
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2 mx-4">{t('app.title') as string}</h2>
                    <p className="text-sm opacity-80 mx-8">{t('app.subtitle') as string}</p>
                    <Divider
                        orientation="h"
                        className="my-4 px-4"
                    />
                </div>
            </div>
        </div>
    )
}