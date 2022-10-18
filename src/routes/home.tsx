import {
  SimpleGrid,
} from "@chakra-ui/react";
import { HandDetectionStream } from "../components/HandDetectionStream";


export const Route: React.FC = () => (
  <SimpleGrid columns={1} spacing={10}>
    <HandDetectionStream />
  </SimpleGrid>
);
