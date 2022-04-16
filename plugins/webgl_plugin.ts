import { render } from "./webgl/render.ts";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            render: render
        }
    }
})