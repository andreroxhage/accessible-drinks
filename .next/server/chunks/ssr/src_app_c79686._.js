module.exports = {

"[project]/src/app/utils/cache.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * This is a simple cache that stores the results of the api calls
 */ __turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
class Cache {
    constructor(){
        this.cache = {};
        this.nbrItems = 0;
    }
    /** get the key from cacheretusn undefined if the key is not present in cache
   *
   * @param key either the id for a drink or name of the search
   * @return a json of either one drink or many drinks, undefined if the key is not present in cache
   */ get(key) {
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
            value.forEach((item)=>this.cache[item['idDrink']] = item);
            this.nbrItems += value.length;
        }
    }
}
const __TURBOPACK__default__export__ = new Cache();
}}),
"[project]/src/app/utils/fetchJson.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>fetchJson)
});
async function fetchJson(url) {
    return fetch(url).then((response)=>{
        if (!response.ok) {
            throw new Error(`${url} returned status ${response.status}`);
        }
        return response.text().then((text)=>{
            return text ? JSON.parse(text) : {};
        });
    });
}
}}),
"[project]/src/app/utils/searchLoader.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>searchLoader)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$cache$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/utils/cache.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$fetchJson$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/utils/fetchJson.tsx [app-ssr] (ecmascript)");
;
;
async function searchLoader(query) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$cache$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(query) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$fetchJson$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`).then((res)=>{
        const drinks = res.drinks;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$cache$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(query, drinks);
        return drinks;
    });
}
}}),
"[project]/src/app/components/SearchCombo.tsx [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/src/app/components/SearchCombo.tsx'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=src_app_c79686._.js.map