/* @flow */

export type BridgeInfo = {
    version: number[],
    directory: string,
    packages: {
        name: string,
        platform: string[],
        url: string,
        signature?: string,
        preferred?: boolean,
    }[],
}

const info: BridgeInfo = {
    version: [],
    directory: '',
    packages: [],
};

// Parse JSON loaded from config.assets.bridge
export const parseBridgeJSON = (json: JSON) => {
    // $FlowIssue indexer property is missing in `JSON`
    const latest = json[0];
    const version = latest.version.join('.');
    const data: BridgeInfo = JSON.parse(JSON.stringify(latest).replace(/{version}/g, version));
    const directory = data.directory;
    const packages = data.packages.map(p => ({
        name: p.name,
        platform: p.platform,
        url: `${directory}${p.url}`,
        signature: p.signature ? `${directory}${p.signature}` : undefined,
    }));

    info.version = data.version;
    info.directory = directory;
    info.packages = packages;
    return info;
};

export const getBridgeInfo = (): BridgeInfo => {
    return info;
};
