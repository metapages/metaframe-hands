import { MediaPipeHandsMediaPipeModelConfig, MediaPipeHandsTfjsModelConfig, SupportedModels } from "@tensorflow-models/hand-pose-detection";
export declare const DEFAULT_LINE_WIDTH = 2;
export declare const DEFAULT_RADIUS = 4;
export declare const VIDEO_SIZE: {
    [key in string]: {
        width: number;
        height: number;
    };
};
export declare type StateTypeCamera = {
    targetFPS: number;
    sizeOption: string;
};
export declare type StateType = {
    camera: StateTypeCamera;
    model?: SupportedModels;
    backend: string;
    flags: any;
    modelConfig: (MediaPipeHandsMediaPipeModelConfig | MediaPipeHandsTfjsModelConfig) & {
        scoreThreshold?: number;
        render3D?: boolean;
        maxNumHands?: number;
    };
    isTargetFPSChanged?: boolean;
    isFlagChanged?: boolean;
    isModelChanged?: boolean;
    isSizeOptionChanged?: boolean;
    isBackendChanged?: boolean;
};
export declare const STATE: StateType;
export declare const MEDIAPIPE_HANDS_CONFIG: {
    type: string;
    render3D: boolean;
};
/**
 * This map descripes tunable flags and theior corresponding types.
 *
 * The flags (keys) in the map satisfy the following two conditions:
 * - Is tunable. For example, `IS_BROWSER` and `IS_CHROME` is not tunable,
 * because they are fixed when running the scripts.
 * - Does not depend on other flags when registering in `ENV.registerFlag()`.
 * This rule aims to make the list streamlined, and, since there are
 * dependencies between flags, only modifying an independent flag without
 * modifying its dependents may cause inconsistency.
 * (`WEBGL_RENDER_FLOAT32_CAPABLE` is an exception, because only exposing
 * `WEBGL_FORCE_F16_TEXTURES` may confuse users.)
 */
export declare const TUNABLE_FLAG_VALUE_RANGE_MAP: {
    [key in string]: (boolean | number)[];
};
export declare const BACKEND_FLAGS_MAP: {
    "tfjs-wasm": string[];
    "tfjs-webgl": string[];
    "mediapipe-gpu": never[];
};
export declare const MODEL_BACKEND_MAP: {
    MediaPipeHands: string[];
};
export declare const TUNABLE_FLAG_NAME_MAP: {
    PROD: string;
    WEBGL_VERSION: string;
    WASM_HAS_SIMD_SUPPORT: string;
    WASM_HAS_MULTITHREAD_SUPPORT: string;
    WEBGL_CPU_FORWARD: string;
    WEBGL_PACK: string;
    WEBGL_FORCE_F16_TEXTURES: string;
    WEBGL_RENDER_FLOAT32_CAPABLE: string;
    WEBGL_FLUSH_THRESHOLD: string;
};
//# sourceMappingURL=params.d.ts.map