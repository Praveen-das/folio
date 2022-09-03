import { Html, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import React, { useCallback, useEffect, useState } from 'react'
import { proxy } from 'valtio'
import './tags.css'

export const gsapProxy = proxy({ triggered: false })

function Tags() {
    const scroll = useScroll()
    const [animation, setAnimation] = useState(null)
    const [animArray] = useState([])
    const tl = gsap.timeline()

    const mountTag = useCallback((element, duration) => {
        gsap.killTweensOf(element)
        tl.to(element, { opacity: 1, stagger: duration })
    }, [tl])

    const unmountTag = useCallback((animArray, duration) => {
        animArray.forEach(anim => {
            tl.to(anim, { opacity: 0, duration: duration })
        })
        animArray = []
    }, [tl])

    useFrame(() => {
        if (scroll.offset > 0.17 && scroll.offset < 0.27) return setAnimation('.DPC')
        if (scroll.offset > 0.38 && scroll.offset < 0.48) return setAnimation('.artsworld')
        if (scroll.offset > 0.58 && scroll.offset < 0.70) return setAnimation('.visualizer')
        setAnimation(null)
    })

    useEffect(() => {
        if (animation) {
            mountTag(animation, 0.1)
            animArray.push(animation)
        } else {
            unmountTag(animArray, 0.2)
        }
    }, [animation, animArray, mountTag, unmountTag, tl])

    return (
        <>
            <Html scale={[0.2, 0.2, 0.2]} position={[0.850, 2.995, -0.615]} quaternion={[0, 0.235, 0, 0.971]} transform center>
                <label htmlFor="">ABC</label>
            </Html>
            <Html scale={[0.035, 0.035, 0.035]} position={[0.325, 2.18, -0.260]} quaternion={[0, 0.266173, 0, 0.963925]} >
                <div id="DPCTag">
                    <label className='title_main DPC' htmlFor="">Disney Plus Clone</label>
                    <p className='description DPC'>Fully functional, responsive web app which  resembles the official Disney plus website.</p>
                    <label className='title_secondry DPC' htmlFor="">Built Using</label>
                    <div className='grid'>
                        <ul className='DPC'>
                            <li>ReactJs</li>
                            <li>NodeJs</li>
                            <li>Firebase</li>
                            <li>Razorpay</li>
                            <li>Css</li>
                        </ul>
                        <button className='callToAction DPC'>
                            VISIT
                            <img alt='' width={19} src="https://img.icons8.com/material-outlined/24/000000/external-link.png"/>
                        </button>
                    </div>
                </div>
            </Html>
            <Html scale={[0.035, 0.035, 0.035]} position={[0.274, 1.775, 0.306]} quaternion={[0, -0.561463, 0, 0.827502]}>
                <div id="DPCTag">
                    <label className='title_main artsworld' htmlFor="">Disney Plus Clone</label>
                    <p className='description artsworld'>Fully functional, responsive web app which  resembles the official Disney plus website.</p>
                    <label className='title_secondry artsworld' htmlFor="">Built Using</label>
                    <ul className='artsworld'>
                        <li>ReactJs</li>
                        <li>NodeJs</li>
                        <li>Firebase</li>
                        <li>Razorpay</li>
                        <li>Css</li>
                    </ul>
                </div>
            </Html>
            <Html scale={[0.035, 0.035, 0.035]} position={[0.274, 1.216, 0.306]} quaternion={[0, -0.561463, 0, 0.827502]} >
                <div id="DPCTag">
                    <label className='title_main visualizer' htmlFor="">Disney Plus Clone</label>
                    <p className='description visualizer'>Fully functional, responsive web app which  resembles the official Disney plus website.</p>
                    <label className='title_secondry visualizer' htmlFor="">Built Using</label>
                    <ul className='visualizer'>
                        <li>ReactJs</li>
                        <li>NodeJs</li>
                        <li>Firebase</li>
                        <li>Razorpay</li>
                        <li>Css</li>
                    </ul>
                </div>
            </Html>
        </>
    )
}

export default Tags