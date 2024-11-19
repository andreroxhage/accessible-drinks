(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_2a6f4f._.js", {

"[project]/src/app/components/SearchCombo.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>SearchCombo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$searchLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/utils/searchLoader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@headlessui/react/dist/components/combobox/combobox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$20$2f$solid$2f$esm$2f$MagnifyingGlassIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlassIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/20/solid/esm/MagnifyingGlassIcon.js [app-client] (ecmascript) <export default as MagnifyingGlassIcon>");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
function SearchCombo() {
    _s();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [drinks, setDrinks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchDrinks = async ()=>{
            if (query !== '') {
                const drinks = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$searchLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(query);
                setDrinks(drinks);
                setIsOpen(true);
            } else {
                setDrinks([]);
                setIsOpen(false);
            }
        };
        fetchDrinks();
    }, [
        query
    ]);
    const filteredDrinks = query === '' ? [] : drinks.filter((drink)=>drink.strDrink.toLowerCase().includes(query.toLowerCase()));
    const handleViewAllResults = ()=>{
        router.push(`/search-results/${query}`);
    };
    const handleDrinkSelect = (drink)=>{
        if (drink === 'see-all-results') {
            handleViewAllResults();
        } else if (drink.idDrink !== null) {
            router.push(`/search-results/drink/${drink.idDrink}`);
        }
    };
    const handleKeyDown = (event)=>{
        if (event.key === 'Escape') {
            // Close the combobox on Escape without selecting
            setIsOpen(false);
            setQuery('');
        } else if (event.key === 'Tab') {
            // Close the combobox without triggering a selection
            setIsOpen(false);
        } else if (event.key === 'Enter' && filteredDrinks.length > 0) {
            // Explicitly handle selection on Enter key press
            const selectedDrink = filteredDrinks.find((drink)=>drink.strDrink.toLowerCase() === query.toLowerCase());
            if (selectedDrink) {
                handleDrinkSelect(selectedDrink);
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
        as: "div",
        onChange: handleDrinkSelect,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$20$2f$solid$2f$esm$2f$MagnifyingGlassIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlassIcon$3e$__["MagnifyingGlassIcon"], {
                        className: "pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SearchCombo.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxInput"], {
                        autoFocus: true,
                        className: "h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm",
                        placeholder: "Search for a drink...",
                        onChange: (event)=>setQuery(event.target.value),
                        onKeyDown: handleKeyDown,
                        onBlur: ()=>setIsOpen(false),
                        "aria-expanded": isOpen,
                        "aria-controls": "combobox-options"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SearchCombo.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SearchCombo.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            isOpen && (query !== '' || filteredDrinks.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxOptions"], {
                static: true,
                id: "combobox-options",
                className: "max-h-72 overflow-y-auto py-2 text-sm text-gray-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxOption"], {
                        value: "see-all-results",
                        className: ({ active })=>`cursor-pointer select-none bg-gray-100 px-4 py-2 ${active ? 'bg-indigo-600 text-white' : ''}`,
                        children: "View all search results"
                    }, "view-all-search-results", false, {
                        fileName: "[project]/src/app/components/SearchCombo.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    filteredDrinks.map((drink)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$combobox$2f$combobox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComboboxOption"], {
                            value: drink,
                            className: ({ active, selected })=>`cursor-pointer select-none px-4 py-2 ${selected ? 'bg-indigo-600 text-white' : active ? 'bg-indigo-500 text-white' : ''}`,
                            children: drink.strDrink
                        }, drink.idDrink, false, {
                            fileName: "[project]/src/app/components/SearchCombo.tsx",
                            lineNumber: 118,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SearchCombo.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this),
            query !== '' && filteredDrinks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "p-4 text-sm text-gray-500",
                children: "No drinks found."
            }, void 0, false, {
                fileName: "[project]/src/app/components/SearchCombo.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/SearchCombo.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(SearchCombo, "3WFXoWG9y53Bg8hPuTyZqUJTrd0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SearchCombo;
var _c;
__turbopack_refresh__.register(_c, "SearchCombo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_2a6f4f._.js.map