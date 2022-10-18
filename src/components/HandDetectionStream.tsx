import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { MediaPipeHandsMediaPipeModelConfig } from "@tensorflow-models/hand-pose-detection";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import { StateTypeCamera } from "./mediapipe/shared/params";
import { Camera } from "./mediapipe/hands/camera";
import { useMetaframe } from "@metapages/metaframe-hook";
tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
);

// eventually this can be configurable, but until I understand what is going on, hardcode this
const HARD_CODED_CAMERA_CONFIG: StateTypeCamera = {
  targetFPS: 60,
  sizeOption: "640 X 480",
};

export const HandDetectionStream: React.FC = () => {

  const metaframeBlob = useMetaframe();
  /**
   * Create the camera instance (re-creating if needed)
   */
  const [cameraState, setCameraState] = useState<StateTypeCamera | undefined>(
    HARD_CODED_CAMERA_CONFIG
  );
  const [camera, setCamera] = useState<Camera | undefined>();
  useEffect(() => {
    let cancelled = false;
    if (cameraState) {
      (async () => {
        const cameraInstance = await Camera.setupCamera(cameraState);
        if (cancelled) {
          return;
        }
        setCamera(cameraInstance);
      })();
    }
    return () => {
      cancelled = true;
    };
  }, [setCamera, cameraState]);

  /**
   * Create the detector
   */
  const [detector, setDetector] = useState<
    handPoseDetection.HandDetector | undefined
  >();
  useEffect(() => {
    if (!camera) {
      return;
    }
    let cancelled = false;
    let newDetector: handPoseDetection.HandDetector | undefined;

    (async () => {
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detectorConfig: MediaPipeHandsMediaPipeModelConfig = {
        // @ts-ignore
        runtime: "mediapipe", // or 'tfjs'
        // solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
        solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915`,
        modelType: "full",
      };

      newDetector = await handPoseDetection.createDetector(
        model,
        detectorConfig
      );

      if (cancelled) {
        newDetector.dispose();
        return;
      }
      setDetector(newDetector);
    })();

    return () => {
      cancelled = true;
      if (newDetector) {
        newDetector.dispose();
      }
    };
  }, [camera, setDetector]);

  /**
   * Start:
   *   1. the video->canvas pipe
   *   2. the detection loop
   */
  useEffect(() => {
    if (!camera || !detector) {
      return;
    }
    let cancelled = false;
    (async () => {
      const renderFrame = async () => {
        if (cancelled) {
          return;
        }

        const hands = await detector.estimateHands(camera.video, {
          flipHorizontal: false,
        });

        if (hands && hands.length > 0 && metaframeBlob.metaframe) {
          metaframeBlob.metaframe.setOutput("hands", hands);
        }

        camera.drawCtx();
        if (hands && hands.length > 0) {
          camera.drawResults(hands);
        }

        requestAnimationFrame(renderFrame);
      };
      requestAnimationFrame(renderFrame);
    })();

    return () => {
      cancelled = true;
    };
  }, [camera, detector, metaframeBlob]);

  return <Box></Box>;
};
