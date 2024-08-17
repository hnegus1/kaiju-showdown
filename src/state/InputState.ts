import { InputState } from "../enums/InputState";


class InputServiceClass{
    private state : InputState;

    private dragging = false;

    lock(){
        this.state = InputState.Locked;
    }

    unlock(){
        this.state = InputState.Unlocked;
    }

    isLocked(){
        return this.state === InputState.Locked;
    }


    setDragging(val : boolean){
        this.dragging = val;
    }

    isDragging(){
        return this.dragging;
    }
}

export let InputService : InputServiceClass;
// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
export const InitInputService = () => InputService = new InputServiceClass();