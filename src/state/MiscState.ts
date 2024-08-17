import type Kaiju from "../entities/Kaiju";
import type { Zone } from "../entities/Zone";


class MiscStateServiceClass{
    hoveredZone : Zone | null;
    draggedKaiju : Kaiju | null;
}

export let MiscStateService : MiscStateServiceClass;
// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
export const InitMiscStateService = () => MiscStateService = new MiscStateServiceClass();