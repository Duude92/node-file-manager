import {ContainerFactory} from "@duude92/lazyinject";

const __directory = import.meta.dirname;
/**
 *
 * @type IContainerOptions
 */
const options = {
    baseDir: __directory,
    catalogs: []
}

export const container = await ContainerFactory.create(options);
