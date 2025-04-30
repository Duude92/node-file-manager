export const getFileType = (dirEnt) => {
    if (dirEnt.isFile()) {
        return 'file';
    } else if (dirEnt.isDirectory()) {
        return 'directory';
    } else if (dirEnt.isBlockDevice()) {
        return 'block device';
    } else if (dirEnt.isCharacterDevice()) {
        return 'character device';
    } else if (dirEnt.isFIFO()) {
        return 'fifo';
    } else if (dirEnt.isSocket()) {
        return 'socket';
    } else if (dirEnt.isSymbolicLink()) {
        return 'symbolic link';
    } 
    return 'unknown';
}