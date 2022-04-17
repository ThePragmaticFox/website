import { render_particle_optimization } from "./webgl/particle_optimization.ts";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            render_particle_optimization: render_particle_optimization
        }
    }
})