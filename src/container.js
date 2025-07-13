import {ContainerFactory} from "@duude92/lazyinject";

const __directory = import.meta.dirname;
/**
 *
 * @type IContainerOptions
 */
const options = {
    baseDir: __directory,
    catalogs: [
        'commands/fs/commands',
        'commands/os/commands',
    ]
}

export const container = await ContainerFactory.create(options);
