import { type Component } from 'vue';
export type Props = {
    darkModeEnabled?: boolean;
    as?: string | Component;
};
declare const _default: import("vue").DefineComponent<{
    darkModeEnabled: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    as: {
        type: import("vue").PropType<string | Component>;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    darkModeEnabled: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    as: {
        type: import("vue").PropType<string | Component>;
        default: string;
    };
}>>, {
    darkModeEnabled: boolean;
    as: string | Component;
}, {}>;
export default _default;
