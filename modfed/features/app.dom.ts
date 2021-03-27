import { AppValue, MACHINE_ID, PublicContext, Send } from "~/modfed/features/app.machine";
import { useSend, useService } from "~/modfed/features/common";

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

export function useAppSend(): Send {
    return useSend(MACHINE_ID);
}

export function useAppService(): [{ value: AppValue; context: PublicContext }, Send] {
    return useService(MACHINE_ID) as [{ value: AppValue; context: PublicContext }, Send];
}
