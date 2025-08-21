import { setWorldConstructor, World } from "@cucumber/cucumber";

class CustomWorld {
    previousSuccessfulEvents: number | null = null;
    newSuccessfulEvents: number | null = null;
    previousFailedEvents: number | null = null;
    newFailedEvents: number | null = null;
    previousFailedPercentage: number | null = null;
    newFailedPercentage: number | null = null;
}

setWorldConstructor(CustomWorld);
export type WorldType = CustomWorld & World;
