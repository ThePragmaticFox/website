import * as Po from "./webgl/particle_optimization";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            Po: {
                create: Po.create,
                render: Po.render,
                destroy: Po.destroy
            }
        }
    }
})