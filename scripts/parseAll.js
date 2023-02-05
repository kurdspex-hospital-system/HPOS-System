const parseAll = async (obj) => {
    for(const property in obj) {
        try {
            obj[property] = await JSON.parse(obj[property]);
        } catch {
            continue;
        }
    }

    return obj;
}

module.exports = parseAll;