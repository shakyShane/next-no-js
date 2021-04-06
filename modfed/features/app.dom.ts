import { appMachine } from "~/modfed/features/app.machine";
import { useGlobalService } from "~/modfed/global";

export interface AppOpenEvent {
    type: "nav:open";
}

export interface AppCloseEvent {
    type: "nav:close";
}

// prettier-ignore
export type AppEvents =
    | AppOpenEvent
    | AppCloseEvent

export function useAppService() {
    return useGlobalService(appMachine);
}
