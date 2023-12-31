"use client"
import Nigeria from "@/image/nigeria.png"
import Image from "next/image"
import { FaGithub } from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai"

export default function Footer() {
    return (
        <div className="bg-altYellow text-white align-middle  p-4 text-center">
            <div className="bg-altYellow text-white align-middle  p-4 text-center"
                style={{ "height": "5vh", "minHeight": "5vh", "maxHeight": "5vh" }}
            >
                Proudly made in {''}
                <a style={{ "outline": "none" }} href="https://en.wikipedia.org/wiki/Nigeria"><Image
                    alt="Nigeria"
                    height={20}
                    width={20}
                    src={Nigeria}
                /> </a> by Leo
            </div>
            <div>
                <a className="text-white" href="https://github.com/leodarkseid">
                    <FaGithub className="mx-2" />
                </a>
                <a className="text-white" href="https://twitter.com/leodarkseid/">
                    <AiFillTwitterCircle className="mx-2" />
                </a>
            </div>
        </div>
    )
}