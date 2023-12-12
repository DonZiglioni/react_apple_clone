import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react';
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    addBasePlugins,
    CanvasSnipperPlugin,
    mobileAndTabletCheck
} from "webgi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollAnimation } from '../lib/scroll-animation';

gsap.registerPlugin(ScrollTrigger)


const WebgiViewer = () => {
    const canvasRef = useRef(null);

    const memoizeScrollAnimation = useCallback((position, target, onUpdate) => {
        if (position && target && onUpdate) {
            ScrollAnimation(position, target, onUpdate)
        }
    }, [])

    const setupViewer = useCallback(async () => {

        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: canvasRef.current
        })
        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;
        const manager = await viewer.addPlugin(AssetManagerPlugin)

        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)

        viewer.renderer.refreshPipeline()

        await viewer.load("scene-black.glb")

        viewer.getPlugin(TonemapPlugin).config.clipBackground = true

        viewer.scene.activeCamera.setCameraOptions({
            controlsMode: false,
        })

        window.scrollTo(0, 0);
        let needsUpdate = true;

        const onUpdate = () => {
            needsUpdate = true;
            viewer.setDirty()
        }

        viewer.addEventListener('preFrame', () => {
            if (needsUpdate) {
                camera.positionUpdated(true);
                needsUpdate = false;
            }
        })
        memoizeScrollAnimation(position, target, onUpdate)

    }, [])

    useEffect(() => {
        setupViewer()
    }, [])

    //   setupViewer()
    return (
        <div id='webgi-canvas-container'>
            <canvas id='webgi-canvas' ref={canvasRef}>

            </canvas>
        </div>
    )
}

export default WebgiViewer