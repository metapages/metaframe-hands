import { StateTypeCamera } from "../shared/params";
export declare class Camera {
    video: HTMLVideoElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor();
    /**
     * Initiate a Camera instance and wait for the camera stream to be ready.
     * @param cameraParam From app `STATE.camera`.
     */
    static setupCamera(cameraParam: StateTypeCamera): Promise<Camera>;
    drawCtx(): void;
    clearCtx(): void;
    /**
     * Draw the keypoints on the video.
     * @param hands A list of hands to render.
     */
    drawResults(hands: any): void;
    /**
     * Draw the keypoints on the video.
     * @param hand A hand with keypoints to render.
     * @param ctxt Scatter GL context to render 3D keypoints to.
     */
    drawResult(hand: any, ctxt: any): void;
    /**
     * Draw the keypoints on the video.
     * @param keypoints A list of keypoints.
     * @param handedness Label of hand (either Left or Right).
     */
    drawKeypoints(keypoints: any, handedness: any): void;
    drawPath(points: any, closePath: any): void;
    drawPoint(y: number, x: number, r: number): void;
    drawKeypoints3D(keypoints: any, handedness: any, ctxt: any): void;
}
//# sourceMappingURL=camera.d.ts.map