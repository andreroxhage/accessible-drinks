/**
 * This is a simple cache that stores the results of the api calls
 */
class Cache {
    constructor() {
        this.cache = {};
        this.nbrItems = 0;
    }

    /** get the key from cacheretusn undefined if the key is not present in cache 
     * 
     * @param key either the id for a drink or name of the search
     * @return a json of either one drink or many drinks, undefined if the key is not present in cache
    */
    get(key) {
        return this.cache[key];
    }

    set(key, value) {
        // we do not want to store too much but going to like 200 might be completely fine
        if (this.nbrItems > 50) {
            this.cache = {};
            this.nbrItems = 0;
        }
        this.nbrItems++;
        this.cache[key] = value;
        if (Array.isArray(value)) {
            value.forEach(item => this.cache[item["idDrink"]] = item);
            this.nbrItems += value.length;
        }
    }
}

// nice lil singleton
export default new Cache();